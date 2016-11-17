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

#import "ReactView.h"
#import "RCTBundleURLProvider.h"

@interface PushController ()

@end

@implementation PushController

- (void)viewDidLoad {
    [super viewDidLoad];

  self.view.backgroundColor = [UIColor whiteColor];
  
  NSURL *jsCodeLocation;
//  
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
  
//  ReactView *reactView = [[ReactView alloc]initWithFrame:self.view.bounds];
//  self.view = reactView;
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
