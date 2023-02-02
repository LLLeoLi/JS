let plainObject = Object.create(null,{
    // 用描述器创建属性时，它的标识默认是false
    toString:{
        value: function(){
            return Object.keys(this).join();
        }
    }
});
plainObject.apple = "Apple";
plainObject.__proto__ = "test";
for(let key in plainObject) {
    console.log(key); // "apple"，然后是 "__proto__"
  }