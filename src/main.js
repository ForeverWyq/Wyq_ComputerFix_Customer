import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant.js'
import moment from 'moment'
import './common.css'

// 全局注册自定义组件
import FullLayout from './components/FullLayout'
import OrderItem from './components/OrderItem'
import ProductItem from './components/ProductItem'
import AddressItem from './components/AddressItem'
import CommentItem from './components/CommentItem'
Vue.component('wyq-fulllayout',FullLayout)
Vue.component('wyq-order-item',OrderItem)
Vue.component('wyq-product-item',ProductItem)
Vue.component('wyq-address-item',AddressItem)
Vue.component('wyq-comment-item',CommentItem)
// 全局注册过滤器
Vue.filter('datefmt',function(val){
  if(val){
    return moment(val).format('YYYY-MM-DD HH:mm:ss')
  }
  return val;
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
