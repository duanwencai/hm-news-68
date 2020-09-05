<template>
  <div class="post-detail">
    <div class="header">
      <div class="left" @click='$router.back()'>
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="right">
        <div class="followed" v-if="post.has_follow" @click='followed'>已关注</div>
        <div class="follow" v-else  @click='follow'>关注</div>
      </div>
    </div>
    <div class="content">
      <div class="title">{{post.title}}</div>
      <div class="name">
        <span v-if="post.user">{{post.user.nickname}}</span>
        <span>{{post.create_data | item}}</span>
      </div>
      <div class="info" v-if="post.type===1" v-html="post.content"></div>
      <video v-else :src="geturl(post.content)" controls  autoplay muted></video>
      <div class="butttons">
        <div class="good" :class="{active:post.has_like}" @click='good'>
          <span class="iconfont icondianzan"></span>
          <span>{{post.like_length || 0}}</span>
        </div>
        <div class="share">
          <span class="iconfont iconweixin"></span>
          <span>微信</span>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="search">
        <input type="text" placeholder="回复">
      </div>
      <span class="iconfont iconpinglun-"><i>20</i></span>
      <span class="iconfont iconshoucang" :class="{now:post.has_star}" @click="stra"></span>
      <span class="iconfont iconfenxiang"></span>
    </div>
    <!-- 评论 -->
    <div class="comment-list">
      <h3>精彩跟帖</h3>
      <hm-comment :comment="comment" v-for="comment in commentlist" :key='comment.id'></hm-comment>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {},
      commentlist: {}
    }
  },
  created() {
    this.getinfo()
    this.getcommentlist()
  },
  methods: {
    async getcommentlist() {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentlist = data
        console.log(this.commentlist)
      }
    },
    async getinfo() {
      const res = await this.$axios.get(`/post/${this.$route.params.id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        console.log(data)
        this.post = data
      }
    },
    geturl(url) {
      const div = document.createElement('div')
      div.innerHTML = url
      return div.innerText
    },
    async follow() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        return
      }
      const res = await this.$axios.get(`/user_follows/${this.post.user.id}`)
      if (res.data.statusCode === 200) {
        this.$toast.success('关注成功')
        this.getinfo()
      }
    },
    async followed() {
      const res = await this.$axios.get(`/user_unfollow/${this.post.user.id}`)
      if (res.data.statusCode === 200) {
        this.$toast.success('取消成功')
        this.getinfo()
      }
    },
    async good() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        return
      }
      const res = await this.$axios.get(`/post_like/${this.post.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getinfo()
      }
    },
    async stra() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
      }
      const res = await this.$axios.get(`/post_star/${this.post.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getinfo()
      }
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  display: flex;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  height: 50px;
  align-items: center;
  .left {
    span {
      line-height: 50px;
    }
  }
  .center {
    margin-left: 10px;
    flex: 1;
    span {
      font-size: 50px;
    }
  }
  .right {
    font-size: 14px;
    div {
      width: 60px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 15px;
    }
    .followed {
      border: 1px solid #cccd;
    }
    .follow {
      color: #fff;
      background-color: #f00;
    }
  }
}
.content {
  padding: 10px;
  border-bottom: 3px solid #ccc;
  .title {
    font-weight: 700;
    font-size: 16px;
  }
  .name {
    margin-top: 5px;
    font-size: 12px;
    color: #666;
    span {
      margin-right: 15px;
    }
  }
  .info {
    margin-top: 20px;
    font-size: 14px;
      /deep/ img {
      width: 100%;
    }
  }
  video {
    width: 100%;
  }
  .butttons {
    padding: 20px 0;
    display: flex;
    justify-content: space-around;
    > div {
      width: 120px;
      height: 40px;
      line-height: 40px;
      border-radius: 20px;
      border: 1px solid #ccc;
      text-align: center;
    }
    .iconfont {
      margin-right: 10px;
    }
    .share {
      .iconfont {
        color: #00C800;
      }
    }
    .active {
      border: 1px solid red;
      color: red;
    }
  }
}
.comment-list {
  h3 {
    text-align: center;
    padding: 10px 0;
  }
}
.footer {
  width: 100%;
  height: 50px;
  display: flex;
  border-top: 1px solid #ccc;
  position: fixed;
  bottom: 0;
  align-items: center;
  justify-content: space-around;
  padding: 0 10px;
  background-color: #fff;
  .iconfont {
    font-size: 24px;
  }
  .now {
    color: red;
  }
  .iconpinglun- {
    position: relative;
    i {
      position: absolute;
      right: 0;
      top: 0;
      background-color: red;
      font-size: 10px;
      color: #fff;
      padding: 0 3px;
      right: -5px;
      border-radius: 5px;
      font-style: normal;
    }
  }
  .search {
    width: 180px;
    padding-right: 10px;
    input {
      height: 30px;
      background-color: #ddd;
      border-radius: 15px;
      width: 100%;
      border: none;
      font-size: 14px;
      padding-left: 20px;
    }
  }
}
</style>
