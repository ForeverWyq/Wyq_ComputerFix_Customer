<template>
    <div> 
        <wyq-fulllayout title="新增地址">
            <div class="address" >
                <!-- 地址列表 -->
                <div class="add">
                    <van-cell-group>
                        <van-field v-model="telephone" label="联系方式：" />
                        <van-field v-model="province" label="省份" />
                        <van-field v-model="city" label="城市：" />
                        <van-field v-model="area" label="区域：" />
                        <van-field v-model="address" label="具体位置：" />
                    </van-cell-group>
                </div>
                <!-- /地址列表 -->
                <!-- 新增地址 -->
                <div class="btn" @click="backListHandler()">确定</div>
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
            customerId:'',
            telephone:'',
            province:'',
            city:'',
            area:'',
            address:'',
        }
    },
    computed: {
        ...mapState('user',['info'])
    },
    created() {
        this.customerId = this.info.id,
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
                customerId:this.info.id,
                telephone:this.telephone,
                province:this.province,
                city:this.city,
                area:this.area,
                address:this.address
            }
            this.SaveOrUpdateAddress(form).then(()=>{
                this.$router.go(-1)
            })
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
.address{
    padding-top: 50px;
}
</style>