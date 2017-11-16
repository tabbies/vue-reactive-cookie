import Cookies from 'js-cookie';

export default {
  install(Vue, options = {}) {
    this.Vue = Vue;
    this.convertJSON = typeof options.convertJSON !== 'undefined' ? options.convertJSON : false;
    this.cookies = this.createNewCookiesInstance();
    this.instance = this.createNewVueInstance();
    this.defineVueInstanceProperties();
    this.updateCookiesInstance();
  },

  createNewCookiesInstance() {
    return Cookies.withConverter(value => {
      if (this.convertJSON) {
        const decodedValue = decodeURIComponent(value);

        if (this.isJSON(decodedValue)) {
          return JSON.parse(decodedValue);
        }
      }

      return value;
    });
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

  updateCookiesInstance() {
    this.instance.cookies = this.cookies.get();
  },

  isJSON(value) {
    if (0 === value.trim().length) {
      return false;
    }

    value = value.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
    value = value.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
    value = value.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
         
    return (/^[\],:{}\s]*$/).test(value);
  },

  setCookie(name, value, options = {}) {
    this.cookies.set(name, value, options);

    this.updateCookiesInstance();
  },

  removeCookie(name) {
    this.cookies.remove(name);

    this.updateCookiesInstance();
  },
};
