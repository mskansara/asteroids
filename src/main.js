import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import jQuery from 'jquery'
import VeeValidate from 'vee-validate';
import notie from 'notie'
import NProgress from 'nprogress';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.css';
import axios from 'axios';
import firebase from 'firebase/app';


global.$ = global.jQuery = jQuery;
window.NProgress = NProgress;
window.NProgress.configure({ showSpinner: false });
window.notie = notie;
window.axios = axios;
window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest',
};
window.Vue = Vue;

// Firebase
var firebaseConfig = {
  apiKey: "AIzaSyDmNCtklEycXpnZCgnPtnjoMMsQSrhbh9o",
  authDomain: "asteroids-bcc44.firebaseapp.com",
  databaseURL: "https://asteroids-bcc44.firebaseio.com",
  projectId: "asteroids-bcc44",
  storageBucket: "asteroids-bcc44.appspot.com",
  messagingSenderId: "940174327923",
  appId: "1:940174327923:web:69d2ccd7364febe971aa06",
  measurementId: "G-4C3CJP0XXH"
};
firebase.initializeApp(firebaseConfig);


router.beforeEach((to, from, next) => {
  window.NProgress.start();
  next();
});

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')

window.success = (message) => {
  window.notie.alert({
      text: message,
      type: 'success',
      position: 'bottom'
  });
};
window.error = (message) => {
  window.notie.alert({
      text: message,
      type: 'error',
      position: 'bottom'
  });
};
// window.info = (message) => {
//   window.notie.alert({
//       text: message,
//       type: 'info',
//       position: 'bottom'
//   });
// };

window.$(document).ready(() => {
  window.NProgress.done();
});

// window.logError = (response) => {
//   window.NProgress.done();
//   console.log(response);
// };


//API Key Iy2sbpgTZ70mVFS7Hki3hjWbyMDc3jeSrMfgdrIu