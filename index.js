'use strict';

function Modal(options) {

  if (!options) return;

  this.__parseOptions(options);

  if (!window.ModalCount__QasRfmwORkdasRs) window.ModalCount__QasRfmwORkdasRs = 0;

  if (!window.AfmJdnJREQjos__modalStyles) this.__styles();
  if (this.hash) this.__hashListener();
}

Modal.prototype.open = function (options) {

  if (this.closing || this.opening) return Promise.reject();
  if (this.__opened) return Promise.reject();
  this.opening = true;
  if (!this.__el) {
    this.opening = null;
    throw new Error("Не задан элемент ~ element:'.asd' || element:document.querySelector('.asd') ~ ");
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
  return this.__showElement().then(function () {

    _this.__buttonsListener = function (e) {
      if (e.target.closest('.modal__close')) {
        this.close();
        this.__el.removeEventListener('click', this.__buttonsListener);
      }
    }.bind(_this);

    _this.__el.addEventListener('click', _this.__buttonsListener);

    if (_this.hash) location.hash = _this.hash;
    _this.__opened = true;
    _this.opening = null;
    _this.__afterOpenCallback && _this.__afterOpenCallback();
  });
};

Modal.prototype.close = function (options) {
  if (this.closing || this.opening) return Promise.reject();
  if (!this.__opened) return Promise.reject();
  this.closing = true;
  options && this.__parseOptions(options);
  this.__closeCallback && this.__closeCallback();
  this.__bg.classList.remove('modal--open');
  this.__bg.addEventListener('transitionend', function () {
    _this.__bg.remove();
  });
  var _this = this;
  return this.__hideElement().then(function () {
    document.body.style.width = '';
    document.body.style.overflow = '';
    _this.__el.removeEventListener('click', _this.__buttonsListener);
    if (_this.hash && _this.hash == location.hash) {
      history.replaceState({}, document.title, location.pathname.replace(/#/, ''));
      window.dispatchEvent(new Event('hashchange'));
    }
    _this.__opened = false;
    _this.closing = null;
    _this.__afterCloseCallback && _this.__afterCloseCallback();
  });
};

Modal.prototype.toggle = function (options) {
  options && this.__parseOptions(options);
  return this.__opened ? this.close() : this.open();
};
Modal.open = function (element, options) {
  if (!window.ModalCount__QasRfmwORkdasRs) window.ModalCount__QasRfmwORkdasRs = 0;

  //bg
  var bg = document.createElement('div');
  bg.classList.add('modal--bg');
  bg.dataset.modalId = element.id;
  bg.style.zIndex = '900' + window.ModalCount__QasRfmwORkdasRs++;

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      bg.classList.add('modal--open');
    });
  });
  bg.addEventListener('click', function (e) {

    bg.classList.remove('modal--open');
    bg.addEventListener('transitionend', function () {
      bg.remove();
    });
  }, false);
  document.body.insertAdjacentElement('beforeend', bg);

  // el
  element.style.zIndex = '999' + window.ModalCount__QasRfmwORkdasRs++;
  element.style.display = 'flex';

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      element.style.transform = 'translate(0,-50%) scale(1)';
      element.style.opacity = '1';
    });
  });
  new Promise(function (resolve, reject) {

    var a = function a(e) {
      element.style.transition = '';
      element.removeEventListener('transitionend', a);
      resolve();
    };
    element.addEventListener('transitionend', a, false);
  }).then(function () {});

  [].forEach.call(element.querySelectorAll('.modal__close'), function (button) {
    button.addEventListener('click', function () {
      bg.classList.remove('modal--open');
      bg.addEventListener('transitionend', function () {
        bg.remove();
      });
    });
  });
};
Modal.close = function (element, options) {

  var bg = document.querySelector('[data-modal-id="' + element.id + '"]');
  bg.classList.remove('modal--open');
};
// Modal.toggle = function(element, options){

// }


Modal.prototype.element = function (element) {
  if (!element) return this.__el;

  if (typeof element == 'string') {
    this.__el = document.querySelector(element);
  } else if (element instanceof Object) {
    this.__el = element;
  }
  if (!element) throw new Error("Не задан элемент ~ element:'.asd' || element:document.querySelector('.asd') ~ ", this.__el);
};
Modal.prototype.__setBg = function () {
  this.__bg = document.createElement('div');
  this.__bg.classList.add('modal--bg');
  this.__bg.style.zIndex = '900' + window.ModalCount__QasRfmwORkdasRs++;

  if (this.__bgStyle) {
    for (var variable in this.__bgStyle) {
      this.__el.style[variable] = this.__bgStyle[variable];
    }
  }

  var _this = this;

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      _this.__bg.classList.add('modal--open');
    });
  });

  this.__bg.addEventListener('click', function (e) {
    _this.close.call(_this).then(function () {
      _this.__BGcloseCallback && _this.__BGcloseCallback();
    });
  }, false);

  this.__el.insertAdjacentElement('beforebegin', this.__bg);
};
Modal.prototype.__showElement = function () {
  var _this = this;

  this.__el.style.zIndex = '999' + window.ModalCount__QasRfmwORkdasRs++;
  this.__el.style.display = 'flex';

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      _this.__el.style.transform = 'translate(0,-50%) scale(1)';
      _this.__el.style.opacity = '1';
    });
  });
  return new Promise(function (resolve, reject) {

    var a = function a(e) {
      _this.__el.style.transition = '';
      _this.__el.removeEventListener('transitionend', a);
      resolve();
    };
    _this.__el.addEventListener('transitionend', a, false);
  });
};
Modal.prototype.__hideElement = function () {
  var _this = this;

  this.__el.style.transform = '';
  this.__el.style.opacity = '0';

  return new Promise(function (resolve, reject) {
    function hide(e) {

      resolve();
      _this.__el.removeEventListener('transitionend', hide);
      _this.__el.style.display = '';
      _this.__el.style.transform = '';
      _this.__el.style.opacity = '';
    }
    _this.__el.addEventListener('transitionend', hide, false);
  });
};

