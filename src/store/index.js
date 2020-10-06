import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user'
import address from './modules/address'
import recharge from './modules/recharge'
import comment from './modules/comment'


export default new Vuex.Store({
  modules:{
    user,
    address,
    recharge,
    comment,
  }
})
