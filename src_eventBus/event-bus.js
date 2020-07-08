/**
 *  全局事件总线的js
 */
const eventBus = {}

// 保存绑定的自定义事件监听  { 事件名：[ 监听函数1， 监听函数2] }
let listenerContainer = {}

// 绑定自定义事件监听方法
eventBus.$on = function(eventName, eventListener){
  let eventListeners = listenerContainer[eventName]
  // 判断是否是undefined
  if(!eventListeners){
    // 如果不存在的 创建一个空数据并且保存
    listenerContainer[eventName] = eventListeners = []
  }
  // 保存对应事件
  eventListeners.push(eventListener)
}


// 分发自定义事件监听的方法
eventBus.$emit = function(eventName, data){
  const eventListeners = listenerContainer[eventName]
  // 判断是否有回调监听
  if(eventListeners && eventListeners.length) {
    // 有的话就调用 （注意可能是多个 因此需要遍历调用）
    eventListeners.forEach(eventListener => {
      eventListener(data)
    })
  }
}



//解绑自定义事件监听的方法
eventBus.$off = function(eventName){
  // eventBus.off() 解绑所有事件监听 eventBus.off(事件名) 解绑单个事件名
  if(eventName === undefined || eventName === []) {
    listenerContainer = []
  }else{
    // 解绑对应监听
    listnersContainer[eventName] = []
  }
}


export default eventBus
