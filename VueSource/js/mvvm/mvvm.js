/**
 * vm实例的构造函数
 */
function MVVM(options) {
    // 保存配置对象到vm上
    this.$options = options || {};
    // 保存配置对象的data属性对象到vm上和定义的变量上
    var data = this._data = this.$options.data;
    // 保存vm
    var me = this;

    /**
     * 遍历data中所有数据属性 并且掉欧阳那个__proxyData函数进行数据代理
     */
    Object.keys(data).forEach(function(key) {
        me._proxyData(key);
    });

    this._initComputed();
    // 对data中的所有属性进行监视劫持
    observe(data, this);
    // 创建一个编译对象编译模板
    this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
    constructor: MVVM,
    $watch: function(key, cb, options) {
        new Watcher(this, key, cb);
    },
    // 实现vm的数据代理
    _proxyData: function(key) {
      // 保存vm对象
        var me = this;
        Object.defineProperty(me, key, { // 核心方法
            configurable: false, // 不可重新定义
            enumerable: true, // 可以枚举
            /**
             * 通过vm.xx触发get
             */
            get: function proxyGetter() {
                return me._data[key];
            },
            /**
             * 通过 vm.xx = xxx 触发set
             */
            set: function proxySetter(newVal) {
                me._data[key] = newVal; // 和data属性指向的是同一个对象
            }
        });
    },

    _initComputed: function() {
        var me = this;
        var computed = this.$options.computed;
        if (typeof computed === 'object') {
            Object.keys(computed).forEach(function(key) {
                Object.defineProperty(me, key, {
                    get: typeof computed[key] === 'function' 
                            ? computed[key] 
                            : computed[key].get,
                    set: function() {}
                });
            });
        }
    }
};