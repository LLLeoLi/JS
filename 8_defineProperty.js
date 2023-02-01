"use strict";
/* 
    LLLeo's comment: 
    对象属性除了value外，还有三个标志：
    1. writable 可修改
    2. enumerable 可在循环中列出
    3. configurable 属性可删除，特性可更改
*/
let user = {
    name: "John",
    toString: function () {
        console.log("toString");
    }
};
let descriptor = Object.getOwnPropertyDescriptor(user, "name");
console.log(descriptor);
Object.defineProperty(user, "name", {
    configurable: false
});
// 不能通过defineProperty修改 user.name 或它的标志,但可以直接修改属性值
// Object.defineProperty(user, "name", { configurable: true });
user.name = "LLLeo";
Object.defineProperty(user, "name", { writable: false });
// for...in时跳过,Object.keys排除
Object.defineProperty(user, "toString", { enumerable: false });
// 只在严格模式下会出现error
// user.name = "John"