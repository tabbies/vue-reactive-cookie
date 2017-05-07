import Cookies from 'js-cookie';

export default {
  install(Vue) {
    this.Vue = Vue;
    this.instance = this.createNewVueInstance();
    this.defineVueInstanceProperties();
    this.updateCookiesInstance();
  },

  createNewVueInstance() {
    return new this.Vue({
      data: {
        cookies: {},
      },
    });
  },

  defineVueInstanceProperties() {
    Object.defineProperty(this.Vue.prototype, '$cookies', { get: () => this.instance.cookies });
    Object.defineProperty(this.Vue.prototype, '$setCookie', { get: () => this.setCookie.bind(this) });
    Object.defineProperty(this.Vue.prototype, '$removeCookie', { get: () => this.removeCookie.bind(this) });
  },

  updateCookiesInstance(name = null) {
    if (null !== name) {
      this.instance.cookies[name] = Cookies.get(name);
    } else {
      this.instance.cookies = Cookies.get();
    }
  },

  setCookie(name, value, options = {}) {
    Cookies.set(name, value, options);

    this.updateCookiesInstance(name);
  },

  removeCookie(name) {
    Cookies.remove(name);

    this.updateCookiesInstance();
  },
};
