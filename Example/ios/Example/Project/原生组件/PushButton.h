//
//  PushButton.h
//  Example
//
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

#import "RCTComponent.h"

// 这是一个封装好的react-native页面

@protocol PushButtonClickedDelegate <NSObject>

- (void)ButtonClicked;

@end

@interface PushButton : UIButton

@property (nonatomic, copy) NSString * btnTitle;//分享的文本
/** button点击事件 */
@property (nonatomic, copy) RCTBubblingEventBlock onButtonClicked;

@property (nonatomic, strong) id <PushButtonClickedDelegate> ClickDelagate;

@end

