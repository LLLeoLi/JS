/* LLLeo's comment: CPU密集函数的cache装饰器, 包装的函数只有1个参数*/
function cachingDecorator_1(func) {
    // 闭包
    let cache = new Map();
    return function f(x) {
        if (cache.has(x)) {
            return cache.get(x);
        }
        // let result = func(x);
        let result = func.call(this, x);
        cache.set(x, result);
        return result;
    }
}

let worker = {
    someMethod() {
        return 1;
    },
    slow(x) {
        alert("Called with " + x);
        return x * this.someMethod();
    },
    max: function(x,y){
        console.log("Called with "+(x>y?x:y));
    }
};
// worker.slow = cachingDecorator_1(worker.slow);
/* LLLeo's comment: 传递多个参数*/
function cachingDecorator(func) {
    let cache = new Map();
    const hash = (arr) => {
        // arguments是一个类数组，也是一个可迭代对象，但它不支持数组方法
        // 箭头函数的arguments属于外部
        // arguments.join(", "); 没有此方法
        return arr.join(",");
        /* 
            如果join函数没有参数，则使用","
        */
        // return [].join.call(arguments); 进行方法借用
    }
    return function (...args) {
        let key = hash(args);
        if (cache.has(key)) {
            console.log("key:",key);
            return cache.get(key);
        }
        // 两种写法都可以，用arguments也行
        // let result = func.call(this,...args);
        let result = func.apply(this, args);
        cache.set(key, result);
        return result;
    }
}
worker.slow = cachingDecorator(worker.slow);
worker.max = cachingDecorator(worker.max);
// worker.slow(5);
worker.max(7,8);
worker.max(7,8);
/* 
    函数表达式在代码执行到达时被创建，并且仅从那一刻起可用。
    在函数声明被定义之前，它就可以被调用。
    this只取决于调用时
*/