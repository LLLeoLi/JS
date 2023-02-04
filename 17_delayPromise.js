function delay(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}
delay(3000).then(()=>console.log("after 3000ms"))
Promise.allSettled([new Promise((resolve)=>{
    /* LLLeo's comment: fetch也是浏览器独有的API */
    resolve(fetch("https://api.github.com/users/iliakan"));
})]).then((results)=>{console.dir(results)})
/* 上例是将下方的结果作为一个Response对象，{status:"fulfilled",value:Response}
new Promise((resolve)=>{
    resolve(fetch("https://api.github.com/users/iliakan"));
}).then((results)=>{console.dir(results)}) */