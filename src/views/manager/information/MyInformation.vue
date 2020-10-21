<template>
  <div>
    <!-- 顶部导航栏 -->
    <wyq-fulllayout title="我的资料">
    <!-- /顶部导航栏 -->
      <van-row>
        <!-- <van-col :span="12"> -->
          <div class="income">
            <div class="income_one">钱包</div>
            <div class="income_two">{{cusInfo.money}} 元</div>
          </div>
        <!-- </van-col> -->
        <!-- <van-col :span="12">
          <div class="income">
            <div class="income_one">钱包</div>
            <div class="income_two">{{cusInfo.money}} 元</div>
          </div>
        </van-col> -->
      </van-row>
    <!-- /佣金余额 -->
    <!-- 顾客信息 -->
    <van-cell-group>
      <van-field
        :readonly="true"
        v-model="cusInfo.username"
        label="会员名"
        left-icon="smile-o"
        placeholder="请输入账号"
      />
      <van-field
        v-model="cusInfo.realname"
        clearable
        label="真实姓名"
        left-icon="user-o"
        placeholder="请输入姓名"
      />
      <van-field
        v-model="cusInfo.telephone"
        clearable
        label="联系方式"
        left-icon="phone-o"
        placeholder="请输入联系方式"
      />
      <van-field
        v-model="cusInfo.idCard"
        clearable
        label="身份证号"
        left-icon="idcard"
        placeholder="请输入身份证号"
      />
      <van-field
        v-model="cusInfo.bankCard"
        clearable
        label="银行卡号"
        left-icon="ecard-pay"
        placeholder="请输入银行卡号"
      />
    </van-cell-group>
    <van-cell-group>
      <van-row>
        <!-- <van-col :span="12"> -->
          <van-field
            v-model="cusInfo.province"
            label="省"
            left-icon="location-o"
            placeholder="省份"
          />
        <!-- </van-col>
        <van-col :span="6"> -->
          <van-field
            v-model="cusInfo.city"
            label="市"
            left-icon="location-o"
            placeholder="城市"
          />
        <!-- </van-col>
        <van-col :span="6"> -->
          <van-field
            v-model="cusInfo.area"
            label="县"
            left-icon="location-o"
            placeholder="区域"
          />
        <!-- </van-col> -->
      </van-row>
    </van-cell-group>
    <!-- /顾客信息 -->
    <div class="btn" @click="SaveCustomerHandler">
        修改
    </div>
    <!-- {{earn}} -->
    <!-- {{customer}} -->
    </wyq-fulllayout>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import {mapActions,mapState} from 'vuex'
export default {
  data() {
    return {
      params:{},
    }
  },
  created() {
    // 顾客详细信息
    this.FindCustomerById(this.info.id)
  },
  computed: {
    ...mapState('user',['info','cusInfo']),
  },
  methods: {
    ...mapActions('user',['FindCustomerById','UpdateCustomer']),
    // 修改顾客信息
    SaveCustomerHandler(){
      this.params=this.cusInfo
      this.params.province=this.cusInfo.province
      this.params.city=this.cusInfo.city
      this.params.area=this.cusInfo.area
      this.params.bankCard=this.cusInfo.bankCard
      this.params.idCard=this.cusInfo.idCard
      this.params.telephone=this.cusInfo.telephone
      this.params.realname=this.cusInfo.realname
      // console.log(this.params)
      this.UpdateCustomer(this.params)
      .then(res=>{
        Dialog({ message: "修改成功" })
        // console.log(this.info.id)
        this.FindCustomerById(this.info.id)
      })
    },
  }
}
</script>

<style scoped>
.btn {
  background-color: #ededed;
  width: 90%;
  margin: 2em auto;
  line-height: 3em;
  text-align: center;
  border: 1px solid #ededed;
  border-radius: 1.5em;
  font-size: 14px;
}
.income_one{
  font-size: 18px;
}
.income{
  background: orange;
  padding: 1em;
  text-align: center;
  color: #fff;
  border: 1px solid #fff;
  margin-top: 40px;
}
.header {
  height: 300px;
  overflow: hidden;
}
.header img {
  width: 100%;
}
</style>