// 这样创建的对象没有对prototype的getter和setter，__proto__ 属性相当于正常属性，可以用除对象和null之外的类型赋值
let plainObject = Object.create(null, {
    // 用描述器创建属性时，它的标识默认是false
    toString: {
        value: function () {
            return Object.keys(this).join();
        }
    }
});
plainObject.apple = "Apple";
plainObject.__proto__ = "test";
for (let key in plainObject) {
    console.log(key); // "apple"，然后是 "__proto__"
}
// git add . 记录更改
// git commit  提交更改到本地
// git push 上传