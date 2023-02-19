/* LLLeo's comment: 通过循环递归实现深拷贝 */
function deepClone(obj,hash = new WeakMap()) {
    if(obj === null) return obj;
    if(obj instanceof Date) return new Date(obj);
    if(obj instanceof RegExp) return new RegExp(obj);
    // 不是对象，不需要深拷贝
    if(typeof obj !== 'object') return obj;
    if(hash.has(obj)) return hash.get(obj);
    let clobeObj = new obj.constructor();
    // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
    hash.set(obj, clobeObj);
    for(let key in clobeObj){
        if(obj.hasOwnProperty(key)){
            clobeObj[key] = deepClone(obj[key],hash);
        }
    }
    return clobeObj;
}