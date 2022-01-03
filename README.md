# cathaybk-interview
國泰世華 - 面試切版題目

> 題目說明 

1.圖檔內有設計圖共兩頁，請依照設計圖盡可能地做出符合的RWD切版
2.請勿使用框架例如vue/angular/react

切版說明
1.選擇縣市後彈出分行所在位置表格
2.選擇分行後才列出日期與時間

----

Quiz :

1. Simply to writing down differences between **one-way data flow** and **two-way data binding**?



2. What is different between **computed**, **watch** and **method()**?



3. List some of **ES6 features** and explaining a bit about it.



4. Briefing a bit about **Vuex** and how does it work, also **when most of time were you using it**?



5. Explain how you can use JavaScript functions such as **forEach**, **Map**, or **Reduce**.



6. Can you explain about **Pure function**, what is the properties? And can you **make an example**.



7. What is different between **framework base website** and **normal website (none framework)**



8. 下方的顯示順序為 ?

```javascript
setTimeout(b, 100)
setTimeout(d(), 1000)

a(c)

var delay = 0
for(let i=100000; i--;) delay++

e()

function a(cb){
    console.log('a')
    setTimeout(cb, 0)
}

function b(){ console.log('b') }
function c(){ console.log('c') }
function d(){ console.log('d') }
function e(){ console.log('e') }
```

9. Implementing let summary = sum(1)(2)(3), console.log(summary).

// Expected summary is 6

```javascript
const sum = a => (b => (c => a + b + c))

const summary = sum(1)(2)(3)

console.log(summary)
```

10. What is the result of the console logout?

setName = 'global';
function test() {
    console.log(setName); 
    var setName = 'local';
    console.log(setName);
}
