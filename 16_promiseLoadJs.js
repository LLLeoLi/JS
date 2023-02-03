/* LLLeo's comment: 此例包含DOM相关方法，无法在node环境中运行 */
function loadJavascript(src){
    let script = document.createElement("script") || {};
    return new Promise((resolve, reject) =>{
        script.src = src;
        script.onload = ()=> resolve(script);
        script.onerror = ()=> reject(new Error(`Script load error for ${src}`));
        document.head.append(script);
    })
}
let promise = loadJavascript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");
/* LLLeo's comment: 回调地狱:第2个参数是一个回调函数 */
// loadJavascript("https://cdnjs.cloudflare.com/ajax/lib", function func1(){
//     if(1){

//     }
//     loadJavascript("https://cdnjs.cloudfl",function(){
//         if(2){

//         }
//         else{

//         }
//         loadJavascript("https://cdnjs.cloudflare.com/ajax/lib",function func3(){
            
//         })
//     })
//     if(2){

//     }
// })
promise.then(
    script => console.log(`${script.src} is loaded`),
    error => console.log(error),
)
promise.then(script => alert('Another handler...'));
