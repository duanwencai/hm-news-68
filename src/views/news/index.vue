<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <div class="search-box">
          <span class="iconfont iconsearch"></span>
          <span>搜索新闻</span>
        </div>
      </div>
      <div class="user">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <!-- tap栏效果 -->
    <van-tabs v-model="active"  sticky animated  swipeable @click='switchover'  >
      <!-- tab栏 -->
      <van-tab :title="tab.name" v-for="tab in tablist" :key='tab.id' >
        <!-- 内容 -->
        <hm-post :post='item' v-for='item in newslist' :key='item.id'></hm-post>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tablist: [],
      newslist: [],
      active: 0,
      pageIndex: 1,
      pageSize: 20
    }
  },
  created() {
    this.gettablist()
  },
  methods: {
    async gettablist() {
      const res = await this.$axios.get('/category')
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tablist = data
        this.getnewlist(this.tablist[0].id)
      }
    },
    async getnewlist(id) {
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      // console.log(data)
      if (statusCode === 200) {
        this.newslist = data
      }
    },
    switchover(name, title) {
      console.log(name, title)
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  display: flex;
  height: 50px;
  background-color: #ff0000;
  line-height: 50px;
  text-align: center;
  color: #fff;
  .logo,
  .user {
    width: 70px;
  }
  .logo {
    span {
      font-size: 50px;
    }
  }
  .search {
    flex: 1;
    .search-box {
      height: 34px;
      line-height: 34px;
      background-color: rgba(255,255,255,.5);
      margin-top: 8px;
      border-radius: 17px;
      font-size: 14px;
      span:first-child {
        margin-right: 5px;
      }
    }
  }
}
</style>
