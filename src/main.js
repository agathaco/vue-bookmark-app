import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App';

Vue.use(Vuelidate);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
})
