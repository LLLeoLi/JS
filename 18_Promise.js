/* LLLeo's comment: 手写Promise(只区分了异步，没有区分宏任务微任务),then的链式调用未完全实现  */
// 可以用class或构造函数实现，这里使用class
class Commitment {
    static PENDING = "pending";
    static FULFILLED = "fulfilled";
    static REJECTED = "rejected";
    constructor(func) {
        this.status = Commitment.PENDING;
        this.result = null;
        // 实现异步调用
        this.resolveCallbacks = [];
        this.rejectCallbacks = [];
        // 和React异曲同工了属于是
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
        // Error要进行try catch
        try {
            /* LLLeo's comment: 调用传入的函数，实参是类中的resolve和reject，需要进行bind */
            func(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
    }
    resolve(result) {
        /** 
         * onFulfilled or onRejected must not be called until the execution context stack contains only platform code.
         * In practice, this requirement ensures that onFulfilled and onRejected execute asynchronously, after the event loop turn in which then is called, and with a fresh stack.
         */
        setTimeout(() => {
            if (this.status === Commitment.PENDING) {
                this.status = Commitment.FULFILLED;
                this.result = result;
                this.resolveCallbacks.forEach(callback => {
                    callback(result);
                })
            }
        })
    }
    reject(result) {
        setTimeout(() => {
            if (this.status === Commitment.PENDING) {
                this.status = Commitment.REJECTED;
                this.result = result;
                this.rejectCallbacks.forEach(callback => {
                    callback(result);
                })
            }
        })
    }
    then(onFULFILLED, onREJECTED) {
        // 原生then方法支持传入非函数内容并忽略
        onFULFILLED = typeof onFULFILLED === 'function' ? onFULFILLED : () => { };
        onREJECTED = typeof onREJECTED === 'function' ? onREJECTED : () => { };        
        // 实现链式调用
        const commit2 = new Commitment((resolve, reject) => {
            /* LLLeo's comment: promise.then()属于微任务 setTimeout()属于宏任务 微任务永远在宏任务之前执行*/
            if (this.status === Commitment.PENDING) {
                /* LLLeo's comment: 
                要确保 onFulfilled 和 onRejected 方法异步执行，且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。
                因此，在保存成功和失败回调时也要添加 setTimeout
                 */
                this.resolveCallbacks.push(()=>{
                    setTimeout(()=>{
                        onFULFILLED(this.result);
                    })
                });
                this.rejectCallbacks.push(()=>{
                    setTimeout(()=>{
                        onREJECTED(this.result);
                    })
                });
            }
            if (this.status === Commitment.FULFILLED) {
                setTimeout(()=>{
                    let res = onFULFILLED(this.result);
                })
            }
            if (this.status === Commitment.REJECTED) {
                setTimeout(()=>{
                    onREJECTED(this.result);
                })
            }
        })
        return commit2;
    }
}
console.log("1");
let commitment = new Commitment((resolve, reject) => {
    console.log("2");
    setTimeout(() => {
        /* LLLeo's comment: 直接调用，注意this指向 */
        /* LLLeo's comment: resolve('final')在宏任务setTimeout中*/
        Math.random() > 0.5 ? resolve("final") : reject("error");
        console.log("4");
    })
})
commitment.then(
    result => { console.log(result) },
    /* LLLeo's comment: 出现final方便对比 */
    result => { console.log(result) }
)
console.log("3");