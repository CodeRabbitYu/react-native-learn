# Learn React-Native
## Example
这个工程是我学习react-native的总结，我会把学到的东西，遇到的问题，总结的经验放在里面，希望以后再遇到问题的时候可以找到解决的办法，也希望可能帮到其他人。
## OnePage:
这是一个关于计时器使用的例子,是我通过学习[30-days-of-react-native](https://github.com/fangwei716/30-days-of-react-native)第一天的内容得到的。
## TwoPage:
这是一个宝宝秀项目，是照着网上的一个付费视频写的，已经完成了第一个模块的功能开发，有视频播放与暂停，评论功能，接口的调用。这个会一直更新的这个项目结束。
## ThreePage:
这是react-native页面跳转到原生页面的案例，过两天会把整个流程完善。
这个是我之前写的一篇关于[在iOS中创建React-Native页面，并跳转到原生页面](http://www.jianshu.com/p/ffe9e8b8dbe6)的文章,
今天在简书上更新了一篇文章[在react-native的项目中跳转到原生iOS页面](http://www.jianshu.com/p/2baeac04275e)
### 经验：
* 计时器的一些使用方式  

`setInterval()`    会不停地调用函数。

```
// 最后的参数指每隔1s调用一次函数
this.setIntervar = setInterval(()=>{},1000) 
``` 

`setTimeout()`     只调用函数一次。  

```
this.setTimeout = setTimeout(()=>{},1000)
```

`clearInterval()`  可以关闭setInterval()。  
    
```
this.setIntervar && clearInterval(this.setIntervar);
``` 

* `InteractionManager`可以将一些耗时较长的工作安排到所有互动或动画完成之后再进行
 
```  
 InteractionManager.runAfterInteractions(() => {
  // ...耗时较长的同步的任务...
  // 比如页面跳转
});
```

* 这个方法可以得到Navigator的层级关系；  

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
* 设置通知栏是否隐藏,0不隐藏,1隐藏

```
StatusBar.setBarStyle(0/1);
```
* 状态机：里面的值可以在本页面进行修改，通过this.state.XXX获取，通过this.setState({})修改里面的值

```
constructor(props){
    super(props);
    var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
    this.state = {
        //默认的参数，可以通过this.setState({})修改里面的参数
        dataSource : dataSource,
    };  
     
    // 这里面可以用来绑定this.XXX()方法，也可以用来初始化ListViewDataSource方法
    this.XXX = this.XXX.bind(this);
}
```
* 不可变的属性，也可以当做跨页面参数来使用，可以通过this.props.XXX获取里面的参数；

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
* 生命周期(以后完善)

```
// 程序加载完成的时候调用
componentDidMount(){
    // 一些复杂的操作
    // 每隔多少时间
    duration:1000
}
```
* 三位运算符`{ ? : }`  
在react-native里面用到最多的东西应该就是三位运算符了，它免去了麻烦的判断，只需要根据组件的状态来判断显示什么样页面与数据
* 网络请求  
在react-native中使用最多的就是`fetch`请求了，在`fetch`请求中可以传`url`,`body`参数，也可以请求`GET`,`POST`,`PUT`等方式

```
fetch(url ,{
            method: 'GET', // 这里可以改成POST
            // 如果是POST请求，可以将需要请求的参数写在里面
            headers: {
                'Accept-Encoding': '',
                'Content-Type': '',
                'User-Agent': '',
            }
        })
        // 这是一个解析JSON的方法，也可以将response.json()改成response.text()这个需要和后台商量好
        .then((response) => response.json())  
        .then((responseData)=> {
            // responseData就是解析过来的JSON对象
            console.log(responseData);
        })  
        .catch((error)=> {  
            if (error) {  
                //特殊处理  
                console.log(error);  
            }
        });
```
* 在RN里面同一个页面是可以写两个类的，但只能导出一个`export`，一般情况下第二个类都是对第一个的补充，所以最好在第二个类中公开一些方法

```
class ImageItem extends Component {
    static defaultProps = {
        // 比如说第一个类需要封装一个图片组件，那个给下面的类传一个imageName就可以了
        imageName: '',
    };
    render(){
        return(
            <Image source={{uri:this.props.imageName}} style={styles.imageStyle} />
        )
    }
}
```
在第一个组件中通过调用ImageItem就可以了，将需要的参数传过去。

```
<ImageItem 
    imageName={}
/>
```



### 推荐的第三方开源组件（我只写我用到过的，感觉很不错的库，在后面我会为这些库写一些文章把我遇到的问题写出来）
1. 导航条组件：[react-native-navbar](https://github.com/react-native-community/react-native-navbar)  
推荐原因：用过系统Navigator组件后，一般都需要自己自定制导航条的按钮和标题，用了这个组件会剩下很多的步骤。这个组件在我的项目中一直用到；
2. 底部TabBar组件：[react-native-tab-navigator](https://github.com/exponentjs/react-native-tab-navigator)  
推荐原因：多数的APP都会存在底部的选项卡，这个组件就是用来实现这个的。这个组件在我的项目中TwoPage中有用到；
3. 底部TabBar组件：[react-native-scrollable-tab-view](https://github.com/skv-headless/react-native-scrollable-tab-view)  
推荐原因：用过安卓版微信的用户知道，底部的TabBar是可以左右滚动的，这个组件就可以实现这个功能。这个组件会在之后用到；
4. 图标：[react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)  
推荐原因：这个组件可以为你省去找UI要图片的步骤，而且这个组件可以用在很多地方，据说使用这个组件会让图标的加载更流畅。这个组件在项目中很多地方有用到；
5. 轮播图：[react-native-swiper](react-native-swiper)  
推荐原因：这个组件可以用来做为广告轮播图，页面切换等等，反正是很抢到的一个库。这个组件在项目中很多地方有用到；
6. 视频播放：[react-native-video](http://serve.3ezy.com/github.com/brentvatne/react-native-video/)  
推荐原因：一个类似于HTML5中`<Video>`标签的视频播放器，可以实现视频的自动播放，暂停等等。在TwoPage中有用到；
7. 未完待续

