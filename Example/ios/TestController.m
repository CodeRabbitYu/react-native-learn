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


- (void)viewDidLoad {
    [super viewDidLoad];
  
    self.navigationItem.title = @"我是原生页面哟~";
  
    self.view.backgroundColor = [UIColor whiteColor];
  
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
