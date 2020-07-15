function Observer(data) {
   // 保存data
    this.data = data;
    // 启动劫持监视
    this.walk(data);
}

Observer.prototype = {
    constructor: Observer,
    walk: function(data) {
        var me = this;
        // 遍历data中所有的最外层属性
        Object.keys(data).forEach(function(key) {
            // 给data定义响应式属性
            me.defineReactive(data, key, data[key]);
        });
    },
    // 给vm中的data定义响应式属性
    defineReactive: function(data, key, val) {
        // 为当前创建的属性创建一个dep （订阅器）
        var dep = new Dep();
        // 通过隐式递归对所有层次属性的监视
        var childObj = observe(val); 
        // 重新定义data中的属性 --- 因为开始没有get set 不能进行数据绑定
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
               // 建立dep和watcher的关系
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            // 一旦更新data中某个属性调用set
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知dep订阅器通知所有相关的watcher 执行他的回调函数从而达到自动改变节点的效果 --- 实现数据绑定
                dep.notify();
            }
        });
    }
};

function observe(value, vm) {
    // 判断vm中data是否为空
    if (!value || typeof value !== 'object') {
        return;
    }
    // 创建观察者对象 （一个或者多个：每层属性都有一个观察者对象）
    return new Observer(value);
};


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },

    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

Dep.target = null;