# UIImage

```objc
- (void)zya_saveToPath:(NSString *)filePath {
    if (filePath.length == 0) {
        return;
    }
    @autoreleasepool {
        CFURLRef url = (__bridge CFURLRef)[NSURL fileURLWithPath:filePath];
        CGImageDestinationRef destination = CGImageDestinationCreateWithURL(url, kUTTypePNG, 1, NULL);
        CGImageDestinationAddImage(destination, [self CGImage], nil);
        CFRelease(destination);
    }
}

/// Convert UIImage to NSData using Core Graphics API
- (NSData *)zya_NSData {
    // Create a mutable data object
    NSMutableData *data = [NSMutableData data];

    // Create a CGImageDestinationRef using the data object and the MIME type
    CGImageDestinationRef destination = CGImageDestinationCreateWithData((__bridge CFMutableDataRef)data, kUTTypeJPEG, 1, NULL);

    // Check if the destination was created successfully
    if (!destination) {
        return nil;
    }

    // Create a CGImageRef from the UIImage
    CGImageRef cgImage = self.CGImage;

    // Add the CGImageRef to the destination
    CGImageDestinationAddImage(destination, cgImage, nil);

    // Finalize the destination
    if (!CGImageDestinationFinalize(destination)) {
        CFRelease(destination);
        return nil;
    }

    // Release the destination
    CFRelease(destination);

    // Return the data object
    return data;
}

- (void)screenshot {
    CGSize imageSize = [UIScreen mainScreen].bounds.size;

    UIGraphicsBeginImageContextWithOptions(imageSize, NO, 0);
    CGContextRef context = UIGraphicsGetCurrentContext();
    UIWindow *window = [[[UIApplication sharedApplication] windows] firstObject]
    CGContextSaveGState(context);
    CGContextTranslateCTM(context, window.center.x, window.center.y);
    CGContextConcatCTM(context, window.transform);
    CGContextTranslateCTM(
                          context, -window.bounds.size.width * window.layer.anchorPoint.x, -window.bounds.size.height * window.layer.anchorPoint.y);
    [window drawViewHierarchyInRect:window.bounds afterScreenUpdates:NO];
    CGContextRestoreGState(context);

    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return image;
}
```