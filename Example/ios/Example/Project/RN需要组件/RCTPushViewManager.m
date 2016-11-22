//
//  RCTPushViewManager.m
//  Example
//
//  Created by 郭洪安 on 2016/11/14.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RCTPushViewManager.h"

@implementation RCTPushViewManager

RCT_EXPORT_MODULE()
@synthesize bridge = _bridge;

- (UIView *)view
{
  _button = [[PushButton alloc] initWithFrame:CGRectMake(0, 0, 0, 0)];
  _button.ClickDelagate = self;
  return _button;

}

RCT_EXPORT_VIEW_PROPERTY(btnTitle, NSString)

RCT_EXPORT_VIEW_PROPERTY(onButtonClicked, RCTBubblingEventBlock)


- (void)ButtonClicked {
  NSInteger x = arc4random() % 100;
  NSLog(@"原生事件%ld",x);
  _button.onButtonClicked(@{@"randomValue": [NSNumber numberWithInteger:x]});
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

@end
