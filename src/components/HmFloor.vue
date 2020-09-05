<template>
  <div>
    <hm-floor :comment='comment.parent' v-if="comment.parent"></hm-floor>
      <div class="hm-floor" :class="{bt: !comment.parent}">
        <div class="title">
          <div class="left">{{comment.user.nickname}}</div>
          <div class="center">{{comment.create_date | now}}</div>
          <div class="right">回复</div>
        </div>
      <div class="content">{{comment.content}}</div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'hm-floor',
  props: {
    comment: Object
  }
}
</script>

<style lang='less' scoped>
.hm-floor.bt {
  border-top: 1px solid red;
}
.hm-floor {
  border: 1px solid red;
  border-top: none;
  border-collapse: separate;
  padding: 10px;
  .title {
    display: flex;
    font-size: 14px;
    .center {
      flex: 1;
      font-size: 12px;
      color: #666;
      padding-left: 10px;
    }
  }
  .content {
    margin-top: 10px;
    font-size: 14px;
  }
}
</style>
