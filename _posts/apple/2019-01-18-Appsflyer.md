---
title:  "Appsflyer 安装归因"
categories: [Development]
---

# Mobile Attribution

<https://www.appsflyer.com/product/mobile-attribution-for-user-acquisition/>

What is mobile attribution? Mobile attribution determines which campaigns, partners and channels delivered each app install.

In short, AppsFlyer tells you where every mobile app install came from, in real-time, across every marketing channel and ad network, anywhere in the world.

Fingerprinting is a primary component of all mobile attribution.
![image](https://massets.appsflyer.com/wp-content/uploads/2018/01/22120649/loose-false-attribution-03.jpg)

AppsFlyer is the only attribution provider to dynamically adapt our fingerprinting based on the uniqueness of every IP address. With billions of new interactions recorded every day, our unique scale and machine learning powers an IP address uniqueness rating. NativeTrack then tightens or even closes our fingerprinting based on the IP uniqueness rating, lowering your false attribution and organic cannibalization by up to 50%.

![image](https://massets.appsflyer.com/wp-content/uploads/2018/01/22120706/loose-false-attribution-04-1024x742.png)

AppsFlyer’s NativeTrackTM provides marketers with the insights they need to understand every step in the customer journey leveraging last-touch, multi-touch, or fractional attribution models.

![image](https://massets.appsflyer.com/wp-content/uploads/2016/10/26142157/soccer2-for-website-01.jpg)

How it works?
- 3,000+ integrated partners
- Certified Network Integrations: server-to-server integrations with Facebook, Google, Twitter, Snapchat and Pinterest, etc.
- View-Through Attribution: attribute an install to a media source based an ad being viewed, even if it wasn’t clicked.
- NativeTrack™: Dynamic, Full Profile Fingerprinting
- OneLink™: Universal Deep Linking

# Deep Linking

 A link is sometimes referred to as a URL or URI (Universal Resource Locator / Indicator), refers to a file with a address.

In programming, a URI (Uniform Resource Identifier) is just a string of characters to identify the name of a resource on a network. The most common URI out there is the URL.

Example Link ‘https://www.walmart.com’. This is a URL or “link”. It has two main components, separated by a colon.

Protocol Identifier (Scheme): ‘https’ – this is the protocol identifier or the scheme.

Resource Name: ‘www.walmart.com’. It includes the subdomain, domain and top level domain (in that order) combined into a single string.

# SDK

You can track **installs**, **updates**, **sessions** and additional [in-app events](https://support.appsflyer.com/hc/en-us/articles/115005544169#Introduction) (including in-app purchases, game levels, etc.) to evaluate ROI and user engagement levels.

[iOS SDK 接入](https://support.appsflyer.com/hc/en-us/articles/207032066-AppsFlyer-SDK-Integration-iOS)

测试 SDK 时，要将设备加入白名单。By default, an install is ignored if we see a previous install on the same device within the last 90 days. The only exception is if the device is on the whitelist, in which case all installs from this device are considered "new installs".
