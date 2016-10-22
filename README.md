# Learn React-Native
## Example
这个工程是我学习react-native的总结，我会把每天学到的东西，遇到的问题，总结的经验放在里面，希望以后再遇到问题的时候可以找到解决的办法，也希望可能帮到其他人。
## OnePage:
这是一个关于计时器使用的例子,是我通过学习[30-days-of-react-native](https://github.com/fangwei716/30-days-of-react-native)第一天的内容得到的。
## TwoPage:
这是一个宝宝秀项目，是照着网上的一个付费视频写的，已经完成了第一个模块的功能开发，有视频播放与暂停，评论功能，接口的调用。这个会一直更新的这个项目结束。
### 经验：
1.`setInterval()`    会不停地调用函数。

```
this.setIntervar = setInterval(()=>{}) 
``` 
   `setTimeout()`     只调用函数一次。  
   `clearInterval()`  可以关闭setInterval()。  
    
```
this.setIntervar && clearInterval(this.setIntervar);
``` 
   
2.`InteractionManager.runAfterInteractions(()=>{})`，过渡的动画可以将push的操作放在里面，需要引入`InteractionManager`；

3.这个方法可以得到Navigator的层级关系；  

```  
var currentRoute = this.props.navigator.getCurrentRoutes(); 
```
```
for(var i = 0 ; i <currentRoute.length ; i ++){
    if (currentRoute[i].name == 'Root'){
        this.props.navigator.popToRoute(currentRoute[i]);
    }
}
```
4.设置通知栏是否隐藏,0不隐藏,1隐藏

```
StatusBar.setBarStyle(0);
```
5.

