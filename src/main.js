import Vue from 'vue'
import App from './App.vue'
import RudyScrollbar from 'rudy-scrollbar'
import './style/reset.styl'

Vue.use(RudyScrollbar);

new Vue({
  el: '#app',
  render: h => h(App)
})
