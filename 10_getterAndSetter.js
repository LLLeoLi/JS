let user = {
    name:"John",
    surname:"Smith"
}
// 一个属性要么是访问器，要么是数据属性，但不能两者都是。
Object.defineProperty(user,'fullName',{
    get(){
        return `${this.name} ${this.surname}`;
    },
    set(value){
        [this.name,this.surname] = value.split(' ');
    }
})