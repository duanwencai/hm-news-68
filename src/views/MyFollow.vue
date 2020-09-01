<template>
  <div class="myfollow">
    <hm-header>我的关注</hm-header>
    <div class="nec" v-for='item in list' :key='item.id'>
       <div class="left"><img :src="$base + item.head_img" alt=""></div>
      <div class="center">
        <div class="title">{{item.nickname}}</div>
        <div class="time">{{item.create_date | item }}</div>
      </div>
      <van-button type="primary" round size="mini" @click='cancel(item.id)'>取消关注</van-button>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []

    }
  },
  created() {
    this.isall()
  },
  methods: {
    async cancel(id) {
      try {
        await this.dialog.confirm({
          title: '标题',
          message: '弹窗内容'
        })
      } catch {
        return this.toast('取消操作')
      }
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      if (res.data.statusCode === 200) {
        this.isall()
      }
    },
    async isall() {
      const res = await this.$axios.get('/user_follows')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    }

  }
}
</script>

<style lang='less' scoped>
.nec{
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #ccc;
  align-items: center;
  .left{
    img{
      width: 35px;
      height: 35px;
      border-radius: 50%;

    }
  }
  .center{
    flex: 1;
    font-size: 16px;
    margin-left: 10px;
    .time{
      font-size: 14px;
      color: #666;
    }
  }
}
</style>
