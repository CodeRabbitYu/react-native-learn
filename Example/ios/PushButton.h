//
//  PushButton.h
//  Example
//
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

#import "RCTComponent.h"

@interface PushButton : UIButton

/** button点击事件 */
@property (nonatomic, copy) RCTBubblingEventBlock onButtonClicked;

@end
