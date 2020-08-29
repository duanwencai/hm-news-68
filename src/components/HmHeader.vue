<template>
  <div class="hm-header">
      <div class="back" @click="back">
          <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="title"><slot></slot></div>
      <div class="extra">
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
.hm-header {
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  line-height: 50px;
  text-align: center;

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
