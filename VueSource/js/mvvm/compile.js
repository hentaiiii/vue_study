function Compile(el, vm) {
  // 保存vm实例
  this.$vm = vm;
  // 得到el元素并且保存
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);
  // 如果el存在解析el模板
  if (this.$el) {
    // 将el中的元素放入文档碎片中（DocumentFragment）
    this.$fragment = this.node2Fragment(this.$el);
    // 对Fragment所有层次子节点进行递归编译
    this.init();
    // 将Fragment中的子节点添加为el的子节点
    this.$el.appendChild(this.$fragment);
  }
}

Compile.prototype = {
  constructor: Compile,
  // 将节点放入文档碎片中
  node2Fragment: function (el) {
    var fragment = document.createDocumentFragment(),
      child;

    // 将原生节点拷贝到fragment
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }

    return fragment;
  },

  init: function () {
    // 编译fragment中所有的子节点
    this.compileElement(this.$fragment);
  },

  compileElement: function (el) {
    // 得到最外层的子节点
    var childNodes = el.childNodes,
      // 保存compile对象的this
      me = this;
    // 遍历所有节点 -------- [].slice.call(类数组) 类数组 -> 真数组
    [].slice.call(childNodes).forEach(function (node) {
      // 保存节点为文本
      var text = node.textContent;
      // 匹配{{}}的正则
      var reg = /\{\{(.*)\}\}/;

      if (me.isElementNode(node)) { // 是否是元素节点
        // 编译元素节点的指令
        me.compile(node);
      } else if (me.isTextNode(node) && reg.test(text)) {  // 是否是文本节点 并且匹配正则模板
        // 编译插值语法的文本节点
        me.compileText(node, RegExp.$1.trim());
      }
      // 如果节点里面是否含有子节点 进行递归编译
      if (node.childNodes && node.childNodes.length) { 
        // 进行递归编译所有层次的子节点
        me.compileElement(node);
      }
    });
  },

  compile: function (node) {
    // 获取元素节点上的所有属性
    var nodeAttrs = node.attributes,
    // 保存compile对象的this
      me = this;
    // 遍历元素节点上的所有属性
    [].slice.call(nodeAttrs).forEach(function (attr) {
      // 取出所有属性名 v-bind:on 
      var attrName = attr.name;
      // 是否是指令
      if (me.isDirective(attrName)) {
        // 去除元素节点的属性的值
        var exp = attr.value;
        // 截取出去v-的属性 on:clik
        var dir = attrName.substring(2);
        // 判断是否是事件指令
        if (me.isEventDirective(dir)) {
          // 编译事件指令
          compileUtil.eventHandler(node, me.$vm, exp, dir);
          // 普通指令
        } else {
          // 判断是否定义了该指令  定义了则调用对应bind处理
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        }
        // 移除指令属性
        node.removeAttribute(attrName);
      }
    });
  },
  // 编译文本节点
  compileText: function (node, exp) { // node --- 该文本节点  exp --- 需要解析的属性名(name)
    compileUtil.text(node, this.$vm, exp);
  },
  // 判断一份属性是不是指令 
  isDirective: function (attr) {
    // 前面带有v-的就是
    return attr.indexOf('v-') == 0;
  },
  // 判断是否是事件指令
  isEventDirective: function (dir) {
    return dir.indexOf('on') === 0;
  },
  // 是否为元素节点
  isElementNode: function (node) {
    return node.nodeType == 1;
  },

  isTextNode: function (node) {
    return node.nodeType == 3;
  }
};

// 指令处理集合
/**
 * 编译模板语法的工具对象
 */
var compileUtil = {
  // 编译v-text 或 {{}}
  text: function (node, vm, exp) {
    this.bind(node, vm, exp, 'text');
  },
  // 编译v-html 
  html: function (node, vm, exp) {
    this.bind(node, vm, exp, 'html');
  },
  // 编译v-model
  model: function (node, vm, exp) {
    // 实现指令的初始化更新
    // 创建一个对应的watcher进行更新
    this.bind(node, vm, exp, 'model');

    var me = this,
      val = this._getVMVal(vm, exp);
      // 给节点绑定一个input监听
    node.addEventListener('input', function (e) {
      // 得到最新的值
      var newValue = e.target.value;
      // 绑定最新的值到data上去 ------- 触发数据绑定
      me._setVMVal(vm, exp, newValue);
      val = newValue;
    });
  },
  // 编译 v-class
  class: function (node, vm, exp) {
    this.bind(node, vm, exp, 'class');
  },
  /**
   * 真正编译的工具函数
   * @param {元素节点或者文本节点} node 
   * @param {vm对象} vm 
   * @param {表达式} exp ---- name
   * @param {指令名} dir  ---- text model等 
   */

  bind: function (node, vm, exp, dir) {
    // 根据指令名得到对应的更新函数
    var updaterFn = updater[dir + 'Updater'];
    // 执行更新节点的函数 （初始化更新）
    updaterFn && updaterFn(node, this._getVMVal(vm, exp));
    // 创建与模板中一一对应的watcher对象用于更新对应的节点
    new Watcher(vm, exp, function (value, oldValue) {
      // 当对应的属性发生改变时 此函数执行更新页面上的节点
      updaterFn && updaterFn(node, value, oldValue);
    });
  },

  /**
   * 事件指令的处理
   * @param {事件指令的元素} node 
   * @param {MVVM实例对象} vm 
   * @param {test} exp 
   * @param {on:click} dir 
   */
  eventHandler: function (node, vm, exp, dir) {
    var eventType = dir.split(':')[1], // click
      // 判断vm中的methods是否存在 取出vm中的methods的相对应的函数
      fn = vm.$options.methods && vm.$options.methods[exp];
    // methods中的对应函数和监听名称(click)都存在
    if (eventType && fn) {
      // 给该元素节点绑定对应的事件监听 顺便修改一下this为vm
      node.addEventListener(eventType, fn.bind(vm), false);
    }
  },
  // 取表达式对应的值
  _getVMVal: function (vm, exp) {
    var val = vm;
    exp = exp.split('.');
    exp.forEach(function (k) {
      val = val[k];
    });
    return val;
  },

  _setVMVal: function (vm, exp, value) {
    var val = vm;
    exp = exp.split('.');
    exp.forEach(function (k, i) {
      // 非最后一个key，更新val的值
      if (i < exp.length - 1) {
        val = val[k];
      } else {
        val[k] = value;
      }
    });
  }
};

/**
 * 包含一些原生dom操作更新节点的方法
 */
var updater = {
  /*更新节点的textContent操作 */
  textUpdater: function (node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value;
  },
  /*更新节点的innerHTML操作 */
  htmlUpdater: function (node, value) {
    node.innerHTML = typeof value == 'undefined' ? '' : value;
  },
  /*更新节点的className操作 */
  classUpdater: function (node, value, oldValue) {
    var className = node.className;
    className = className.replace(oldValue, '').replace(/\s$/, '');

    var space = className && String(value) ? ' ' : '';

    node.className = className + space + value;
  },
  /*更新节点的value操作 */
  modelUpdater: function (node, value, oldValue) {
    node.value = typeof value == 'undefined' ? '' : value;
  }
};
