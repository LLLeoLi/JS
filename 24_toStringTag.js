let user = {
    [Symbol.toStringTag]:"User",
}
console.log({}.toString.call(user))
console.log(user.toString())
console.log(Object.prototype.toString.call(user))
let nullObject = {
    [Symbol.toStringTag]:null
}
console.log({}.toString.call(nullObject))