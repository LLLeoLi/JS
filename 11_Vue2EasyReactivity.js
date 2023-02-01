/* LLLeo's comment: 一个Vue2响应式原理的极简demo */
let data = {
    msg: "message",
    age: "18"
}
// 模拟Vue实例对象
let vm = {};
function proxyData() {
    Object.keys(data).forEach((key) => {
        Object.defineProperty(vm, key, {
            enumerable: true,
            configurable: true,
            get() {
                return data[key];
            },
            set(newValue) {
                if (newValue === data[key]) return;
                data[key] = newValue;
                console.log(document.querySelector("#app"));
                document.querySelector("#app").textContent = newValue;
                console.log(newValue);
            }
        })
    })
}
proxyData(data);
document.querySelector("#app").textContent = vm.msg;
let btn = document.querySelector("button");
btn.addEventListener("click", () => {
    vm.msg+="你好啊，李银河"
});