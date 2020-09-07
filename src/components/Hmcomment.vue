<template>
  <div class="hm-comment">
    <div class="title">
      <div class="left">
        <img :src="$base+comment.user.head_img" alt="">
      </div>
      <div class="center">
        <p>{{comment.user.nickname}}</p>
        <p>{{comment.create_date | now}}</p>
      </div>
      <div class="right" @click="reply">回复</div>
    </div>
    <hm-floor
    @reply='onreply'
    :conut='getcount(0, comment)'
    :comment='comment.parent'
    v-if='comment.parent'>
    </hm-floor>
    <div class="content">{{comment.content}}</div>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object
  },
  methods: {
    getcount(num, data) {
      if (data.parent) {
        return this.getcount(num + 1, data.parent)
      } else {
        return num
      }
    },
    reply() {
      console.log(this.comment.id, this.comment.user.nickname)
      this.$emit('reply', this.comment.id, this.comment.user.nickname)
    },
    onreply(id, nickname) {
      this.$emit('reply', id, nickname)
    }
  }
}
</script>

<style lang='less' scoped>
.hm-comment {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .title {
    display: flex;
    .left {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .center {
      padding-left: 10px;
      flex: 1;
      font-size: 14px;
      p {
        line-height: 24px;
      }
    }
    .right {
      font-size: 14px;
      color: #666;
    }
  }
  .content {
    font-size: 18px;
  }
}
</style>
