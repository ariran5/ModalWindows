window.Modal Модальные окна для динамического контента.
=========================


Инициализация
-----------
```
  const myWindow = new Modal([options]);
```
Какие могут быть опции?
-------------

1) При инициализации в опции мы можем ничего не передавать. Особенность этих модальных окнон в том, что мы можем передать опции в любой момент.
Важно, что в момент использования .open должен быть задан элемент, если его нет - выбросит ошибку.
```
  const myWindow = new Modal([options]);

  myWindow.open([options]);
  ...
  myWindow.close([options]);
```
2) Что можно передать как опции.
Как опции мы можем передать объект со всеми возможными свойствами.
```
let options = {
  element: document.querySelector('#qqq'),
  open: function(){
    //До анимации открытия
  },
  close: function(){
    //До анимации закрытия
  },
  BGclose: function(){
    //При закрытии кликом на фон вокруг попапа
  },
  afterOpen: function(){
    // после анимации открытия
  },
  afterClose: function(){
    // после анимации закрытия
  }
}

```
Но если нам эти свойства не нужны, то мы можем в опции просто передать DOM объект или его CSS селектор.
```
let options = "#myBlock";
или
let options = document.querySelector(#myBlock");
```

Можно обойтись вообще без опций и просто задать элемент отдельно.
```
const myWindow = new Modal();

let elementID = #myBlock;
let element = document.querySelector(#myBlock");

myWindow.element(elementID || element) // И тут можно передать CSS селектор или элемент.

myWindow.open();
...
myWindow.close();
```

3) Если мы решили делать без опций, но нам нужны коллбеки после анимации открытия или после анимации закрытия то мы можем сделать так
```
myWindow.open()
  .then( ()=>{

  });
...
myWindow.close()
  .then( ()=>{

  });
```
Этот вариант использования коллбеков после анимации отличается от использования опций тем, что тут мы можем назначить обработчик именно на конеретный случай

```
if (a !== 0) {
  myWindow.open()
    .then( ()=>{
      alert(1);
      });
} else {
  myWindow.open();
}
```
и такие коллбеки не будут работать на закрытие по клику на пустую область.



4) Если надо в какой-то момент очистить или заменить опции
```
let options = {
  element: document.querySelector('#qqq'),
  open: function(){...},
  close: function(){...},
  BGclose: function(){...},
  afterOpen: function(){...},
  afterClose: function(){...}
}
const modal = new Modal(options);

let newOptions = {
  open: null,
  close: function(){...}
}

modal.open(newOptions);
```
Важно то, что новые опции не перетрут старые, а дополнят или заменят.
Что-бы очистить нужно использовать свойство null.

`Перед открытием попапа применятся новые опции.`
***
Важно
===============
Если мы сразу же после открытия применим закрытие то оно не сработает.
Менять состояние можно только после окончания анимации.
```
// Просто откроется и не закроется

const myWindow = new Modal('#qqq');

myWindow.open();
myWindow.close();


// Сработает открытие и после него - закрытие

const myWindow = new Modal('#qqq');

myWindow.open().then(()=>{

  myWindow.close();

});
```
5) Разметка и классы.
---
Что-бы применить стили для попапа нужно использовать такую разметку
```
<ul class="modal" >
  <li class="modal__footer">
  </li>
  <li class="modal__content-container">
  </li>
</ul>
```
Не обязаьельно использовать список с элементами списка, это могут быть простые дивы.
В разметке нет ошибки, если нужен футер с кнопками, то он должен стоять `над контентом`
