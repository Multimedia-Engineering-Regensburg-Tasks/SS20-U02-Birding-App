/* eslint-env browser */

import Config from "../utils/Config.js";
import Observable from "../utils/Observer.js";

class View extends Observable {

  constructor() {
    super();
    this.el = undefined;
  }

  setElement(el) {
    this.el = el;
  }

  clear() {
    while (this.el.lastElementChild) {
      this.el.removeChild(this.el.lastChild);
    }
  }

  show() {
    if (this.el) {
      this.el.classList.remove(Config.CSS_HIDDEN_CLASS_NAME);
    }
  }

  hide() {
    if (this.el) {
      this.el.classList.add(Config.CSS_HIDDEN_CLASS_NAME);
    }
  }
}

export default View;