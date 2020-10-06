<template>
    <div> 
        <wyq-fulllayout title="地址列表">
            <div class="address" >
                <!-- 地址列表 -->
                <div class="list">
                    <wyq-address-item v-for="address in conformAddresses" :key="address.id" :data="address"></wyq-address-item>
                </div>
                <!-- /地址列表 -->
                <div class="addressnull" v-if="conformAddresses.length==0">
                    <van-empty description="您还没有地址，赶快去添加地址吧！" />
                </div>
                <!-- 新增地址 -->
                <div class="btn" @click="addAddressHandler()">新增地址</div>
                <!-- /新增地址 -->
            </div>
        </wyq-fulllayout>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    data() {
        return{
            
        }
    },
    computed: {
        ...mapState('address',['conformAddresses'])
    },
    created() {
        this.findAllAddresses();
    },
    methods: {
        ...mapActions('address',['findAllAddresses']),
        // 新增地址
        addAddressHandler(){
            this.$router.push({path:'/manager/address_add'})
        }
    }
}
</script>

<style scoped>
    .address {
        padding-top: 50px;
        background-color: #fff;
        padding-bottom: .2em;
    }
    .btn {
        width: 90%;
        margin: 1em auto;
        line-height: 3em;
        text-align: center;
        border: 1px solid #f00;
        background: #f00;
        color: #ffffff;
        border-radius: 1.5em;
        position: fixed;
        left: 5%;
        bottom: 0;
        z-index: 1000;
    }
</style>