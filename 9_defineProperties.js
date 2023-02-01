let obj = {
    name:"LLLeo",
    surname:"Li",
    toString(){
        console.log("ToString");
    }
}
Object.defineProperties(obj, {
    name:{value:"LLLeo",writable:false},
    toString:{enumerable:false}
})
console.log(Object.keys(obj));
// 带属性标志的克隆
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));