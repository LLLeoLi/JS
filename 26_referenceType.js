let user = {
    name: "John",
    hi() { console.log(this.name); },
    bye() { console.log("Bye"); }
};
/* LLLeo's comment: 注意上面的分号不能省略 */
/* LLLeo's comment: 不能正常运行，this变为了undefined */
(user.name == "John" ? user.hi : user.bye)();
/* LLLeo's comment: 
    对于属性user.hi的访问结果不是一个函数，而是一个内部的Reference Type属性值，在严格模式下是
    (user,"hi",true)
*/
(user.hi)()
let method;
(method = user.hi)();
(user.hi || user.bye)();