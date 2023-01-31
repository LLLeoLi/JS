/* LLLeo's comment: 防抖装饰器，结果是一个包装器，该包装器暂停对函数func的调用，经过m毫秒后使用最新的参数调用func一次 */
function debounce(func, m) {
    // 闭包
    let timeout = null;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), m);
    }
}
let f = debounce(console.log, 1000);

f("a");
setTimeout( () => f("b"), 200);
setTimeout( () => f("c"), 500);