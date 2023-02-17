/* LLLeo's comment: ...语法不能进行异步工作 */
let range = {
    from: 1,
    to: 5,
    async *[Symbol.asyncIterator]() {
        for(let value = this.from; value <= this.to; value++){
            await new Promise(resolve=>setTimeout(resolve,1000))
            yield value
        }
    }
};
/* LLLeo's comment: 上面这个分号不能去掉 */
(async ()=>{
    for await (let value of range){
        console.log(value);
    }
})();