//
//  PushNative.m
//  Example
//
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "PushNative.h"
#import "RCTBridge.h"

#import "TestController.h"
#import "AppDelegate.h"

#import "RCTViewManager.h"

@implementation PushNative

RCT_EXPORT_MODULE()
//RN跳转原生界面
RCT_EXPORT_METHOD(RNOpenOneVC:(NSString *)msg){
  
  NSLog(@"RN传入原生界面的数据为:%@",msg);
  //主要这里必须使用主线程发送,不然有可能失效
  dispatch_async(dispatch_get_main_queue(), ^{
//    [[NSNotificationCenter defaultCenter]postNotificationName:@"RNOpenOneVC" object:nil];
    TestController *one = [[TestController alloc]init];
    
    AppDelegate *app = (AppDelegate *)[[UIApplication sharedApplication] delegate];
    
    [app.nav pushViewController:one animated:YES];
  });
}

@end
