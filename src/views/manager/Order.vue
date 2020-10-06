<template>
  <div class="order">
    <div class="vanbar">
      <van-nav-bar title="我的订单"/>
      <van-tabs v-model="active" color="#1659a0" @click="tabClickHandler">
        <van-tab title="全部"></van-tab>
        <van-tab title="待支付"></van-tab>
        <van-tab title="待派单"></van-tab>
        <van-tab title="待接单"></van-tab> 
        <van-tab title="待服务"></van-tab> 
        <van-tab title="待确认"></van-tab> 
        <van-tab title="已完成"></van-tab>
      </van-tabs>
    </div>
    <div class="orderitem">
      <wyq-order-item 
      v-for="o in orders"
      :key="o.id" :data="o">
      </wyq-order-item>
    </div>
    <div class="ordernull" v-if="orders.length==0">
      <van-empty description="暂无订单" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { get } from '../../http/axios'
export default {
  data(){
    return {
      active:0,
      orders:[],
      status:null
    }
  },
  computed:{
    ...mapState("user",["info"])
  },
  created(){
    this.loadOrders();
  },
  methods:{
    // 加载我的订单
    loadOrders(){
      let url="/order/query";
      let params={
        customerId:this.info.id,
        status:this.status
      }
      get(url,params).then((response)=>{
        this.orders=response.data;
      })
    },
    // 点击tab执行的回调函数 
    tabClickHandler(name,title){
      this.status = title === "全部" ? null : title;
      this.loadOrders();
    }
  }
}
</script>
<style scoped>
.order {
  background: #f1f1f1;
  height: 100%;
}
.vanbar{
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid #eeeeee;
}
.orderitem{
  padding-top: 90px;
}
</style>