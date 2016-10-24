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

2.`InteractionManager`可以将一些耗时较长的工作安排到所有互动或动画完成之后再进行
 
```  
 InteractionManager.runAfterInteractions(() => {
  // ...耗时较长的同步的任务...
});
```

3.这个方法可以得到Navigator的层级关系；  

```  
var currentRoute = this.props.navigator.getCurrentRoutes(); 
```
```
for(var i = 0 ; i <currentRoute.length ; i ++){
    if (currentRoute[i].name == '你想跳转的页面'){
        this.props.navigator.popToRoute(currentRoute[i]);
    }
}
```
4.设置通知栏是否隐藏,0不隐藏,1隐藏

```
StatusBar.setBarStyle(0/1);
```
5.状态机：里面的值可以在本页面进行修改，通过this.state.XXX获取，通过this.setState({})修改里面的值

```
constructor(props){
        super(props);
        // 这里面可以用来绑定this.XXX()方法，也可以用来初始化ListViewDataSource方法
        this.XXX = this.XXX.bind(this);
        var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
        this.state = {
            //默认的参数，可以通过this.setState({})修改里面的参数
            dataSource : dataSource,
        };
    }
```
6.不可变的属性，也可以当做跨页面参数来使用，可以通过this.props.XXX获取里面的参数；

```
static defaultProps = {
    // 里面写不可变的属性
};
```
这个方法是用来确定this.props.XXX类型的，如果XXX这个参数不写，就会报错

```
static propTypes = {
    // 必须要写的数组
    XXX: React.PropTypes.array.isXXX,
};
```
7.生命周期(以后完善)

```
// 程序加载完成的时候调用
componentDidMount(){
    // 一些复杂的操作
    // 每隔多少时间
    duration:1000
}
```
8.

