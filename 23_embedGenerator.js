function* gengerateSequence(start,end){
    for(let i = start; i <= end; i++){
        yield i;
    }
}
function* embedGenerator(){
    /* LLLeo's comment: yield* 指令将执行委托给另一个generator
     这个术语意味着 yield* gen 在 generator gen 上进行迭代，并将其产出（yield）的值透明地（transparently）转发到外部。
    */
    yield* gengerateSequence(48,57);
    yield* gengerateSequence(65,90);
    yield* gengerateSequence(97,122);
}
let str = new String();
for(let code of embedGenerator()){
    str += String.fromCharCode(code);
}
console.log(str);