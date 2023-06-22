# FlutterChannels

## FlutterBasicMessageChannel

```cpp
- (void)sendMessage:(id)message {
  // _messenger就是FlutterBinaryMessengerRelay
  [_messenger sendOnChannel:_name message:[_codec encode:message]];
}
```

## FlutterBinaryMessengerRelay

```cpp
- (void)sendOnChannel:(NSString*)channel message:(NSData*)message {
  // parent就是FlutterEngine
  [self.parent sendOnChannel:channel message:message binaryReply:nil];
}
```

## FlutterEngine

```cpp
- (void)sendOnChannel:(NSString*)channel
              message:(NSData*)message
          binaryReply:(FlutterBinaryReply)callback {
  fml::RefPtr<flutter::PlatformMessageResponseDarwin> response =
      (callback == nil) ? nullptr
                        : fml::MakeRefCounted<flutter::PlatformMessageResponseDarwin>(
                              ^(NSData* reply) {
                                callback(reply);
                              },
                              _shell->GetTaskRunners().GetPlatformTaskRunner());
  std::unique_ptr<flutter::PlatformMessage> platformMessage =
      (message == nil) ? std::make_unique<flutter::PlatformMessage>(channel.UTF8String, response)
                       : std::make_unique<flutter::PlatformMessage>(
                             channel.UTF8String, flutter::CopyNSDataToMapping(message), response);

  _shell->GetPlatformView()->DispatchPlatformMessage(std::move(platformMessage));
  // platformMessage takes ownership of response.
}
```

## PlatformView

```cpp title='flutter/shell/common/platform_view.cc'
void PlatformView::DispatchPlatformMessage(
    std::unique_ptr<PlatformMessage> message) {
  // delegate_就是shell
  delegate_.OnPlatformViewDispatchPlatformMessage(std::move(message));
}
```

## Shell

```cpp
void Shell::OnPlatformViewDispatchPlatformMessage(
    std::unique_ptr<PlatformMessage> message) {
  task_runners_.GetUITaskRunner()->PostTask(fml::MakeCopyable(
      [engine = engine_->GetWeakPtr(), message = std::move(message)]() mutable {
        if (engine) {
            // flutter::Engine
          engine->DispatchPlatformMessage(std::move(message));
        }
      }));
}
```

## Engine

```cpp title='flutter/shell/common/engine.cc'
void Engine::DispatchPlatformMessage(std::unique_ptr<PlatformMessage> message) {
  std::string channel = message->channel();
  if (channel == kLifecycleChannel) {
    if (HandleLifecyclePlatformMessage(message.get())) {
      return;
    }
  } else if (channel == kLocalizationChannel) {
    if (HandleLocalizationPlatformMessage(message.get())) {
      return;
    }
  } else if (channel == kSettingsChannel) {
    HandleSettingsPlatformMessage(message.get());
    return;
  } else if (!runtime_controller_->IsRootIsolateRunning() &&
             channel == kNavigationChannel) {
    // If there's no runtime_, we may still need to set the initial route.
    HandleNavigationPlatformMessage(std::move(message));
    return;
  }

  if (runtime_controller_->IsRootIsolateRunning() &&
      runtime_controller_->DispatchPlatformMessage(std::move(message))) {
    return;
  }

  FML_DLOG(WARNING) << "Dropping platform message on channel: " << channel;
}
```

## RuntimeController

```cpp
bool RuntimeController::DispatchPlatformMessage(
    std::unique_ptr<PlatformMessage> message) {
  if (auto* platform_configuration = GetPlatformConfigurationIfAvailable()) {
    TRACE_EVENT1("flutter", "RuntimeController::DispatchPlatformMessage",
                 "mode", "basic");
    platform_configuration->DispatchPlatformMessage(std::move(message));
    return true;
  }

  return false;
}
```

## PlatformConfiguration

```cpp
void PlatformConfiguration::DispatchPlatformMessage(
    std::unique_ptr<PlatformMessage> message) {
  std::shared_ptr<tonic::DartState> dart_state =
      dispatch_platform_message_.dart_state().lock();

  tonic::DartState::Scope scope(dart_state);
  Dart_Handle data_handle =
      (message->hasData()) ? ToByteData(message->data()) : Dart_Null();

  int response_id = 0;
  if (auto response = message->response()) {
    response_id = next_response_id_++;
    pending_responses_[response_id] = response;
  }

  tonic::LogIfError(
      tonic::DartInvoke(dispatch_platform_message_.Get(),
                        {tonic::ToDart(message->channel()), data_handle,
                         tonic::ToDart(response_id)}));
}
```

## DartInvoke

```cpp
Dart_Handle DartInvoke(Dart_Handle closure,
                       std::initializer_list<Dart_Handle> args) {
  int argc = args.size();
  Dart_Handle* argv = const_cast<Dart_Handle*>(args.begin());
  Dart_Handle handle = Dart_InvokeClosure(closure, argc, argv);
  LogIfError(handle);
  return handle;
}
```
