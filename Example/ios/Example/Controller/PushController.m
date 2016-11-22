//
//  PushController.m
//  Example
//
//  Created by 郭洪安 on 2016/11/12.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "PushController.h"
#import "AppDelegate.h"
#import "RCTRootView.h"
#import "RCTBundleURLProvider.h"

@interface PushController ()

@end

@implementation PushController

- (void)viewDidLoad {
    [super viewDidLoad];

  self.view.backgroundColor = [UIColor whiteColor];
  
  self.navigationItem.title = @"我是ReactNative页面呦~";

  NSURL *jsCodeLocation;
  
  // 另外一种可以获得RN的类方法
//  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:[NSString stringWithFormat:@"./App/Page/ThreePage/Three"] fallbackResource:nil];
  NSString * strUrl = @"http://localhost:8081/index.ios.bundle?platform=ios&dev=true";
  
  jsCodeLocation = [NSURL URLWithString:strUrl];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Three"
                                               initialProperties:@{
                                                                   
                                                                   @"launchOptions":@{
                                                                       @"componentName":@"PageOne"
                                                                       }
                                                                   }
                                                   launchOptions:nil];
  self.view = rootView;
  
}

- (void)viewWillAppear:(BOOL)animated{
  AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  [app.nav setNavigationBarHidden:NO animated:animated];
  [super viewWillAppear:animated];
}

- (void)viewWillDisappear:(BOOL)animated{
  AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  [app.nav setNavigationBarHidden:YES animated:animated];
  [super viewWillDisappear:animated];
}

@end
