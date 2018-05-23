import Vue from 'vue';
import VeeValidate from 'vee-validate';
import App from './App';

Vue.use(VeeValidate);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
})
