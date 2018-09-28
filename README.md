# mvvmnotes
基于Vue/React/Angular4的一些知识

### react的一些小总结
这样的一段代码肯定是我们常见的,但是如果做了scu优化的时候就会出现问题,页面不会再更新
在setState的之前就把我们的baseState改了，所以在做一次比较的时候，此时baseState === nextState的
这个地方要进行注意, 如果用的是pureComponent的话，
因为React.PureComponent implements it with a shallow prop and state comparison.
```
const _list = this.state.list
_list.push(4)
this.setState({list: _list})
```
那咱们也可以这么写
```
const list = this.state.list
this.setState({list: [...list, xxx]})
```
我们知道setState第一个参数也是可以传递函数的
```
this.setState(state => {
  return {list: [...state.list, xxx]}
})
```
