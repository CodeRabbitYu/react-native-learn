# Learn React-Native
## Example
这个工程是我学习react-native的总结，我会把每天学到的东西，遇到的问题，总结的经验放在里面，希望以后再遇到问题的时候可以找到解决的办法，也希望可能帮到其他人。
## OnePage:
这是一个关于计时器使用的例子,是我通过学习[30-days-of-react-native](https://github.com/fangwei716/30-days-of-react-native)第一天的内容得到的。
### 经验：
1. setInterval()    会不停地调用函数。  this.setIntervar = setInterval(()=>{})  
   setTimeout()     只执行函数一次。  
   clearInterval()  可以关闭setInterval()。  this.setIntervar && clearInterval(this.setIntervar);
   
2. InteractionManager.runAfterInteractions(()=>{})  过渡动画，可以将Push动画放在里面
3. var currentRoute = this.props.navigator.getCurrentRoutes();  这个方法可以得到Navigator的层级关系；  
   
```
for(var i = 0 ; i <currentRoute.length ; i ++){
    if (currentRoute[i].name == 'Root'){
                    this.props.navigator.popToRoute(currentRoute[i]);
                }
            }
```


