<template>
  <div class="home">
    <van-nav-bar class="headtitle" title="主页"/>
    <!-- 头部图片 -->
    <header class="header">
      <img src="../../assets/home.jpg" alt="">
    </header>
    <!-- 内容区域 -->
    <div>
      <!-- 分类6个 -->
      <van-grid :column-num="3">
        <van-grid-item
          @click="toProductHandler(value)"
          v-for="value in categories"
          :key="value.id"
          :icon="value.icon"
          :text="value.name"/>
        </van-grid>
      <!-- 产品n个 -->
       <wyq-product-item
       @click="toBuyHandler(p)"
       v-for="p in products"
       :key="p.id" :data="p">
       </wyq-product-item>
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant';
import {get, post} from '../../http/axios';
export default {
  data(){
    return {
      categories:[],
      products:[]
    }
  },
  created(){
    // 查询栏目信息
    this.loadCategories();
    // 查询产品
    this.loadProducts();
  },
  methods:{
    // 加载栏目信息
    loadCategories(){
      let url = "category/findAll";
      get(url).then((response)=>{
        // 将查询出的前六个显示
        this.categories = response.data.slice(0,6);
      })
    },
    // 加载产品信息
    loadProducts(){
      let url = "/product/query"
      let params = {
        page:0,
        pageSize:30
      }
      post(url,params).then((response)=>{
        this.products=response.data.list;
      })
    },
    // 栏目区域 页面跳转至商品分类，各个产品
    toProductHandler(value){
      if(value.id!=9414){
        this.$router.push({
          path:'/manager/product_list',
          query: value
        })
      }else{
        Dialog({ message: "敬请期待" })
      }
      
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
.home {
  padding-bottom: 50px;
}
.headtitle{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
.header {
  margin-top: 46px;
  height: 260px;
  overflow: hidden;
}
.header img {
  width: 100%;
}
</style>