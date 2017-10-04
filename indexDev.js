
function Modal(options){

  if (!options) return;

  this.__parseOptions(options);

  if (!window.ModalCount__QasRfmwORkdasRs)
   window.ModalCount__QasRfmwORkdasRs = 0;

  if (!window.AfmJdnJREQjos__modalStyles)
    this.__styles();
  if (this.hash) this.__hashListener();
}

Modal.prototype.open = function(options){

  if (this.closing || this.opening) return Promise.reject();
  if (this.__opened) return Promise.reject();
  this.opening = true;
  this.__dinamic && this.element(this.__query);
  if (!this.__el) {
    this.opening = null;
  	throw (new Error("Не задан элемент ~ element:'.asd' || element:document.querySelector('.asd') ~ "));
   }
  document.body.style.width = document.documentElement.clientWidth + 'px';
  document.body.style.overflow = 'hidden';
  if (this.__modalStyle) {
    for (var variable in this.__modalStyle) {
      this.__el.style[variable] = this.__modalStyle[variable];
    }
  }
  this.__openCallback && this.__openCallback();
  options && this.__parseOptions(options);
  this.__setBg();
  var _this = this;
  return this.__showElement()

  .then(function(){

    _this.__buttonsListener = function(e){
      if (e.target.closest('.modal__close')) {
        this.close();
        this.__el.removeEventListener('click',this.__buttonsListener);
      }
    }.bind(_this);

    _this.__el.addEventListener('click',_this.__buttonsListener);

    if (_this.hash) location.hash = _this.hash;
    _this.__opened = true;
    _this.opening = null;
    _this.__afterOpenCallback && _this.__afterOpenCallback();
  });
}

Modal.prototype.close = function(options){
  if (this.closing || this.opening) return Promise.reject();
  if (!this.__opened) return Promise.reject();
	this.closing = true;
  options && this.__parseOptions(options);
  this.__closeCallback && this.__closeCallback();
  this.__bg.classList.remove('modal--open');
  this.__bg.addEventListener('transitionend',()=>{
    _this.__bg.remove();
  });
  var _this = this;
  return this.__hideElement()

  .then(function(){
    document.body.style.width = '';
    document.body.style.overflow = '';
    _this.__el.removeEventListener('click',_this.__buttonsListener);
    if (_this.hash && _this.hash == location.hash){
      history.replaceState({},document.title ,location.pathname.replace(/#/,''));
      window.dispatchEvent(new Event('hashchange'));
    }
    _this.__opened = false;
    _this.closing = null;
    _this.__afterCloseCallback && _this.__afterCloseCallback();
  });
}

Modal.prototype.toggle = function(options){
  options && this.__parseOptions(options);
  return (this.__opened ? this.close(): this.open() );
}
Modal.open = function(element, options){
  if (!window.ModalCount__QasRfmwORkdasRs)
   window.ModalCount__QasRfmwORkdasRs = 0;

  //bg
  let bg = document.createElement('div');
  bg.classList.add('modal--bg');
  bg.dataset.modalId = element.id;
  bg.style.zIndex = '900' + window.ModalCount__QasRfmwORkdasRs++;

  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      bg.classList.add('modal--open');
    });
  });
  bg.addEventListener('click',function(e){

    bg.classList.remove('modal--open');
    bg.addEventListener('transitionend',()=>{
      bg.remove();
    });

  },false);
  document.body.insertAdjacentElement('beforeend',bg);

  // el
  element.style.zIndex = '999' + window.ModalCount__QasRfmwORkdasRs++;
  element.style.display = 'flex';

  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      element.style.transform = 'translate(0,-50%) scale(1)';
      element.style.opacity =  '1';
    });
  });
  new Promise(function(resolve,reject){

    var a = function(e){
        element.style.transition = '';
        element.removeEventListener('transitionend',a);
        resolve();
    };
    element.addEventListener('transitionend',a,false);
  })
  .then(function(){

  });

  [].forEach.call( element.querySelectorAll('.modal__close'), function(button){
    button.addEventListener('click',function(){
      bg.classList.remove('modal--open');
      bg.addEventListener('transitionend',()=>{
        bg.remove();
      });
    });
  });
}
Modal.close = function(element, options){

  let bg = document.querySelector('[data-modal-id="' + element.id + '"]');
  bg.classList.remove('modal--open');



}
// Modal.toggle = function(element, options){

// }





