

function Modal(options){

  if (!options) return;

  this.__parseOptions(options);

  if (!window.ModalCount__QasRfmwORkdasRs)
   window.ModalCount__QasRfmwORkdasRs = 0;

  if (!window.AfmJdnJREQjos__modalResized)
    // this.__resize();

  if (!window.AfmJdnJREQjos__modalStyles)
    this.__styles();
}

Modal.prototype.open = function(options){

  if (this.closing || this.opening) return Promise.reject();
  if (this.__opened) return Promise.reject();
  this.opening = true;
  if (!this.__el) {
    this.opening = null;
  	throw (new Error("Не задан элемент ~ element:'.asd' || element:document.querySelector('.asd') ~ "));
   }
  this.__openCallback && this.__openCallback();
  options && this.__parseOptions(options);
  this.__setBg();
  var _this = this;
  return this.__showElement()

  .then(function(){
    // _this.__el.style.height = parseInt(getComputedStyle( _this.__el ).height) + 'px';
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
    _this.__opened = false;
    _this.closing = null;
    _this.__afterCloseCallback && _this.__afterCloseCallback();
  });
}

Modal.prototype.toggle = function(options){
  options && this.__parseOptions(options);
  return (this.__opened ? this.close(): this.open() );
}
// Modal.open = function(element, options){

// }
// Modal.close = function(element, options){

// }
// Modal.toggle = function(element, options){

// }





Modal.prototype.element = function(element) {
  if (!element) return this.__el;

  if (typeof element == 'string') {
    this.__el = document.querySelector(element)
  } else if (element instanceof Object) {
    this.__el = element;
  }

}
Modal.prototype.__setBg = function() {
  this.__bg = document.createElement('div');
  this.__bg.classList.add('modal--bg');
  this.__bg.style.zIndex = '99999' + window.ModalCount__QasRfmwORkdasRs++;

  var _this = this;
  setTimeout(function(){
    _this.__bg.classList.add('modal--open');
  },25);

  this.__bg.addEventListener('click',function(e){
    console.log(1);
    _this.close.call(_this)
    .then(function(){
      _this.__BGcloseCallback && _this.__BGcloseCallback();
    });
  },false);

  document.body.insertAdjacentElement('beforeend',this.__bg);
}
Modal.prototype.__showElement = function(){
  var _this = this;

  this.__el.style.zIndex = '999999' + window.ModalCount__QasRfmwORkdasRs++;
  this.__el.style.display = 'flex';


  setTimeout(function(){
    _this.__el.style.transform = 'translate(0,0) scale(1)';
    _this.__el.style.opacity =  '1';
  },25);
  return new Promise(function(resolve,reject){

    let a = function(e){
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

}


Modal.prototype.__resize = function(){
  window.AfmJdnJREQjos__modalResized = true;
  let elements = document.getElementsByClassName('modal');

  window.addEventListener('resize',  ()=>{
    for (var i = 0; i < elements.length; i++) {
      let content = elements[i].querySelector('.modal__content-container');
      elements[i].style.height = content && content.scrollHeight + 57 + 'px';
    }
  });
};



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
    background-color: rgba(255,255,255,.3);
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
    top: 5%;
    left: 0%;
    right: 0%;
    will-change: transform, opacity;
    display: none;
    opacity: 0;
    width: 55%;
    min-height: 277px;
    max-width: 1000px;
    max-height: 90%;
    padding: 0;
    transform: translate(0 , 20px) scale(.9, 1);
    margin: 0 auto;
    transition: all .3s ease;
    border-radius: 6px;
    box-sizing: border-box ;
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.15);
    box-shadow: 0 16px 28px 0 rgba(0, 0, 0, 0.22), 0 25px 55px 0 rgba(0, 0, 0, 0.21);
    overflow: hidden;
    flex-direction:column;
  }
  .modal__content-container {
    min-height: 220px;
    max-height:400px;
    max-height: 90vh;
    margin: 0;
    overflow-y: auto;
    padding: 10px 0;
    box-sizing: border-box;
    order:1;
  }
  .modal__footer {
    order:2;
    display: flex;
    margin: 0 10px;
    padding:0 6px;
    height: 56px;
    margin-top:-56px;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #e0e0e0;
  }
  .modal__footer ~ .modal__content-container {
    max-height: calc(90vh - 56px);
    margin-bottom: 56px;
  }
  .modal__footer div {
    padding: 8px 16px;
    background: rgb(227,6,17);
    box-shadow: 0 4px 13px rgba(0, 0, 0, 0.45);
    color: #fff;
    border-radius: 3px;
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
