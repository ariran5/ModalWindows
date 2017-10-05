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
  hash:'#popup1',
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
Если указан хэш, то при открытии ссылки с хэшем откроется и соответствующий попап.

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
Если мы откроем попап и сразу же закроем с помощью кода или кликом
```
const myWindow = new Modal('#qqq');

myWindow.open();
myWindow.close();

```
То все сработает, однако есть тонкость.
Если мы вдруг нечаянно сделаем так:
```
const myWindow = new Modal('#qqq');

myWindow.open();
myWindow.close().then(()=>{
  console.log(1);
});
...
myWindow.close().then(()=>{
  console.log(2);
});
...
```
То второй then с `console.log(2)`не сработает.
Я планирую это исправить, пока так.

5) Разметка и классы.
---
Что-бы применить стили для попапа нужно использовать такую разметку
```
<a href="#qwe" class="modal__trigger">Открыть попап</a>

<ul id="qwe" class="modal" >
  <li class="modal__footer">
  </li>
  <li class="modal__content">
    <button class="modal__close">Закрыть</button>
  </li>
</ul>
```
Не обязаьельно использовать список с элементами списка, это могут быть простые дивы.
В разметке нет ошибки, если нужен футер с кнопками, то он должен стоять `над контентом`

6) Что-бы использовать свои стили нужно в опции добавить свойство modalStyle или bgStyle
```
options = {
  ...
  modalStyle: {
    'max-height' : '90px',
    'width': '1200px',
    'top': '100px'
  },
  bgStyle: {
    'height' : '20px',
    'background' : 'red'
  },
  ...
}
```
Важно помнить что свойство и значение должны быть строками 'max-width': '120px'

7) Если нужно что-бы открывались разные попапы, то можно использовать опцию
```
options = {
  ...
  dinamic:true,
  ...
}
```
тогда если мы передаем как элеменет CSS селектор `#asd .modal.active`, то перед каждым открытием скрипт будет искать новый попап с нужным CSS селектором.
Если мы не хотим передавать CSS селектор то можно передать HTML коллекцию `HTMLCollection`, ни в коем случае не лист узлов `NodeList`, например:
```
// ПРАВИЛЬНО
options = {
  ...
  element:'#asd .modal.active'
  dinamic:true,
  ...
}

options = {
  ...
  element: document.querySelector('#asd').getElementsByClassName('active');
  dinamic:true,
  ...
}

//НЕ ПРАВИЛЬНО
options = {
  ...
  element:document.querySelector('#asd .modal.active') || document.querySelectorAll('#asd .modal.active'),
  dinamic:true,
  ...
}
options = {
  ...
  // Не подходит, так как мы передаем элемент а не коллекцию
  element: document.querySelector('#asd').getElementsByClassName('active')[0];
  dinamic:true,
  ...
}
```
Если мы используем
```<a href="#qwe" class="modal__trigger"></a>```
для открытия модальных окон по хэшу, то что-бы был динамический попап надо добавить класс
```<a href="#qwe" class="modal__trigger modal__dinamic"></a>```
