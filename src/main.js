import Vue from 'vue';
import VeeValidate from 'vee-validate';
import App from './App';
import axios from 'axios'

axios.defaults.baseURL = 'https://bookmark-app-e82b8.firebaseio.com/';

Vue.use(VeeValidate);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
})
