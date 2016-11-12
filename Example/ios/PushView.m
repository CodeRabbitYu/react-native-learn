//
//  PushView.m
//  Example
//
//  Created by 郭洪安 on 2016/11/12.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "PushView.h"

@implementation PushView

- (instancetype)init {
  if (self = [super init]) {
    UILabel * title = ({
      UILabel * label = [[UILabel alloc] init];
      label.frame = CGRectMake(100, 100, 200, 200);
      label.text = @"我是原生UI";
      label.textColor = [UIColor blackColor];
      label.backgroundColor = [UIColor blueColor];
      
      label;
    });
    
    [self addSubview:title];
  }
  return self;
}
@end
