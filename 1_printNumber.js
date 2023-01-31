/* LLLeo's comment: setInterval实现 */
function printNumber(from, to) {
    let current = from;
    let id = setInterval(() => {
        if (current <= to) {
            console.log(current++);
        }
        else {
            clearInterval(id);
        }
    }, 1000);
}
/* LLLeo's comment: setTimeout嵌套 */
function printNumber_1(from, to) {
    let current = from;
    setTimeout(function go() {
        if (current <= to) {
            console.log(current++);
            setTimeout(go, 1000);
        }
    }, 1000);
}
// 方案2可以动态修改下一次的延迟，两次调用的间隔也更加精准(以结束时间计)
printNumber(5,10);