Modal.prototype.__parseOptions = function (options) {

  if (options.tagName || typeof options == 'string') {
    this.element(options);
    return;
  };
  options.element && this.element(options.element);

  if (options.open !== undefined) this.__openCallback = options.open;

  if (options.close !== undefined) this.__closeCallback = options.close;

  if (options.BGclose !== undefined) this.__BGcloseCallback = options.BGclose;

  if (options.afterOpen !== undefined) this.__afterOpenCallback = options.afterOpen;

  if (options.afterClose !== undefined) this.__afterCloseCallback = options.afterClose;

  if (options.hash !== undefined) {

    this.hash = options.hash;
    if (!this.__hashListenerBinded) {
      this.__hashListenerBinded = this.__hashListener.bind(this);
      window.addEventListener("hashchange", this.__hashListenerBinded);
    }
  }

  if (options.modalStyle) this.__modalStyle = options.modalStyle;

  if (options.bgStyle) this.__bgStyle = options.bgStyle;
};

Modal.prototype.__hashListener = function (options) {

  if (this.hash == location.hash && !this.__opened) {
    this.open();
  } else if (this.hash != location.hash && this.__opened) {
    this.close();
  }
};

Modal.prototype.__styles = function () {
  window.AfmJdnJREQjos__modalStyles = true;
  var styles = document.createElement('style');
  styles.innerHTML = '\n  .modal--bg {\n    position: fixed;\n    will-change: opacity;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    background-color: rgba(255,255,255,.6);\n    opacity: 0;\n    transition: all .2s ease .1s;\n    -webkit-backdrop-filter: blur(20px);\n    backdrop-filter: blur(20px);\n  }\n  .modal--bg.modal--open {\n    opacity: 1;\n    top:0;\n    transition: all .3s ease .1s;\n  }\n  .modal {\n    color:#333;\n    position: fixed;\n    top: 47%;\n    left: 0%;\n    right: 0%;\n    will-change: transform, opacity;\n    display: none;\n    opacity: 0;\n    width: 55%;\n    min-height: 177px;\n    max-width: 1000px;\n    max-height: 90%;\n    height:auto;\n    padding: 0;\n    transform: translate(0 , -45%) scale(.9, 1);\n    margin: 0 auto;\n    transition: all .3s ease;\n    border-radius: 6px;\n    box-sizing: border-box ;\n    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.15);\n    box-shadow: 0 16px 28px 0 rgba(0, 0, 0, 0.22), 0 25px 55px 0 rgba(0, 0, 0, 0.21);\n    overflow: hidden;\n    flex-direction:column;\n  }\n  .modal__content {\n    min-height: 120px;\n    max-height:400px;\n    max-height: 90vh;\n    margin: 0;\n    overflow-y: auto;\n    padding: 30px;\n    box-sizing: border-box;\n    order:1;\n  }\n  .modal__footer {\n    order:2;\n    display: flex;\n    margin: 0 10px;\n    padding:0 6px;\n    height: 56px;\n    min-height: 56px;\n    margin-top:-56px;\n    align-items: center;\n    justify-content: space-between;\n    border-top: 1px solid #e0e0e0;\n  }\n  .modal__footer .btn {\n    font-size: .85rem;\n  }\n  .modal__footer ~ .modal__content {\n    max-height: calc(90vh - 56px);\n    margin-bottom: 56px;\n  }\n\n  @media (max-width:1000px) {\n    .modal {\n      width: 65%;\n      max-width: 1000px;\n    }\n  }\n  @media (max-width:800px) {\n    .modal {\n      width: 65%;\n      max-width: 1000px;\n    }\n  }\n  @media (max-width:600px) {\n    .modal {\n      width: 75%;\n      max-width: 1000px;\n    }\n  }\n  @media (max-width:480px) {\n    .modal {\n      width: 85%;\n      max-width: 1000px;\n    }\n  }\n  @media (max-width:320px) {\n    .modal {\n      width: 95%;\n    }\n  }\n  ';
  document.body.append(styles);
};

+function () {
  addEventListener('DOMContentLoaded', function () {

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
