<template>
  <div class="my-comment">
    <hm-header>我是跟帖</hm-header>
    <div class="item" v-for='item in commentlist' :key='item.id'>
      <div class="time">{{item.create_date | item('YYYY-MM-DD HH:mm:ss')}}</div>
      <div class="comment" v-if='item.parent'>
        <div class="name">回复：{{item.parent.user.nickname}}</div>
        <div class="comment_content">{{item.parent.content}}</div>
      </div>
      <div class="content">{{item.content}}</div>
      <div class="origin">
        <span class="one-txt-cut">原文：{{item.post.title}}</span>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in list" :key="item" :title="item" />
      </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentlist: [],
      list: [],
      loading: false,
      finished: false
    }
  },
  created() {
    this.getcommentlist()
  },
  methods: {
    async getcommentlist() {
      const res = await this.$axios.get('/user_comments')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentlist = data
      }
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    }
  }
}
</script>

<style lang='less' scoped>
  .item{
    border-bottom: 1px solid #ccc;
    padding: 10px 20px;
    .time{
      color: #666;
      padding: 10px 0;
    }
    .comment{
      background-color: #ddd;
      padding: 10px;
      .name{
        color:#666;
        font-size: 14px;
      }
      .comment_content{
        color: #999;
        line-height: 30px;
        margin-top: 10px;
      }
    }
    .content{
      margin: 10px 0;
    }
    .origin{
      font-size: 14px;
      color: #ccc;
      display: flex;
      justify-content: space-between;
      .one-txt-cut{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
</style>
