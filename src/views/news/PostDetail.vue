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
        <div class="followed" v-if="false">已关注</div>
        <div class="follow" v-else>关注</div>
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
        <div class="good">
          <span class="iconfont icondianzan"></span>
          <span>112</span>
        </div>
        <div class="share">
          <span class="iconfont iconweixin"></span>
          <span>微信</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {}
    }
  },
  created() {
    this.getinfo()
  },
  methods: {
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
  }
}
</style>
