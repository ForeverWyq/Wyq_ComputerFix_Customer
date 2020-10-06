import {get} from '../../http/axios'
export default {
    namespaced:true,
    state: {
        charge:''
    },
    mutations: {
        refreshRecharge(state,charge){
            state.charge = charge
        }
    },
    actions: {
        // 充值
        async CustomerRecharge(context,params){
            let response = await get('/customer/recharge',params)
            console.log(response);
            // commit('refreshRecharge',response.data)
        }
    }
}