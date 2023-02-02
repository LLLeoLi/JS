/* LLLeo's comment: F.prototype指的是F的一个名为prototype的常规属性，如果其是一个对象，那么new操作符会使用它为新对象设置[[Prototype]] */
/* LLLeo's comment: 函数的默认prototype是一个只有属性constructor的对象，属性指向函数自身 */
/* LLLeo's comment: 最好不要重新prototype，而是在其基础上进行添加和修改 */
function Func() { }
console.log(Func.prototype.constructor == Func);
let arr = [1, 2, 3];
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__ === Object.prototype);
let obj = {
    0: "Hello",
    1: "world!",
    length: 2
}
/* LLLeo's comment: 方法借用，内建的join内部算法只关心正确的索引和length属性 */
obj.join = Array.prototype.join;
console.log(obj.join)

function f(a, b) {
    console.log(a + b);
}
Function.prototype.defer = function(ms){
    // 使用箭头函数避免this的获取问题
    return (...args)=>{
        setTimeout(()=>{this.apply(this,args)},ms);
    }
}
f.defer(3000)(1, 2);