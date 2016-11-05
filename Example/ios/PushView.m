//
//  PushView.m
//  Example
//
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "PushView.h"
#import "RCTViewManager.h"

#define SCREEN_WIDTH [UIScreen mainScreen].bounds.size.width
#define SCREEN_HEIGHT [UIScreen mainScreen].bounds.size.height

@implementation PushView

RCT_EXPORT_MODULE()

RCT_EXPORT_VIEW_PROPERTY(onButtonClicked, RCTBubblingEventBlock)


- (UIView *)view
{
  
    _button = [[PushButton alloc]initWithFrame:CGRectMake(SCREEN_WIDTH / 2 - 150, 100, 300, 100)];;
    _button.backgroundColor = [UIColor redColor];
    return _button;
  
}

@end
