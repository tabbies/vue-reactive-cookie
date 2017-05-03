import Cookies from 'js-cookie';

export default {
  install(Vue, options = {}) {
    this.options = options;
    this.Vue = Vue;
    this.instance = this.createNewVueInstance();
    this.defineVueInstanceProperties();
    this.updateCookiesInstance();

    if (this.options.autoupdate === true) {
      this.runInterval();
    }
  },

  createNewVueInstance() {
    return new this.Vue({
      data: {
        cookies: {},
      },
    });
  },

  defineVueInstanceProperties() {
    Object.defineProperty(this.Vue.prototype, '$cookies', {get: () => this.instance.cookies});
    Object.defineProperty(this.Vue.prototype, '$setCookie', {get: () => this.setCookie.bind(this)});
    Object.defineProperty(this.Vue.prototype, '$removeCookie', {get: () => this.removeCookie.bind(this)});
  },

  runInterval() {
    setInterval(() => {
      this.updateCookiesInstance();
    }, this.options.autoupdateInterval || 1000);
  },

  updateCookiesInstance() {
    this.instance.cookies = Cookies.get();
  },

  setCookie(name, value, options = {}) {
    Cookies.set(name, value, options);

    this.updateCookiesInstance();
  },

  removeCookie(name) {
    Cookies.remove(name);

    this.updateCookiesInstance();
  },
};
