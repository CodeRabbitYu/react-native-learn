//
//  TestController.m
//  Example
//
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "TestController.h"

#import "AppDelegate.h"
#import "PushButton.h"
#import "RCTComponent.h"


#define SCREEN_WIDTH [UIScreen mainScreen].bounds.size.width
#define SCREEN_HEIGHT [UIScreen mainScreen].bounds.size.height


@interface TestController ()

/** <#type#> */
@property (nonatomic) PushView *pushView;

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

  
//    [self.view addSubview:btn];

  
}


@end
