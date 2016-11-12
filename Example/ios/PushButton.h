//
//  PushButton.h
//  Example
//
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

#import "RCTComponent.h"

@protocol ShareButtonClickedDelegate <NSObject>
- (void)ButtonClicked;
@end
@interface PushButton : UIButton

@property (nonatomic, copy) NSString * btnTitle;//分享的文本
/** button点击事件 */
@property (nonatomic, copy) RCTBubblingEventBlock onButtonClicked;

@property (nonatomic, strong) id <ShareButtonClickedDelegate> ClickDelagate;

@end

