<template>
  <div class="my-comment">
    <hm-header>我是跟帖</hm-header>
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          offset="10"
          :immediate-check="false"
          @load="onLoad"
        >
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
        </van-list>
      </van-pull-refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commentlist: [],
      pageIndex: 1,
      pageSize: 6,
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  created() {
    this.getcommentlist()
  },
  methods: {
    async getcommentlist() {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        // this.commentlist = data
        this.commentlist = [...this.commentlist, ...data]
        this.loading = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad() {
      setTimeout(() => {
        this.pageIndex++
        this.getcommentlist()
      }, 500)
    },
    onRefresh() {
      setTimeout(() => {
        this.commentlist = []
        this.loading = true
        this.finished = false
        this.pageIndex = 1
        this.refreshing = false
        this.getcommentlist()
      }, 500)
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
