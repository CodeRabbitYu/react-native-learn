//
//  PushView.m
//  Example
//
//  Created by 郭洪安 on 2016/11/12.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "PushView.h"

@implementation PushView

- (instancetype) initWithFrame:(CGRect)frame{
  if ((self = [super initWithFrame:frame])) {
    [self setTitle:@"Cain" forState:UIControlStateNormal];
    [self setTitleColor:[UIColor blackColor] forState:UIControlStateNormal];
    [self addTarget:self action:@selector(click) forControlEvents:UIControlEventTouchUpInside];
  }
  return self;
}

- (void)click {
  NSLog(@"123");
}

@end
