/* LLLeo's comment: 手写Promise(只区分了异步，没有区分宏任务微任务)  */
// 可以用class或构造函数实现，这里使用class
class Commitment {
    static PEDNING = "pedning";
    static FULFILLED = "fulfilled";
    static REJECTED = "rejected";
    constructor(func) {
        this.status = Commitment.PEDNING;
        this.result = null;
        // 实现异步调用
        this.resolveCallbacks = [];
        this.rejectCallbacks = [];
        // 和React异曲同工了属于是
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
        // Error要进行try catch
        try {
            func(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
    }
    resolve(result) {
        setTimeout(() => {
            if (this.status === Commitment.PEDNING) {
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
            if (this.status === Commitment.PEDNING) {
                this.status = Commitment.REJECTED;
                this.result = result;
                this.rejectCallbacks.forEach(callback => {
                    callback(result);
                })
            }
        })
    }
    then(onFULFILLED, onREJECTED) {
        // 实现链式调用
        return new Commitment((resolve, reject) => {
            // 原生then方法支持传入非函数内容并忽略
            onFULFILLED = typeof onFULFILLED === 'function' ? onFULFILLED : () => { };
            onREJECTED = typeof onREJECTED === 'function' ? onREJECTED : () => { };
            if (this.status === Commitment.PEDNING) {
                this.resolveCallbacks.push(onFULFILLED);
                this.rejectCallbacks.push(onREJECTED);
            }
            if (this.status === Commitment.FULFILLED) {
                onFULFILLED(this.result);
            }
            if (this.status === Commitment.REJECTED) {
                onREJECTED(this.result);
            }
        })
    }
}
console.log("1");
let commitment = new Commitment((resolve, reject) => {
    console.log("2");
    setTimeout(() => {
        Math.random() > 0.5 ? resolve("final") : reject("error");
        console.log("4");
    })
})
commitment.then(
    result => { console.log(result) },
    result => { console.log(result) }
)
console.log("3");