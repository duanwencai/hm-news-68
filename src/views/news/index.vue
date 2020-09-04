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
      <div class="user" @click='$router.push("/user")'>
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <!-- tap栏效果 -->
    <van-sticky class="more-sticky">
      <div class="more" @click="$router.push('/manage')">
        <span class="iconfont iconlianjie"></span>
      </div>
    </van-sticky>
    <van-tabs v-model="active"  sticky animated  swipeable  >
      <!-- tab栏 -->
      <van-tab :title="tab.name" v-for="tab in tablist" :key='tab.id' >
        <!-- 内容 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check='false'
            @load="onLoad"
          >
            <hm-post :post='item' v-for='item in newslist' :key='item.id'></hm-post>
          </van-list>
        </van-pull-refresh>
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
      pageSize: 5,
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  created() {
    this.gettablist()
  },
  methods: {
    async gettablist() {
      const activelist = JSON.parse(localStorage.getItem('activelist'))
      if (activelist) {
        this.tablist = activelist
        this.getnewlist(this.tablist[0].id)
        return
      }
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
        this.newslist = [...this.newslist, ...data]
        this.loading = false
        this.refreshing = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad() {
      setTimeout(() => {
        this.pageIndex++
        this.getnewlist(this.tablist[this.active].id)
      }, 500)
    },
    onRefresh() {
      this.newslist = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      setTimeout(() => {
        this.getnewlist(this.tablist[this.active].id)
      }, 500)
    }
  },
  watch: {
    active(value) {
      this.newslist = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      this.getnewlist(this.tablist[value].id)
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
/deep/ .van-tabs__wrap {
  width: 85%;
}
.more {
  width: 15%;
  height: 44px;
  position: absolute;
  right: 0;
  z-index: 999;
  background-color: #fff;
  text-align: center;
  line-height: 44px;
}
.more-sticky {
  /deep/ .van-sticky--fixed {
    z-index: 1000;
  }
}
</style>
