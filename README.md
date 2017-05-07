# vue-reactive-cookie
> A Vue.js reactive cookie plugin

## Install

You can install this plugin via yarn or via npm

```bash
$ yarn add vue-reactive-cookie
$ npm install --save vue-reactive-cookie
```

## Basic example

```html
<div id="element">
    <p>{{ message }}</p>
    
    <input type="text" v-model="message">
    
    <button type="button" v-on:click="forgetMessage">Forget the message</button>
</div>
```

```javascript
// Also, you could use es6 import
const VueReactiveCookie = require('vue-reactive-cookie');

Vue.use(VueReactiveCookie);

new Vue({
  el: '#element',
  
  computed: {
    message: {
      get: function () {
        return this.$cookies.message || null;
      },
      
      set: function (value) {
        this.$setCookie('message', value, { expires: 365 });
      },
    },
  },
  
  methods: {
    forgetMessage: function () {
      this.$removeCookie('message');
    },
  },
});
```

## Available methods

### $setCookie(name, value, options)

Create a cookie. List of available options is here: [github.com/js-cookie/js-cookie#cookie-attributes](https://github.com/js-cookie/js-cookie#cookie-attributes)

### $removeCookie(name)

Removes a cookie.