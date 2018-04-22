/*
* Vue的双向
*/

/*
----- 实现一个数据监听器Observer, 监听数据的变动
----- 实现指令编译器Compile, 对元素的节点的指令进行扫描和解析, 根据指令模板替换数据，绑定更新函数
----- 实现watcher, 订阅数据的变化, 执行指令绑定函数的回调
*/

function TimoVue(options) {
    this.init(options);
}

/*
*init函数
*/
TimoVue.prototype.init = function(options) {
    this.$options = options;
    this.$el = document.querySelector(options.el);  //根DOM元素
    this.$data = options.data;
    this.$methods = options.methods;

    this._binding = {};

    this.observer(this.$data);
    this.compile(this.$el);
}

/*
*实现observer监听器
*/
TimoVue.prototype.observer = function(data) {
    var _this = this;
    // 对data进行遍历
    Object.keys(data).forEach(function(key) {

        _this._binding[key] = {
            _directives: []
        };

        var value = data[key];
        //如果value是对象，则递归处理
        _this._observer(value);
        var binding = _this._binding[key];
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function() {
                console.log(`劫持${value}`);
                return value;
            },
            set: function(newVal) {
                console.log(`设置新的值 ${value} =====> ${newVal}`);
                value = newVal;
                binding._directives.forEach(function(item) {
                    item.update();
                })
            }
        })
    })
}
TimoVue.prototype._observer = function(value) {
    if(!!value && typeof value === 'object') {
        this.observer(value);
    }
}

/*
*实现compile view与model进行绑定
*/
TimoVue.prototype.compile = function(root) {
    //root为绑定的根元素
    var _this = this;
    var nodes = root.children;  //拿到所有的子节点 一个HTMLCollection对象
    var nodesArray = [].slice.call(nodes);  //转换成数组
    nodesArray.forEach(function(node) {
        _this._compile(node);
        if(node.hasAttribute('v-on:click')) {
            node.onclick = (function() {
                var attrVal = node.getAttribute('v-on:click');
                //bind使data的作用域与method保持一致
                return _this.$methods[attrVal].bind(_this.$data);
            })();
        }
        if(node.hasAttribute('v-model') && (node.tagName == 'INPUT' || 
            node.tagName == 'TEXTAREA')) {
            node.addEventListener('input', (function(key) {
                var attrVal = node.getAttribute('v-model');
                _this._binding[attrVal]._directives.push(new Watcher(
                    'input',
                    node,
                    _this,
                    attrVal,
                    'value'))

                return function() {
                    _this.$data[attrVal] = node.value;
                }
            })());
        }
        if(node.hasAttribute('v-bind')) {
            var attrVal = node.getAttribute('v-bind');
            _this._binding[attrVal]._directives.push(new Watcher(
                'text',
                node,
                _this,
                attrVal,
                'innerHTML'));
        }
    })
}
TimoVue.prototype._compile = function(node) {
    if(node.children && node.children.length) {
        this.compile(node);
    }
}
TimoVue.prototype._compileNode = function(node) {

}
TimoVue.prototype._compileText = function(node) {

}

/*
*实现watcher,绑定更新函数,相当于订阅者
*/
function Watcher(name, el, vm, exp, attr) {
    this.name = name;
    this.el = el;
    this.vm = vm;
    this.exp = exp;
    this.attr = attr;

    this.update();
}
Watcher.prototype.update = function() {
    this.el[this.attr] = this.vm.$data[this.exp];
}


















