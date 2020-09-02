<template>
  <div>
    <div class="placehoder"></div>
    <div class="hm-header">
        <div class="back" @click="back">
            <span class="iconfont iconjiantou2"></span>
        </div>
        <div class="title"><slot></slot></div>
        <div class="extra">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='less' scoped>
.placehoder{

  height: 50px;
  width: 100%;
}
.hm-header {
  position: fixed;
  width: 100%;
  top: 0;
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  line-height: 50px;
  text-align: center;
  z-index: 999;
  background-color: #FFFFFF;
  .back,
  .extra{
      width: 50px;
  }
  .title{
      flex: 1;
      font-weight: 500;
      font-size: 18px;
  }
}
</style>
