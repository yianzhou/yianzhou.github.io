# Network Quality Estimator

```cpp
Observation(int32_t value, // RTT
            base::TimeTicks timestamp, // 时间戳
            int32_t signal_strength, // 信号强度
            NetworkQualityObservationSource source, // 观测来源（例如HTTP层、TCP层）
            const absl::optional<IPHash>& host); // 访问站点

// 衡量网络质量
NetworkQuality(const base::TimeDelta& http_rtt,
                const base::TimeDelta& transport_rtt,
                int32_t downstream_throughput_kbps);

CachedNetworkQuality(base::TimeTicks last_update_time,
                    const NetworkQuality& network_quality,
                    EffectiveConnectionType effective_connection_type); // 2/3/4G

NetworkID(NetworkChangeNotifier::ConnectionType type, // 2/3/4G/WIFI
            const std::string& id,
            int32_t signal_strength);

class NetworkQualityStore {
    void Add(const nqe::internal::NetworkID& network_id,
           const nqe::internal::CachedNetworkQuality& cached_network_quality);
}

double GetWeightMultiplierPerSecond(
    const std::map<std::string, std::string>& params) {
  // 用于计算时间加权百分位数的半衰期默认值（以秒为单位）。每个半衰期，所有观测值的权重都会减少一半。降低半衰期会更快地减少旧值的权重。
  // 权重的默认半衰期为60秒
  int half_life_seconds = 60;
  return pow(0.5, 1.0 / half_life_seconds);
}

void ObservationBuffer::ComputeWeightedObservations(
    const base::TimeTicks& begin_timestamp,
    int32_t current_signal_strength,
    std::vector<WeightedObservation>* weighted_observations,
    double* total_weight) const {
    // 遍历所有历史观测数据
    for (const auto& observation : observations_) {
        if (observation.timestamp() < begin_timestamp)
        continue; // 只考虑指定时间戳之后的数据

        base::TimeDelta time_since_sample_taken = now - observation.timestamp();
        // 默认半衰期为一分钟，距离当前时间戳越远的观测点，衰减越多，权重越低
        double time_weight =
            pow(weight_multiplier_per_second_, time_since_sample_taken.InSeconds());

        double signal_strength_weight = 1.0;
        if (current_signal_strength >= 0 && observation.signal_strength() >= 0) {
        int32_t signal_strength_weight_diff =
            std::abs(current_signal_strength - observation.signal_strength());
        // 与当前信号强度差异越大的观测点，权重越低
        // weight_multiplier_per_signal_level_是一个[0,1]之间的数
        signal_strength_weight =
            pow(weight_multiplier_per_signal_level_, signal_strength_weight_diff);
        }

        // 时间权重 * 信号权重
        double weight = time_weight * signal_strength_weight;
        weight = std::clamp(weight, DBL_MIN, 1.0);

        weighted_observations->push_back(
            WeightedObservation(observation.value(), weight));
        total_weight_observations += weight;
  }
}

// 50百分位的RTT是多少
// 70百分位的RTT是多少
absl::optional<int32_t> ObservationBuffer::GetPercentile(
    base::TimeTicks begin_timestamp,
    int32_t current_signal_strength,
    int percentile,
    size_t* observations_count) const {
    // Stores weighted observations in increasing order by value.
    // value就是RTT，RTT越大，代表网络性能越差
    std::vector<WeightedObservation> weighted_observations;
    // Total weight of all observations in |weighted_observations|.
    double total_weight = 0.0;
    ComputeWeightedObservations(begin_timestamp, current_signal_strength,
                              &weighted_observations, &total_weight);
    double desired_weight = percentile / 100.0 * total_weight;
    double cumulative_weight_seen_so_far = 0.0;
    for (const auto& weighted_observation : weighted_observations) {
        cumulative_weight_seen_so_far += weighted_observation.weight;
        if (cumulative_weight_seen_so_far >= desired_weight)
            return weighted_observation.value;
    }
}

// 返回指定百分位处的网络质量估计值。
// 仅晚于 |start_time| 的观察结果被考虑在内。
// 百分位数越高表示网络性能较差。例如，如果百分位是 90，那么网络预计会有 0.9 的概率比返回的RTT更快。
virtual base::TimeDelta GetRTTEstimateInternal(
    base::TimeTicks start_time,
    nqe::internal::ObservationCategory observation_category,
    int percentile,
    size_t* observations_count) const {
    return base::Milliseconds(
          rtt_ms_observations_[observation_category]
              .GetPercentile(start_time, current_network_id_.signal_strength,
                             percentile, observations_count)
              .value_or(nqe::internal::INVALID_RTT_THROUGHPUT));
}

int32_t NetworkQualityEstimator::GetDownlinkThroughputKbpsEstimateInternal(
    const base::TimeTicks& start_time,
    int percentile) const {
  // Throughput observations are sorted by kbps from slowest to fastest,
  // thus a higher percentile throughput will be faster than a lower one.
  return http_downstream_throughput_kbps_observations_
      .GetPercentile(start_time, current_network_id_.signal_strength,
                     100 - percentile, nullptr)
      .value_or(nqe::internal::INVALID_RTT_THROUGHPUT);
}

bool NetworkQualityEstimator::GetRecentRTT(
    nqe::internal::ObservationCategory observation_category,
    const base::TimeTicks& start_time,
    base::TimeDelta* rtt,
    size_t* observations_count) const {
  // 50百分位
  *rtt = GetRTTEstimateInternal(start_time, observation_category, 50,
                                observations_count);
  return (*rtt != nqe::internal::InvalidRTT());
}

EffectiveConnectionType
NetworkQualityEstimator::GetRecentEffectiveConnectionTypeUsingMetrics(
    base::TimeDelta* http_rtt,
    base::TimeDelta* transport_rtt,
    base::TimeDelta* end_to_end_rtt,
    int32_t* downstream_throughput_kbps,
    size_t* transport_rtt_observation_count,
    size_t* end_to_end_rtt_observation_count) const {
  GetRecentRTT(nqe::internal::OBSERVATION_CATEGORY_HTTP, base::TimeTicks(),
                    http_rtt, nullptr));

  GetRecentRTT(nqe::internal::OBSERVATION_CATEGORY_TRANSPORT,
                    base::TimeTicks(), transport_rtt,
                    transport_rtt_observation_count));

  iGetRecentRTT(nqe::internal::OBSERVATION_CATEGORY_END_TO_END,
                    base::TimeTicks(), end_to_end_rtt,
                    end_to_end_rtt_observation_count));

  UpdateHttpRttUsingAllRttValues(http_rtt, *transport_rtt, *end_to_end_rtt);

  GetRecentDownlinkThroughputKbps(base::TimeTicks(),
                                       downstream_throughput_kbps));

  // Search from the slowest connection type to the fastest to find the
  // EffectiveConnectionType that best matches the current connection's
  // performance. The match is done by comparing RTT and throughput.
  for (size_t i = 0; i < EFFECTIVE_CONNECTION_TYPE_LAST; ++i) {
    EffectiveConnectionType type = static_cast<EffectiveConnectionType>(i);
    const bool estimated_http_rtt_is_higher_than_threshold =
        *http_rtt >= params_->ConnectionThreshold(type).http_rtt();
    if (estimated_http_rtt_is_higher_than_threshold)
      return type;
  }
}
```
