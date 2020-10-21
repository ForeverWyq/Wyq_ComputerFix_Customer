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
import axios from 'axios'
export default {
  methods:{
    ...mapActions('user',['logout', 'FindCustomerById', 'UpdateCustomer']),
    logoutHandler(){
      this.logout()
      .then(()=>{
        this.$router.push({path:'/login'})
      })
    },
    afterRead(file) {
      // let url = "http://121.199.29.84:8001/file/upload"
      console.log(file);
      // 此时可以自行将文件上传至服务器
      this.uploadImg(file.file)
    },
    uploadImg (file) {
    // 创建form对象
      let formdata = new FormData();
      // 通过append向form对象添加数据,可以通过append继续添加数据
      //或formdata.append('file',file);
      formdata.append('file', file, file.name);
      //设置请求头
      let config = {
          headers:{
              'Content-Type':'multipart/form-data'
          }
      };  
      //this.axios 是因为在main.js写在vue实例里
      const axiosAjax = axios.create({
          timeout: 1000 * 60, //时间
          withCredentials: true //跨域携带cookie
      });
      axiosAjax.post('http://121.199.29.84:8001/file/upload',formdata,config)
      .then((res)=>{   //这里的url为后端接口
          console.log(res.data.data.id);
          //res 为接口返回值
          let photo = "http://121.199.29.84:8888/group1/"+res.data.data.id
          console.log(photo);
          let params = this.cusInfo;
          params.imgPhoto = photo;
          this.UpdateCustomer(params)
          .then(res=>{
            // console.log(this.info.id)
            this.FindCustomerById(this.info.id).then(()=>{
              this.$toast('更换成功');
            })
          })
      }).catch((response) => {})
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