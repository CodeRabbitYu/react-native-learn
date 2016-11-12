//
//  ReactView.m
//  Example
//
//  Created by 郭洪安 on 2016/11/9.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "ReactView.h"

#import <RCTRootView.h>

@implementation ReactView


- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    NSString * strUrl = @"http://localhost:8081/index.ios.bundle?platform=ios&dev=true";
    NSURL * jsCodeLocation = [NSURL URLWithString:strUrl];
    // 这里的moduleName一定要和下面的index.ios.js里面的注册一样
    RCTRootView * rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                         moduleName:@"Three"
                                                  initialProperties:nil
                                                      launchOptions:nil];
    
    [self addSubview:rootView];
    
    rootView.frame = self.bounds;
  }
  return self;
}

@end
