

function Modal(options){

  if (!options) return;

  this.__parseOptions(options);
	this.transition = 'transform .3s ease, opacity .3s ease';
  this.closeTransition = 'transform .2s ease, opacity .2s ease';


  this.transform = 'translate(0, 40px) scale(.95,1)';
  this.BGopacity = '.9';
  this.BGcolor = 'rgb(255,255,255)';
  if (!window.ModalCount__QasRfmwORkdasRs){
   window.ModalCount__QasRfmwORkdasRs = 0;
  }
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
  this.__bg.remove();
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
  this.__bg.style.position = 'fixed';
  this.__bg.style.willChange = 'opacity';
  this.__bg.style.zIndex = '99999' + window.ModalCount__QasRfmwORkdasRs++;
  this.__bg.style.width = '100%';
  this.__bg.style.height = '100%';
  this.__bg.style.top = '0';
  this.__bg.style.left = '0';
  this.__bg.style.backgroundColor = this.BGcolor;
  this.__bg.style.opacity = '0';
  this.__bg.style.transition = this.transition;
  var _this = this;
  setTimeout(function(){
    _this.__bg.style.opacity = _this.BGopacity;
  },25);
  this.__bg.addEventListener('click',function(e){
    _this.close.call(_this)
    .then(function(){
      _this.__BGcloseCallback && _this.__BGcloseCallback();
    });
  },false);

  document.body.insertAdjacentElement('beforeend',this.__bg);
}
Modal.prototype.__showElement = function(){

  this.__el.style.position = 'fixed';
  this.__el.style.zIndex = '999999' + window.ModalCount__QasRfmwORkdasRs++;
  this.__el.style.width = '90%';
  this.__el.style.willChange = 'opacity,transform';
  this.__el.style.height = '90%';
  this.__el.style.display = 'block';
  this.__el.style.top = '5%';
  this.__el.style.left = '5%';
  this.__el.style.boxSizing =  'border-box' ;
  this.__el.style.margin =  '0';
  this.__el.style.opacity =  '0';
  this.__el.style.transform = this.transform;

  var _this = this;
  setTimeout(function(){
    _this.__el.style.transition =  _this.transition;
    _this.__el.style.transform = 'translate(0,0) scale(1)';
    _this.__el.style.opacity =  '1';
  },25);
  return new Promise(function(resolve,reject){

    let a = function(e){
        console.log(e,1)
        _this.__el.style.transition = '';
        _this.__el.removeEventListener('transitionend',a);
        resolve();
    };
    _this.__el.addEventListener('transitionend',a,false);
  });
};
Modal.prototype.__hideElement = function(){
  var _this = this;

  if (this.closeTransition)
    this.__el.style.transition = this.closeTransition;

    this.__el.style.transform = this.transform;
    this.__el.style.opacity = '0';




  return new Promise(function(resolve,reject){
		function hide(e){
      let transitionTime = (_this.closeTransition || _this.transition).match(/d+/)
      if (e.elapsedTime == .3) return;

      resolve();

      _this.__el.style.transition =  '';
      _this.__el.style.position = '';
      _this.__el.style.zIndex = '';
      _this.__el.style.width = '';
      _this.__el.style.height = '';
      _this.__el.style.top = '';
      _this.__el.style.left = '';
      _this.__el.style.boxSizing =  '' ;
      _this.__el.style.margin =  '';
      _this.__el.style.opacity =  '';
      _this.__el.style.display = '';
  		_this.__el.style.transform = '';
      _this.__el.removeEventListener('transitionend', hide);

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
