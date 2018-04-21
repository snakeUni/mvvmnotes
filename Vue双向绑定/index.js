/*
* Vue的双向
*/

/*
*	<div id="timo-app">
	    <input type="text" v-model="timo">
	    <p>{{timp}}</p>
	    <button v-on:click="getTimo">get Timo</button>
	</div>

	var vm = new TimoVue({
        el: '#timo-app',
        data: {
            timo: 'Hello Timo!'
        },
        methods: {
            getTimo: function() {
                this.timo = 'this is timo';
            }
        }
    });
*/

/*
----- 实现一个数据监听器Observer, 监听数据的变动
----- 实现指令编译器Compile, 对元素的节点的指令进行扫描和解析, 根据指令模板替换数据，绑定更新函数
----- 实现watcher, 订阅数据的变化, 执行指令绑定函数的回调
*/