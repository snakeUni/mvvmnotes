/**
 * [handle description]
 * @type {[type]}
 * window.requestIdleCallback()会在浏览器空闲时期依次调用函数， 
 * 这就可以让开发者在主事件循环中执行后台或低优先级的任务，
 * 而且不会对像动画和用户交互这样延迟触发而且关键的事件产生影响。
 * 函数一般会按先进先调用的顺序执行，除非函数在浏览器调用它之前就到了它的超时时间。
 * 
 *
 * 参数
 * 	callback：
	 	一个即将被调用的函数的引用。函数会接收到一个名为 deadline 的参数，它具有如下属性 :
		timeRemaining： 一个返回DOMHighResTimeStamp的函数的引用。
		didTimeout： 布尔型，如果 callback 在空闲时间被客户端执行，它的值为 false，其他情况它的值为 true (例如：options 中给了超时时间，并且在超时过期时仍没有足够的空闲时间)。
	options 可选
		包括可选的配置参数。具有如下属性：
		timeout：浏览器调用 callback 的最后期限。它的单位是毫秒。
 */
var handle = window.requestIdleCallback(callback[, options])