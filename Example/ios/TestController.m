//
//  TestController.m
//  Example
//
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "TestController.h"
#import "PushController.h"

#import "AppDelegate.h"
#import "PushButton.h"

#import "RCTComponent.h"

// 跳转页面相关
#import "RCTRootView.h"
#import "RCTBundleURLProvider.h"

#import "ReactView.h"


#define SCREEN_WIDTH [UIScreen mainScreen].bounds.size.width
#define SCREEN_HEIGHT [UIScreen mainScreen].bounds.size.height


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
  
//  ReactView *reactView = [[ReactView alloc]initWithFrame:CGRectMake(0, 200, SCREEN_WIDTH, 200)];
//  
//  [self.view addSubview:reactView];

  
  UIButton *button = [UIButton buttonWithType:(UIButtonTypeCustom)];
  button.frame = CGRectMake(SCREEN_WIDTH / 2 - 150, 80, 300, 80);
  button.backgroundColor = [UIColor redColor];
  [button setTitle:@"点击我，跳转到React-Native页面" forState:(UIControlStateNormal)];
  [button addTarget:self action:@selector(click) forControlEvents:(UIControlEventTouchUpInside)];
  [self.view addSubview:button];
  
}

- (void)click{
  
  PushController *push = [[PushController alloc]init];
  [self.navigationController pushViewController:push animated:YES];
}


@end
