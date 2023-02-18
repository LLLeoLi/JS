let eventMixin = {
    /**
     * 订阅事件
    */
   on(eventName,handler){
        if(!this._eventHandlers) this._eventHandlers = {};
        if(!this._eventHandlers[eventName]) this._eventHandlers[eventName] =[];
        this._eventHandlers[eventName].push(handler);
    },
    /** 
     * 取消订阅
    */
    off(eventName,handler){
        let handlers = this._eventHandlers?.[eventName];
        if(!handlers) return;
        for(let i = 0; i < handlers.length; i++){
            if(handlers[i] === handler){
                handlers.splice(i--,1);
            }
        }
    },
    /**
     * 生成具有给定名称和数据的事件
    */
    trigger(eventName,...args){
        if(!this._eventHandlers?.[eventName]) return;
        this._eventHandlers[eventName].forEach(handler=>{
            handler.apply(this,args);
        })
    }
}
// 创建一个 class
class Menu {
    choose(value) {
        this.trigger("select", value);
    }
}
// 添加带有事件相关方法的 mixin
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

// 添加一个事件处理程序（handler），在被选择时被调用：
const select = value => console.log(`Value selected: ${value}`);
menu.on("select", select);
menu.choose("123");

menu.off("select", select);
menu.choose("1234");