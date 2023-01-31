/* LLLeo's comment: 装饰器返回的包装器将函数func的每次调用延时m毫秒 */
function delay(func, m) {
    return function (...args) {
        // return setTimeout(func.apply(this,args), m); ❌
        /* 
            LLLeo's comment: 
            setTimeout 中的伪代码可以理解为：
            function setTimeout(fn,delay) {
                // 等待delay 毫秒
                fn(); // <-- 调用位置！
            }
            this是默认绑定，指向globalThis
        */
        // 使用箭头函数获取this   
        return setTimeout(() => { func.apply(this, args) }, m);
    }
}
let worker = {
    f(x) {
        console.log(x);
    }
}
worker.f = delay(worker.f, 1000);
worker.f("延时了1s");