Modal.prototype.element = function(element) {
  if (!element) return this.__el;

  if (typeof element == 'string') {
    this.__el = document.querySelector(element)
  } else if ('' + element == '[object HTMLCollection]') {
    this.__el = element[0];
  } else if (element instanceof Object) {
    this.__el = element;
  }
  this.__query = element;
  if (!element) throw (new Error("Не задан элемент ~ element:'.asd' || element:document.querySelector('.asd') ~ " , this.__el));

}
Modal.prototype.__setBg = function() {
  this.__bg = document.createElement('div');
  this.__bg.classList.add('modal--bg');
  this.__bg.style.zIndex = '900' + window.ModalCount__QasRfmwORkdasRs++;

  if (this.__bgStyle) {
    for (var variable in this.__bgStyle) {
      this.__el.style[variable] = this.__bgStyle[variable];
    }
  }

  var _this = this;

  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      _this.__bg.classList.add('modal--open');
    });
  });

  this.__bg.addEventListener('click',function(e){
    _this.close.call(_this)
    .then(function(){
      _this.__BGcloseCallback && _this.__BGcloseCallback();
    });
  },false);

  this.__el.insertAdjacentElement('beforebegin',this.__bg);
}
Modal.prototype.__showElement = function(){
  var _this = this;

  this.__el.style.zIndex = '999' + window.ModalCount__QasRfmwORkdasRs++;
  this.__el.style.display = 'flex';

  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      _this.__el.style.transform = 'translate(0,-50%) scale(1)';
      _this.__el.style.opacity =  '1';
    });
  });
  return new Promise(function(resolve,reject){

    var a = function(e){
        _this.__el.style.transition = '';
        _this.__el.removeEventListener('transitionend',a);
        resolve();
    };
    _this.__el.addEventListener('transitionend',a,false);
  });
};
Modal.prototype.__hideElement = function(){
  var _this = this;


    this.__el.style.transform = '';
    this.__el.style.opacity = '0';




  return new Promise(function(resolve,reject){
		function hide(e){

      resolve();
      _this.__el.removeEventListener('transitionend', hide);
      _this.__el.style.display = '';
      _this.__el.style.transform = '';
      _this.__el.style.opacity =  '';

    }
    _this.__el.addEventListener('transitionend',hide,false);

  });
};

Modal.prototype.__parseOptions = function(options){

  if (options.tagName || typeof options == 'string') {
    this.element(options);
    return;
  };
  options.element && this.element(options.element);

  if ( options.open !== undefined )
    this.__openCallback = options.open;

  if ( options.close !== undefined )
    this.__closeCallback = options.close;

  if ( options.BGclose !== undefined )
    this.__BGcloseCallback = options.BGclose;

  if ( options.afterOpen !== undefined )
    this.__afterOpenCallback = options.afterOpen;

  if ( options.afterClose !== undefined )
    this.__afterCloseCallback = options.afterClose;

  if ( options.hash !== undefined ) {

    this.hash = options.hash;
    if (!this.__hashListenerBinded) {
      this.__hashListenerBinded = this.__hashListener.bind(this);
      window.addEventListener("hashchange", this.__hashListenerBinded)
    }
  }

  if (options.modalStyle)
    this.__modalStyle = options.modalStyle;

  if (options.bgStyle)
    this.__bgStyle = options.bgStyle;

  if ( options.dinamic !== undefined )
    this.__dinamic = options.dinamic;

}

Modal.prototype.__hashListener = function(options){

  if (this.hash == location.hash && !this.__opened) {
    this.open();
  } else if (this.hash != location.hash && this.__opened) {
    this.close();
  }
}



Modal.prototype.__styles = function(){
  window.AfmJdnJREQjos__modalStyles = true;
  var styles = document.createElement('style');
  styles.innerHTML = `
  .modal--bg {
    position: fixed;
    will-change: opacity;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(255,255,255,.6);
    opacity: 0;
    transition: all .2s ease .1s;
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
  }
  .modal--bg.modal--open {
    opacity: 1;
    top:0;
    transition: all .3s ease .1s;
  }
  .modal {
    color:#333;
    position: fixed;
    top: 47%;
    left: 0%;
    right: 0%;
    will-change: transform, opacity;
    display: none;
    opacity: 0;
    width: 55%;
    min-height: 177px;
    max-width: 1000px;
    max-height: 90%;
    height:auto;
    padding: 0;
    transform: translate(0 , -45%) scale(.9, 1);
    margin: 0 auto;
    transition: all .3s ease;
    border-radius: 6px;
    box-sizing: border-box ;
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.15);
    box-shadow: 0 16px 28px 0 rgba(0, 0, 0, 0.22), 0 25px 55px 0 rgba(0, 0, 0, 0.21);
    overflow: hidden;
    flex-direction:column;
  }
  .modal__content {
    min-height: 120px;
    max-height:400px;
    max-height: 90vh;
    margin: 0;
    overflow-y: auto;
    padding: 30px;
    box-sizing: border-box;
    order:1;
  }
  .modal__footer {
    order:2;
    display: flex;
    margin: 0 10px;
    padding:0 6px;
    height: 56px;
    min-height: 56px;
    margin-top:-56px;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #e0e0e0;
  }
  .modal__footer .btn {
    font-size: .85rem;
  }
  .modal__footer ~ .modal__content {
    max-height: calc(90vh - 56px);
    margin-bottom: 56px;
  }

  @media (max-width:1000px) {
    .modal {
      width: 65%;
      max-width: 1000px;
    }
  }
  @media (max-width:800px) {
    .modal {
      width: 65%;
      max-width: 1000px;
    }
  }
  @media (max-width:600px) {
    .modal {
      width: 75%;
      max-width: 1000px;
    }
  }
  @media (max-width:480px) {
    .modal {
      width: 85%;
      max-width: 1000px;
    }
  }
  @media (max-width:320px) {
    .modal {
      width: 95%;
    }
  }
  `;
  document.body.append(styles);
};

+function(){
  addEventListener('DOMContentLoaded',function(){

    var elements = document.querySelectorAll('.modal__trigger');

    for (var i = 0; i < elements.length; i++) {
      var href = elements[i].getAttribute('href');
      new Modal({
        element: href,
        hash: href
      });
    }
  });
}();
