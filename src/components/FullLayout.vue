<template>
  <div class="full_layout">
    <van-nav-bar
    class="bar"
      :border="true"
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="backHandler" />
    <slot />
  </div>
</template>
<script>
export default {
  props:['title'],
  methods:{
     backHandler(){
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.full_layout {
  z-index: 2;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #ffffff;
}
.bar{
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1000;
}
</style>