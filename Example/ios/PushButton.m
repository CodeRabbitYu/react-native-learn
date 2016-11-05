//
//  PushButton.m
//  Example
//
//  Created by 郭洪安 on 2016/11/5.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "PushButton.h"

@implementation PushButton

//分享按钮初始化
- (instancetype) initWithFrame:(CGRect)frame{
  if ((self = [super initWithFrame:frame])) {
    [self addTarget:self action:@selector(click)
   forControlEvents:UIControlEventTouchUpInside];
  }
  return self;
}

// 按钮分享事件
- (void)click {
  NSLog(@"我是原生按钮点击事件呦");
  
}

@end
