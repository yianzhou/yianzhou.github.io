# SQL

## 基本查询

```sql
SELECT *
FROM [14830].[file_key_event] AS t
WHERE t.event_time = #relative_time:1:day:%yyyy-MM-dd HH:mm:ss%#
    AND t.app_version LIKE '12.%'
    AND NOT t.app_version LIKE '12.0%'
    AND NOT t.app_version LIKE '12.1%'
    AND t.eventName = 'tech_webview_finish_navigation'
```

## GROUP BY

GROUP BY 语句用于结合合计函数，根据一个或多个列对结果集进行分组。

```sql
SELECT SUBSTRING(event_time, 1, 10) as dateString,
    regexp_extract(extra, 'ext:[^,]*', 0) AS ext,
    regexp_extract(extra, 'qdoc_type:[^,]*', 0) AS qdoc_type,
    count(DISTINCT A1) AS uv,
    count(A1) AS pv
FROM [14830].[file_key_event] AS t
WHERE t.event_time = #relative_time:1:day:%yyyy-MM-dd HH:mm:ss%#
    AND t.app_version LIKE '12.%'
    AND NOT t.app_version LIKE '12.0%'
    AND NOT t.app_version LIKE '12.1%'
    AND t.eventName = 'doc_exposed'
GROUP BY ext,
    qdoc_type
ORDER BY uv DESC
```

## 开窗函数

```sql
SELECT dateString,
    isThirdInvoke,
    uv,
    uv * 100 / sum(uv) over(partition by dateString) as percent
FROM (
        SELECT SUBSTRING(event_time, 1, 10) as dateString,
            regexp_extract(extra, 'isThirdInvoke:[^,]*', 0) as isThirdInvoke,
            count(A1) as uv
        FROM [14830].[file_key_event] as t
        WHERE t.event_time = #relative_time:30:day:%yyyy-MM-dd HH:mm:ss%#
            AND t.app_version like '12.%'
            AND not t.app_version like '12.0%'
            AND not t.app_version like '12.1%'
            AND t.eventName = 'doc_exposed'
            AND regexp_extract(extra, 'isThirdInvoke:[^,]*', 0) <> ''
        GROUP BY dateString,
            isThirdInvoke
    ) t1
ORDER BY dateString DESC
```

## 百分位

```sql
SELECT t2.dateString,
    ApproxPercentile(t2.doubleInterval, 0.3) as 耗时30分位,
    ApproxPercentile(t2.doubleInterval, 0.5) as 耗时50分位,
    ApproxPercentile(t2.doubleInterval, 0.7) as 耗时70分位,
    ApproxPercentile(t2.doubleInterval, 0.9) as 耗时90分位
FROM (
        SELECT SUBSTRING(event_time, 1, 10) as dateString,
            CAST(
                split_part(
                    regexp_extract(extra, 'interval:[^,]*', 0),
                    ':',
                    2
                ) as double
            ) as doubleInterval
        FROM [14830].[file_key_event] as t
        WHERE t.event_time = #relative_time:30:day:%yyyy-MM-dd HH:mm:ss%#
            AND t.app_version like '12.%'
            AND not t.app_version like '12.0%'
            AND not t.app_version like '12.1%'
            AND t.eventName = 'tech_webview_finish_navigation'
    ) t2
GROUP BY t2.dateString
```

## JOIN

Here are the different types of the JOINs in SQL:

- (INNER) JOIN: Returns records that have matching values in both tables
- LEFT (OUTER) JOIN: Returns all records from the left table, and the matched records from the right table
- RIGHT (OUTER) JOIN: Returns all records from the right table, and the matched records from the left table
- FULL (OUTER) JOIN: Returns all records when there is a match in either left or right table

![img](/img/36F8F8B7-9271-4694-8B79-F858242D7CE1.png)

```sql
SELECT t1.dateStr as 日期,
    t1.uv as 大盘UV,
    t2.uv as 文件UV,
    CONCAT(
        Cast(
            Cast(t2.uv / t1.uv * 100 as decimal(18, 2)) as varchar(5)
        ),
        '%'
    ) as 百分比
FROM (
        SELECT SUBSTRING(event_time, 1, 10) AS dateStr,
            COUNT(distinct uin) AS uv
        FROM [14830].[rqd_applaunched] AS t
        WHERE t.event_time = #relative_time:30:day:%yyyy-MM-dd HH:mm:ss%#
            AND t.app_version like '12.%'
            AND not t.app_version like '12.0%'
            AND not t.app_version like '12.1%'
        GROUP BY dateStr
    ) t1
    LEFT JOIN (
        SELECT SUBSTRING(event_time, 1, 10) as dateStr,
            COUNT(distinct A1) as uv
        FROM [14830].[file_homepage_event] as t
        WHERE t.event_time = #relative_time:30:day:%yyyy-MM-dd HH:mm:ss%#
            AND t.app_version like '12.%'
            AND not t.app_version like '12.0%'
            AND not t.app_version like '12.1%'
            AND t.eventName = 'file_home_exposure'
        GROUP BY dateStr
    ) t2 ON t1.dateStr = t2.dateStr
ORDER BY 日期 DESC
```
