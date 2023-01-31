/* LLLeo's comment: 装饰器返回的包装器将所有对函数的调用保存在calls属性中 */
function spy(func) {
    return function wrapper(...args) {
        // 不知道为啥info喜欢在函数外部定义函数对象初始值
        wrapper.calls || (wrapper.calls = []);
        wrapper.calls.push(args);
        return func.apply(this, args);
    }
}
let worker = {
    test() {
        console.log(...arguments);
    }
}
worker.test = spy(worker.test);
worker.test(1, 2, 3, 4);
worker.test(1, 2, 3, 4, 5);
console.log(worker.test.calls);