//
//  TestController.m
//  Example
//
//  Created by 郭洪安 on 2016/10/31.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "TestController.h"

#import "AppDelegate.h"

@interface TestController ()


@end

@implementation TestController

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

- (void)viewDidLoad {
    [super viewDidLoad];
  
    self.navigationItem.title = @"我是原生页面哟~";
  
    self.view.backgroundColor = [UIColor whiteColor];
  
  UIButton *button = [[UIButton alloc]initWithFrame:CGRectMake(100, 100, 100, 100)];
  [button setTitle:@"点击我，跳转到RN页面呦~" forState:(UIControlStateNormal)];
  
  [self.view addSubview:button];
  
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(doPushNotification:) name:@"RNOpenOneVC" object:nil];
  
}

- (void)doPushNotification:(NSNotification *)notification{
  NSLog(@"成功收到===>通知");
  TestController *one = [[TestController alloc]init];
  
    AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  
  [app.nav pushViewController:one animated:YES];
  
  //注意不能在这里移除通知否则pus进去后有pop失效
}


@end
