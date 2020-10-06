<template>
  <div class="order_item">
    <van-row class="header">
      <van-col span="12">订单编号: {{data.id}}</van-col>
      <van-col span="12" class="status">{{data.status}}</van-col>
    </van-row>
    <van-row>
      <span v-for="line in data.orderLines" :key="line.id">
            <van-card :num=line.number :price=line.product.price :desc=line.product.description
            :title=line.product.name :thumb=line.product.photo />
            <!-- {{line.product.name}} -->
          </span>
      <van-col :span="24" :offset="1">
        <div><!-- 服务内容: -->
          
        </div>
        <div v-if="data.waiter!=null">员工姓名：{{data.waiter.realname}}</div>
        <div v-if="data.waiter!=null">员工联系方式：{{data.waiter.telephone}}</div>
        <div>服务时间：{{data.orderTime | datefmt}}</div>
        <div>服务地点：
          {{data.address.province}}
          {{data.address.city}}
          {{data.address.area}}
          {{data.address.address}}
        </div>
      </van-col>
    </van-row>
    <div class="text-right">
      合计￥ {{data.total}}
    </div>
    <div class="text-right" v-if="data.status==='待支付'"><br>
        <!-- <van-button size="small" type="danger" plain 
        @click="cancelOrder(data.id)">取消订单</van-button>&nbsp; -->
        <van-button size="small" type="warning" plain 
        @click="payHandler(data)">立即支付</van-button>
    </div>
    <div class="text-right" v-if="data.status==='待确认'"><br>
        <van-button size="small" type="primary" plain 
        @click="finishHandler(data.id)">确认订单</van-button>
    </div>
    <div class="text-right" v-if="data.status==='已完成'"><br>
        <van-button size="small" type="primary" plain 
        @click="Comment()">评 论</van-button>
    </div>
    <van-popup class="commentdialog" position="bottom" round v-model="show"
    closeable :style="{height:'80%'}">
    <!-- :close-on-click-overlay="false"  -->
      <div class="dialogtitle">评 论</div>
      <span v-for="line in data.orderLines" :key="line.id">
        <van-card :num=line.number :price=line.product.price :desc=line.product.description
        :title=line.product.name :thumb=line.product.photo />
      </span>
      <van-form>
        <van-field class="commentText" v-model="comment" maxlength="50"
         label="评论内容" type="textarea" placeholder="评论内容"
          :rules="[{ required: true, message: '请填写评论内容' }]"/>
        <van-button class="dialogbtn" round type="info" @click="updataComment">提交</van-button>
      </van-form>
    </van-popup>
  </div>
</template>
<script>
import {get, post} from '../http/axios';
import Vue from 'vue';
import { Dialog, Toast } from 'vant';
export default {
  data() {
    return {
      show: false,
      comment: '',
    };
  },
  props:{
    data:{type:Object}
  },
  methods:{
      finishHandler(id){
        let url = "/order/confirmOrder";
        let params={
          orderId:id
        }
        get(url,params).then(()=>{
          Dialog({ message: '成功确认订单' }).then(()=>{
            this.$router.go(0);
          })
        })
      },
      payHandler(data){
        Dialog.confirm({
          title: '支付',
          message: '您确认购买这件商品吗',
        })
        .then(() => {
          // on confirm
          if(data.total<=data.customer.money){
            let url = "/order/paymoney";
            let params={
              orderid: data.id,
              customer_id: data.customerId,
              order_name: data.id,
              order_money: data.total,
              description: "支付订单",
            }
            Dialog({ message: '支付成功' }).then(()=>{
                this.$router.go(0);
            })
            get(url,params);
          }else{
            Dialog({ message: '您的余额不足,请充值' });
          }
          
        })
        .catch(() => {
          // on cancel
        });
      },
      // cancelOrder(id){
      //   Dialog.confirm({
      //     title: '取消订单',
      //     message: '您确认取消该订单吗',
      //   })
      //   .then(()=>{
      //     let url = "/order/deleteById";
      //     let params={
      //       id: id
      //     }
      //     get(url, params).then(()=>{
      //       Dialog({ message: '成功取消订单' }).then(()=>{
      //         this.$router.go(0);
      //       })
      //     })
      //   })
      //   .catch(()=>{

      //   })
      // },
      Comment(){
        this.show=true;
      },
      updataComment(){
        let url="comment/saveOrUpdate"
        let params={
          content: this.comment,
          orderId: this.data.id,
          cusId: this.data.customerId,
          status: '未审核'
        }
        post(url,params).then(()=>{
          this.$toast("评论成功,请等待审核");
          this.show=false;
          this.comment='';
        })
      }
  }
}
</script>
<style scoped>
.order_item {
  margin: .5em 1em;
  padding: .5em;
  border-radius: 5px;
  background: #ffffff;
}
.order_item .header {
  line-height: 2.5em;
  font-size: 14px;
}
.order_item .header .status {
  text-align: right;
  font-size: 12px;
  color: #fd621f;
}
.order_item img {
  width: 100%;
  border-radius: 3px;
}
.dialogtitle{
  font-size: 18px;
  text-align: center;
  padding-top: 16px;
  padding-bottom: 16px;
}
.commentText{
  padding-top: 16px;
}
.dialogbtn{
  width: 90%;
  position: fixed;
  bottom: 16px;
  left: 5%;
}
</style>