<template>
    <div>
        <!-- 顶部导航栏 -->
        <wyq-fulllayout title="编辑地址">
            <div class="address_edit" >
                <div class="edit">
                    <!-- {{$route.query}} -->
                    <van-cell-group>
                        <van-field v-model="telephone" label="联系方式：" />
                        <van-field v-model="province" label="省份" />
                        <van-field v-model="city" label="城市：" />
                        <van-field v-model="area" label="区域：" />
                        <van-field v-model="address" label="具体位置：" />
                    </van-cell-group>
                </div>
                <!-- 编辑地址 -->
                <!-- <van-button 
                    @click="backListHandler()" 
                    size="large" 
                    type="warning">确定</van-button> -->
                <div class="btn" @click="backListHandler()">保存</div>
                <!-- /编辑地址 -->
            </div>
        </wyq-fulllayout>
        <!-- /顶部导航栏 -->
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
    data() {
        return{
            customerId:'',
            telephone:'',
            province:'',
            city:'',
            area:'',
            address:'',
        }
    },
    computed: {
        ...mapState('address',['conformAddresses'])
    },
    created() {
        // 利用this.$router.query获取参数
        this.customerId = this.$route.query.customerId,
        this.telephone = this.$route.query.telephone
        this.province = this.$route.query.province
        this.city = this.$route.query.city
        this.area = this.$route.query.area
        this.address = this.$route.query.address
    },
    methods: {
        ...mapActions('address',['findAllAddresses','SaveOrUpdateAddress']),
        // 回到地址列表页面
        backListHandler(){
            let form = {
                id:this.$route.query.id,
                customerId:this.customerId,
                telephone:this.telephone,
                province:this.province,
                city:this.city,
                area:this.area,
                address:this.address
            }
            this.$router.go(-1)    
            this.SaveOrUpdateAddress(form)
        }
       
    }
}
</script>

<style scoped>
.van-col .one{
    border-bottom: 1px solid #ccc;
    padding:1em
}
.address_edit{
    padding-top: 50px;
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
}
</style>