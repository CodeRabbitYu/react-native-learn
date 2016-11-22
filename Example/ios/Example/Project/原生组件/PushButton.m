//
//  PushButton.m
//  Example
//
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "PushButton.h"

@implementation PushButton

- (instancetype) initWithFrame:(CGRect)frame{
  if ((self = [super initWithFrame:frame])) {
    [self setTitle:@"Cain" forState:UIControlStateNormal];
    [self addTarget:self action:@selector(click)
   forControlEvents:UIControlEventTouchUpInside];
  }
  return self;
}

// 按钮分享事件
- (void)click {
  NSLog(@"我是原生按钮点击事件呦");
  [self.ClickDelagate ButtonClicked];
}

- (void)setBtnTitle:(NSString *)btnTitle{
  [self setTitle:btnTitle forState:(UIControlStateNormal)];
}


@end
