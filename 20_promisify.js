// 将func函数转换为promise形式
// 对func函数的第二个参数，我们要求是一个有两个参数的回调函数，第一个参数为error，第二个参数为result
function promisify(func){
    return function(...args){
        return new Promise((resolve,reject)=>{
            function callback(err,res){
                if(err){
                    reject(err);
                }
                resolve(res);
            }
            args.push(callback);
            func.apply(this,args);
        })
    }
}
// 对于一些更奇特的回调模式，例如根本没有err，直接callback(result)，我们可以手动promise化这样的函数，而不使用helper
function loadJavascript(src, callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Script load error for ${src}`));
    document.head.append(script);
  }
let loadJavascriptPromise = promisify(loadJavascript);
loadJavascriptPromise("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js").then((res)=>{console.dir(res)});