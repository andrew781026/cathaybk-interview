# cathaybk-interview

國泰世華 - 面試切版題目

> 題目說明

1.圖檔內有設計圖共兩頁，請依照設計圖盡可能地做出符合的RWD切版 2.請勿使用框架例如vue/angular/react

切版說明 1.選擇縣市後彈出分行所在位置表格 2.選擇分行後才列出日期與時間

----

Quiz :

1. Simply to writing down differences between **one-way data flow** and **two-way data binding**?

單向資料流： v-model 也可以想成 :value="value" + @input="$emit('input', $event.target.value)" 的整合處理  
明確聲明資料改動時更新 element 顯示值 & 輸入時 , 更新 component 中的值 雙向綁定：v-model 是 vue 中的雙向綁定 , 資料會影響 element 顯示的值 , 值修改時會影響資料

2. What is different between **computed**, **watch** and **method()**?

computed： watch： method：

3. List some of **ES6 features** and explaining a bit about it.

- arrow function - react / bind(this) issue
- spread - {...obj} [...arr] / [a,b]=arr / {x,y} = obj / ({a,b}) => a+b
- default value - ({a=8,b=9}) => a+b
- 可選串連 ?. - empty checker / a?.b?.c?.d

4. Briefing a bit about **Vuex** and how does it work, also **when most of time were you using it**?


5. Explain how you can use JavaScript functions such as **forEach**, **Map**, or **Reduce**.

```javascript
const b = [1, 2, 3, 4, 5, 6];
b.forEach(n => console(n)); // 顯示 : 123456
const t = b.map(n => n + 3);
t.forEach(n => console(n)); // 顯示 : 456789
const sum = b.reduce((pre, curr) => pre + curr, 0);
console(sum); // 顯示 : 21
```

6. Can you explain about **Pure function**, what is the properties? And can you **make an example**.

> 將相同的輸入丟入，永遠都會回傳相同的輸出，並且不對任何該函數以外的任何作用域產生影響。

```javascript
const add = (a, b) => a + b;
console.log(add(5, 7));  // 顯示 : 12

// compose 範例 : https://www.codementor.io/@michelre/use-function-composition-in-javascript-gkmxos5mj
const compose = (...functions) => args => functions.reduceRight((arg, fn) => fn(arg), args);
const toUpperCase = x => x.toUpperCase();
const exclaim = x => x + '!';

const shout = compose(exclaim, toUpperCase);

console.log(shout("send in the clowns")); // 顯示 : "SEND IN THE CLOWNS!"
```

> 上面的 `add` . `compose` 都是 **Pure function**

7. What is different between **framework base website** and **normal website (none framework)**

framework base website(vue.react.angular)：html 的 dom 元素大多是用 JS 根據資料產生出來 normal website(jquery)：有定義 html 的 tag , html 的
dom 元素在 JS 處理前就存在

8. 下方的顯示順序為 ?

```javascript
setTimeout(b, 100)
setTimeout(d(), 1000)

a(c)

var delay = 0
for (let i = 100000; i--;) delay++

e()

function a(cb) {
    console.log('a')
    setTimeout(cb, 0)
}

function b() {
    console.log('b')
}

function c() {
    console.log('c')
}

function d() {
    console.log('d')
}

function e() {
    console.log('e')
}
```

> 顯示 : setTimeout(d(), 1000) 這行會報錯 , 因為 setTimeout 第一個參數必須傳入函式

9. Implementing let summary = sum(1)(2)(3), console.log(summary).

// Expected summary is 6

```javascript
const sum = a => (b => (c => a + b + c))

const summary = sum(1)(2)(3)

console.log(summary)
```

10. What is the result of the console logout?

```javascript
setName = 'global';

function test() {
    console.log(setName);
    var setName = 'local';
    console.log(setName);
}

test()
```

> 顯示 : undefined
> local

`相關文章 : https://medium.com/@ethannam/javascripts-memory-model-7c972cd2c239`

因為 test 函式中抓到的 setName 是下面一行的變數 , 因此第一行顯示 undefined , 第三行顯示 local
