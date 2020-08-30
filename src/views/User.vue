<template>
  <div class="user">
    <div class="header">
      <div class="avatar"><img :src="base + user.head_img" alt="" /></div>
      <div class="info">
        <div class="name">
          <div>
            <span
              v-if="user.gender === 1"
              class="iconfont iconxingbienan"
            ></span>
            <span v-else class="iconfont iconxingbienv"></span>
            <span>{{ user.nickname }}</span>
          </div>
        </div>
        <div class="time">
          {{ user.create_date | item }}
        </div>
      </div>
      <div class="arrow">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navtem to="/follow">
      <template>我的关注</template>
      <template #content>关注的用户</template>
    </hm-navtem>
    <hm-navtem>
      <template>我的跟帖</template>
      <template #content>跟帖/回复</template>
    </hm-navtem>
    <hm-navtem>
      <template>我的收藏</template>
      <template #content>文章/视频</template>
    </hm-navtem>
    <hm-navtem to="/edit">
      <template>设置</template>
    </hm-navtem>
    <div style="margin:15px">
      <van-button type="danger" block @click="logout">退出登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  async created() {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('userid')
    const res = await this.$axios.get(`/user/${id}`, {
      headers: {
        Authorization: token
      }
    })
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
    } else if (statusCode === 401) {
      this.$toast('用户验证失败')
      this.$router.push('/login')
      localStorage.removeItem('token')
      localStorage.removeItem('userid')
    }
  },
  methods: {
    async logout() {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '亲，是否要退出'
        })
      } catch {
        return this.$toast('取消退出')
      }
      localStorage.removeItem('token')
      localStorage.removeItem('userid')
      this.$toast.success('退出成功')
      this.$router.push('/login')
    }
  },
  data() {
    return {
      user: ''
    }
  },
  computed: {
    base() {
      return this.$axios.defaults.baseURL
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  .header {
    display: flex;
    padding: 20px 10px;
    align-items: center;
    border-bottom: 4px solid #e4e4e4;
    .avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin-left: 10px;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .info {
      flex: 1;
      margin-left: 20px;
      font-size: 16px;
      .iconxingbienan {
        margin-right: 5px;
        color: #7bbcec;
      }
      .iconxingbienv {
        color: pink;
      }
      .time {
        margin-top: 8px;
        color: #a0a0ab;
      }
    }
    .arrow {
      margin-right: 5px;
      color: #d7d7d7;
    }

  }
}
</style>
