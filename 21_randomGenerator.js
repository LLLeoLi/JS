/* LLLeo's comment: *代表generator function */
function* randomGenerator(seed){
    let value = seed;
    while(true){
        value = value * 16807 % 2147483647
        yield value
    }
}
let generator = randomGenerator(1);

console.log(generator.next().value); // 16807
console.log(generator.next().value); // 282475249
console.log(generator.next().value); // 1622650073

let range = {
    from: 1,
    to: 5,
    *[Symbol.iterator]() { // [Symbol.iterator]: function*() 的简写形式
        for(let value = this.from; value <= this.to; value++) {
            yield value;
        }
    }
};
  
console.log( [...range] ); // 1,2,3,4,5