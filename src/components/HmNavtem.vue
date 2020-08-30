<template>
  <div class="hm-navtem" @click='clickFn'>
    <div class="title"><slot></slot></div>
    <div class="content"><slot name='content'></slot></div>
    <div class="arrow"><span class="iconfont iconjiantou1"></span></div>
  </div>
</template>

<script>
export default {
  methods: {
    clickFn() {
      if (this.to) {
        this.$router.push(this.to)
      }
      if (this.too) {
        this.$router.push(this.to)
      }
    }
  },
  props: {
    to: String,
    too: String
  }
}
</script>

<style lang='less' scoped>
.hm-navtem{
  display: flex;
  height: 50px;
  line-height: 50px;
  margin-left: 15px;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
  .title{
    flex: 1;
  }
  .content{
    font-size: 14px;
    color: #666;
  }
  .arrow{
    padding-right: 15px;
    color: #666;
  }
}
</style>
