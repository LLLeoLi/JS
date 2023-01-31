/* LLLeo's comment: 节流装饰器返回的包装器每m毫秒最多调用func一次 */
function throttle(func, m) {
    let isReady = true;
    let savedThis, savedArgs;
    return function wrapper(...args) {
        // 限流时保存参数
        if (!isReady) {
            savedArgs = args;
            savedThis = this;
            return;
        }
        isReady = false;
        func.apply(this, args);
        // 时间到期后结束限流，根据最新的调用上下文和参数执行
        setTimeout(() => {
            // 更改限流标志
            isReady = true;
            // 判断是否有缓存
            if (savedArgs) {
                // 有缓存则重新运行wrapper调用func
                wrapper.apply(savedThis, savedArgs);
                // 清空缓存
                savedArgs = savedThis = null;
            }
        }, m)
    }
}
function f(a) {
    console.log(a);
}

// f1000 最多每 1000ms 将调用传递给 f 一次
let f1000 = throttle(f, 1000);

f1000(1); // 显示 1
f1000(2); // (节流，尚未到 1000ms)
f1000(3); // (节流，尚未到 1000ms)
f1000(4); // (节流，尚未到 1000ms)
// 最终显示4