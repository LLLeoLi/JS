let i = 0;

setTimeout(() => alert(i), 100); // ?

// 假设这段代码的运行时间 >100ms
for(let j = 0; j < 100000000; j++) {
  i++;
}

// setTimeout会在当前代码执行完毕后再执行，所以i取值为100000000