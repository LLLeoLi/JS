let user = {
    name: "John",
    surname: "Smith",
    // 在一个方法调用中，this 始终是点符号 . 前面的对象。
    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    },

    get fullName() {
        return `${this.name} ${this.surname}`;
    }
};

let admin = {
    __proto__: user,
    isAdmin: true
};
console.log(admin.fullName);
admin.fullName = "Alice Cooper";
console.log(admin.name);
/* LLLeo's comment: for...in循环会迭代继承的属性，但Object.keys和 Object.values等会忽略继承属性 */
console.log(Object.keys(admin));
for(let key in admin){
    if(admin.hasOwnProperty(key)) console.log(key);
}