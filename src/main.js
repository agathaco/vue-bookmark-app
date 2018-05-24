import Vue from 'vue'
import VeeValidate from 'vee-validate'
import VTooltip from 'v-tooltip'
import App from './App'
import axios from 'axios'

axios.defaults.baseURL = 'https://bookmark-app-e82b8.firebaseio.com/'

Vue.use(VeeValidate)
Vue.use(VTooltip)
VTooltip.options.disposeTimeout = '500'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
