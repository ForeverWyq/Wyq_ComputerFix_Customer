<template>
  <div class="user">
    <div class="header">
      <van-uploader :after-read="afterRead" >
        <div class="photo">
          <img :src="cusInfo.imgPhoto" alt=""/>
        </div>
      </van-uploader>
      <div class="name">{{cusInfo.realname}}</div>
    </div>
    <van-cell icon="user-o" title="我的资料" is-link to="information"/>
    <van-cell icon="balance-o" title="账户余额" :value="cusInfo.money" is-link to="money" />
    <van-cell icon="location-o" title="常用地址" is-link to="address"/>
    <van-cell icon="search" title="所有订单" is-link to="order" />
    <van-cell icon="star-o" title="我的评论" is-link @click="toCommentHandler(id)" />

    <br>
    <div class="btn" @click="logoutHandler">退出登录</div>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
  methods:{
    ...mapActions('user',['logout', 'FindCustomerById']),
    logoutHandler(){
      this.logout()
      .then(()=>{
        this.$router.push({path:'/login'})
      })
    },
    afterRead(file) {
      // let url = "http://121.199.29.84:8001/file/upload"

      // let photo = "http://121.199.29.84:8888/group1/"+response.data.id

      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    toCommentHandler(id){
      this.$router.push({path:'/manager/comment',query:id})
    }
  },
  computed:{
    ...mapState("user",["info", "cusInfo"])
  },
  created(){
    this.FindCustomerById(this.info.id);
  },
}
</script>

<style scoped>
.header {
  padding-top: 46px;
  text-align: center;
  background: #1659a0;
  margin-bottom: 2em;
}

.header .photo {
  margin: 0 auto;
  width: 10em;
  height: 10em;
  border-radius: 50%;
  box-sizing: border-box;
  border:1px solid #1659a0;
  overflow:hidden;
  padding: 1em;
}
.header .name {
  line-height: 3em;
  font-size: 16px;
  color: #ffffff;

}
.header .photo img {
  background: #fff;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.btn {
  width: 90%;
  margin: 0 auto;
  line-height: 3em;
  text-align: center;
  border: 1px solid #ededed;
  border-radius: 1.5em;
  color: #f00;
}
</style>