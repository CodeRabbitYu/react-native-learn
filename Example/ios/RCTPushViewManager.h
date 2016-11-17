//
//  RCTPushViewManager.h
//  Example
//
//  Created by 郭洪安 on 2016/11/14.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RCTViewManager.h"
#import "PushButton.h"
@interface RCTPushViewManager : RCTViewManager<ShareButtonClickedDelegate>

/** <#type#> */
@property (nonatomic, strong) PushButton *button;


@end
