<template>
    <div class="card">
        <van-row>
            <van-col span="6">
                <img style="width:5em" :src="cusInfo.imgPhoto" alt=""/>
            </van-col>
            <van-col span="16">
                <div>订单：{{c.orderId}}</div>     
                <div style="padding-top:.5em;padding-bottom:.5em">评论内容：{{c.content}}</div>
                <div>评论时间：{{c.commentTime | datefmt}}</div>
                <div>评论状态：{{c.status}}</div>
            </van-col>
            <van-col span="2" class="option">
                <van-icon @click="editCommentHandler(c)" name="edit" size="larger" /> &nbsp;
                <van-icon @click="deleteCommentHandler(c)" name="delete" size="larger" />
            </van-col>
        </van-row>
        <van-popup class="commentdialog" position="bottom" round v-model="show"
        closeable :style="{height:'80%'}">
        <!-- :close-on-click-overlay="false" -->
            <div class="dialogtitle">评 论</div>
            <span v-for="line in orders.orderLines" :key="line.id">
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
import { Dialog ,Card } from 'vant';
import Vue from 'vue';
import {mapState,mapActions} from 'vuex'
export default {
    data(){
        return{
            show: false,
            comment: '',
            params:{
                page:0,
                pageSize:100
            },
            orders:[],
        }
    },
    created() {
        this.params = {
            page:0,
            pageSize:100,
            cusId:this.info.id
        }
        this.QueryComment(this.params);
        this.findAllCommentsBycus(this.info.id);
        this.FindCustomerById(this.info.id);
        this.loadOrders();
    },
    computed: {
        ...mapState('comment',['comments','commentBycus']),
        ...mapState('user',['info', 'cusInfo']),
    },
    props:['c'],
    methods:{
        ...mapActions('comment',['QueryComment','findAllCommentsBycus','SaveComment','deleteCommentById']),
        ...mapActions('user',['FindCustomerById']),
        // 加载我的订单
        loadOrders(){
        let url="/order/findById";
        let params={
            id: this.c.orderId,
        }
        get(url,params).then((response)=>{
            this.orders=response.data;
        })
        },
        // 修改评论,c为当前行数据
        editCommentHandler(c){
            this.comment=c.content;
            this.show=true;
        },
        updataComment(){
            let url="comment/saveOrUpdate"
            let params={
                id: this.c.id,
                content: this.comment,
                orderId: this.c.orderId,
                cusId: this.info.id,
                status: '未审核'
            }
            post(url,params).then(()=>{
                this.show=false;
                Dialog({ message: '修改成功，请等待重新审核' }).then(()=>{
                    this.$router.go(0);
                }) 
            })
        },
        // 删除评论
        deleteCommentHandler(c){
            Dialog.confirm({
                message: '是否删除该评论？'
            }).then(() => {
                // 调用方法，删除地址
                this.deleteCommentById(c.id).then(()=>{
                    Dialog({ message: '删除成功' }).then(()=>{
                        this.$router.go(0);
                    }) 
                })
            }).catch(() => {
                // on cancel
            });
        },
    }
}
</script>
<style scoped>
.card{
    margin: .5em 1em;
    padding: .5em;
    border-radius: 5px;
    background: #f1f1f1;
}
.option{
    text-align:center;
    line-height: 3em;
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