/* LLLeo's comment: 对于Promise.allSettled API 的polyfill */
if (!Promise.allSettled) {
    const resolveHandler = (result) => ({ status: "fulfilled", result });
    const rejectHandler = (error) => ({ status: "rejected", error });
    Promise.allSettled = (promises) => {
        return Promise.all(promises.map(
            /* LLLeo's comment: 这里也可以写成Promise.resolve  目的就是返回一个Promise能够使用then*/
            (promise) => new Promise((resolve=>resolve(promise))).then(resolveHandler, rejectHandler)
        ))
    }
}
// Promise.any 等待第一个fulfilled的promise
// Promise.race 等待第一个settled的promise