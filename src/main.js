import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VuetifyConfirm from './plugins/vuetifyconfirm'

Vue.config.productionTip = false

new Vue({
  vuetify,
  VuetifyConfirm,
  render: h => h(App)
}).$mount('#app')
