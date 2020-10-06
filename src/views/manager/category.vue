<template>
    <div class="product">
        <wyq-fulllayout title="产品列表">
            <div class="content">
                <div class="top">
                    栏目：{{$route.query.name}}
                </div>     
                <wyq-product-item style="background: #f5f5f5;"
                @click="toBuyHandler(p)"
                v-for="p in products"
                :key="p.id" :data="p">
                </wyq-product-item>
            </div>
        </wyq-fulllayout>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import {get, post} from '../../http/axios';
export default {
    data() {
        return{
            categoryId:'',
            products:[]
        }
    },
    computed: {
        ...mapState("user",["info"]),
    },
    created() {
        this.categoryId = this.$route.query.id;
        // 查询产品
        this.loadProducts();
    },
    methods: {
        // 加载产品信息
        loadProducts(){
            let url = "/product/findByCategoryId"
            let params = {
                id: this.$route.query.id
            }
            get(url,params).then((response)=>{
                this.products=response.data;
            })
        },
        // 购买产品
        toBuyHandler(p){
            this.$router.push({
                path:"/manager/order_confirm",
                query:p
            })
        }
    }
}
</script>

<style scoped>
.top{
    margin: 10px 0 10px 20px;
    font-size: 15px;
}
.content{
    padding-top: 50px;
    background: #fff;
}
</style>