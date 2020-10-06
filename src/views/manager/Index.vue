<template>
  <!-- 后台管理总页面 -->
  <div class="manager">
    <!-- 用于接受管理页面，首页，订单页，我的页面 -->
    <router-view class="routerview"></router-view>
    <van-tabbar class="tabbar" route active-color="#1659a0">
      <van-tabbar-item icon="home-o" to="/manager/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/manager/order">订单</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/manager/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  created(){
    
  },
  computed:{
    ...mapState('user',['info'])
  },
  methods:{
    
  }
}
</script>
<style scoped>
.routerview{
  margin-bottom:50px;
  padding-bottom: 5px;
}
.tabbar{
  border-top: 1px solid #eeeeee;
}
</style>