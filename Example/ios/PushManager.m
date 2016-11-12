//
//  pushManager.m
//  Example
//
//  Created by 郭洪安 on 2016/11/12.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "pushManager.h"
#import "PushView.h"
@implementation pushManager

RCT_EXPORT_MODULE()

//RCT_EXPORT_VIEW_PROPERTY(btnTitle, NSString)

- (UIView *)view
{
//  _pushButton = [[PushButton alloc] initWithFrame:CGRectMake(0, 0, 0, 0)];
//  return _pushButton;
  return [PushView new];
}

@end
