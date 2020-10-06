<template>
 <div class="login">
    <div class="header">
      <div class="logo">注册</div>
      <div class="title">
        电脑维修保养预约
        <span style="font-size:.8em">顾客端</span>
      </div>
    </div>
    <div class="form">
      <van-cell-group>
        <van-field
          v-model="form.username" required clearable label="用户名"
          icon="question-o" placeholder="请输入用户名" />
        <van-field
          v-model="form.password" type="password" label="密码"
          placeholder="请输入密码" required />
        <van-field
          v-model="form.realname" label="真实姓名" placeholder="输入您的真实姓名"
          required clearable />
        <van-field
          v-model="form.telephone" label="手机号" type="number"
          placeholder="输入您的手机号" required clearable />
      </van-cell-group>          
      <div style="text-align:center;padding:1em" >
        <van-button plain round @click="RegisterHandler" style="width:100%">注册</van-button>
        <van-button plain round @click="rebtn" style="width:100%">返回</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
import { get,post_obj_array } from '../http/axios'
export default {
  data(){
    return {
      form:{
        type:'customer'
      }
    }
  },
  methods:{
    rebtn(){
        this.$router.go(-1);
    },
    RegisterHandler(){
        let url="/customer/saveOrUpdate"
        let data = {
            username:this.form.username,
            password:this.form.password,
            realname:this.form.realname,
            telephone:this.form.telephone,
            status: "启用",
        }
        if(data.username==null){
          this.$toast("用户名不能为空");
        }else if(data.password==null){
          this.$toast("密码不能为空");
        }else if(data.realname==null){
          this.$toast("真实姓名不能为空");
        }else if(data.telephone==null){
          this.$toast("手机号不能为空");
        }else{
          post_obj_array(url,data).then((response)=>{
              this.$toast("注册成功");
              this.$router.go(-1);
          })
        }
    }
  }
}
</script>
<style scoped>
.header {
  height: 140px;
  padding: 50px;
  color: #ffffff;
  background-color: #1659a0;
  text-align: center
}
.header .logo {
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
  border: 1px solid #efefef;
  margin: 0 auto;
  color:#efefef;
  font-weight: bold;
  margin-bottom: 1em;
  font-size: 1.5em
}
.header .title {
  font-size: 24px;
}
</style>