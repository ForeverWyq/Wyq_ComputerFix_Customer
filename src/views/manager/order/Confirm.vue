<template>
    <wyq-fulllayout title="订单确认" style="paddingTop:1em">
        <div style="paddingLeft:2em;paddingRight:2em;paddingTop:3em">
        服务地址:
        <van-dropdown-menu>
            <van-dropdown-item v-model="addressId" :options="options" />
        </van-dropdown-menu>
        订单详情:
        <van-card :num=this.number :price=$route.query.price :desc=$route.query.description
            :title=$route.query.name :thumb=$route.query.photo />
        <div style="padding:0 2em">
            
            <br>
            <!-- <p>服务名称:{{$route.query.name}}</p>
            <p>服务简介:{{$route.query.description}}</p>
            <p>服务单价:¥{{$route.query.price}}</p> -->
            <p>数量:<van-stepper :v-model=this.number :min="1" integer @change="numberChangeHandler" style="display: inline; padding-left:20px"/></p>
            <p>小计: ¥{{$route.query.price * this.number}}</p>
        </div>
        </div>
        <div class="btn" @click="submitHandler()">提交订单</div>
        <!-- <div style="position:fixed;botton:0;width:100%">
            <van-button block type="primary" @click="submitHandler">提交订单</van-button>
        </div> -->
    </wyq-fulllayout>
</template>
<script>
import { Dialog } from 'vant';
import { mapState } from 'vuex';
import Vue from 'vue';
import { get,post_obj_array } from '../../../http/axios'
export default {
    data(){
        return{
            addresses:[],
            addressId:0,  //服务地址id
            orderLines:[],
            number:1,
        }
    },
    created(){
        this.loadAddress();
    },
    computed:{
        // 映射info信息
        ...mapState("user",["info"]),
        
        options:function(){
            // 将address数据计算为一个新的数组返回
            return this.addresses.map(item=>{
                return{
                    text:item.province+" "+item.city+" "+item.area+
                    " "+item.address,
                    value:item.id
                }
            })
        }
    },
    methods:{
        loadAddress(){
            let id=this.info.id;
            let url="/address/findByCustomerId?id="+id;
            get(url).then((response)=>{
                // 将查询到的地址信息绑定到address这个变量中
                this.addresses=response.data;
                // 将查询到的地址列表中的第一个地址id赋值给form中addressId，表示默认地址
                this.addressId = this.addresses[0].id;
            })
        },
        submitHandler(){
            // 初始化订单项(将我们的产品放入购物车)
            let orderLine ={
                number:this.number,
                price:this.$route.query.price * this.number,
                productId:this.$route.query.id
            };
            this.orderLines.push(orderLine);
            let url="/order/save";
            let data = {
                customerId:this.info.id,
                addressId:this.addressId,
                orderLines:this.orderLines
            }
            if(data.addressId==""){
                Dialog.confirm({message: '请先添加地址'}).then(()=>{
                    this.$router.push("/manager/address_add")
                })
            }else{
                // console.log(data);
                post_obj_array(url,data).then((response)=>{
                    this.$toast("提交成功");
                    this.$router.push("/manager/order")
                })
            }
            
        },
        numberChangeHandler(value){
            this.number=value
        }
    }
}
</script>
<style scoped>
    .btn {
        width: 90%;
        margin: 1em auto;
        line-height: 3em;
        text-align: center;
        border: 1px solid #07C160;
        background: #07C160;
        color: #ffffff;
        border-radius: 1.5em;
    }
</style>