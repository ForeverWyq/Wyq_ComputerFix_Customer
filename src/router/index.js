import Vue from 'vue'
import VueRouter from 'vue-router'
// 管理页面
import Manager from '../views/manager/Index'
import Home from '../views/manager/Home'
import Order from '../views/manager/Order'
import User from '../views/manager/User'
// 登录页面
import Login from '../views/Login'
import { getToken } from '../utils/auth'
// 注册页面
import Register from '../views/Register'
// import { Toast, AddressList} from 'vant'
import { Toast } from 'vant'
import store from '../store'
// 个人信息
import Information from '../views/manager/information/MyInformation'
// 地址页面
import AddressList from '../views/manager/address/List'
import AddressAdd from '../views/manager/address/Add'
import AddressEdit from '../views/manager/address/Edit'
// 订单确认
import Order_Confirm from '../views/manager/order/Confirm'
// 通过栏目查找产品
import Product from '../views/manager/category'
// 账户充值
import Money from '../views/manager/money/Money'
import Recharge from '../views/manager/money/Recharge'
import Withdraw from '../views/manager/money/Withdraw'
// 评论管理
import Comment from '../views/manager/comment/Comment'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/manager/home"
  },
  {
    path: '/manager',
    name: 'manager',
    component: Manager,
    beforeEnter: (to, from, next) => {  //属于路由自己的拦截器
      let token = getToken();
      if (token) {
        // 查询info
        store.dispatch('user/info', token)
          .then(() => {
            // 当获取万用户信息之后才允许跳转
            next();
          })
      } else {
        Toast("token失效")
        // 跳转到登录
        next({ path: '/login' })
      }
    },
    children: [{
      path: 'home',
      component: Home,
    },
    {
      path: 'order',
      component: Order,
    },
    {
      path: 'order_confirm',
      component: Order_Confirm,
    },
    {
      path: 'product_list',
      component: Product,
    },
    {
      path: 'user',
      component: User,
    },
    {
      path: 'information',
      component: Information,
    },
    {
      path: 'money',
      component: Money
    },
    {
      path: 'recharge',
      component: Recharge
    },
    {
      path: 'withdraw',
      component: Withdraw
    },
    {
      path: 'address',
      component: AddressList,
    },
    {
      path: 'address_add',
      component: AddressAdd,
    },
    {
      path: 'address_edit',
      component: AddressEdit,
    },
    {
      path: 'comment',
      component: Comment,
    },]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
