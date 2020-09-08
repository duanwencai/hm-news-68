<template>
  <div class="search">
    <div class="header">
      <div class="left" @click="ht">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <input
          type="text"
          placeholder="请输入搜索关键字"
          v-model="key"
          @input="recommend"
        />
        <span class="iconfont iconsearch"></span>
      </div>
      <div class="right" @click="search">搜索</div>
    </div>
    <div class="recomend-list" v-if="recommendlist.length">
      <div
        class="item one-txt-cut"
        v-for="item in recommendlist"
        :key="item.id"
        @click="goSearch(item.title)"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="list" v-else-if="list.length">
      <hm-post v-for="item in list" :key="item.id" :post="item"></hm-post>
    </div>
    <div class="content" v-else>
      <div class="history">
        <h3>历史记录</h3>
        <div class="list">
          <div
            class="item"
            v-for="item in history"
            :key="item"
            @click="goSearch(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <hr />
      <div class="hot">
        <h3>热门搜索</h3>
        <div class="list">
          <div
            class="item"
            v-for="item in hot"
            :key="item"
            @click="goSearch(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      list: [],
      key: '',
      history: [],
      hot: [],
      recommendlist: []
    }
  },
  created() {
    this.history = JSON.parse(localStorage.getItem('history')) || []
    this.hot = ['关晓彤', '华为', '清火']
  },
  methods: {
    ht() {
      if (this.key) {
        this.key = ''
      } else {
        this.$router.back()
      }
    },
    async search() {
      if (this.key === '') return this.$toast('请输入搜索关键字')
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.key
        }
      })
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        this.history = this.history.filter(item => {
          return item !== this.key
        })
        this.history.unshift(this.key)
        localStorage.setItem('history', JSON.stringify(this.history))
        this.recommendlist = []
      }
    },
    goSearch(item) {
      this.key = item
      this.search()
    },
    recommend: _.debounce(async function() {
      if (this.key === '') return
      const res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.key
        }
      })
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.recommendlist = data
      }
    }, 1000)
  },
  watch: {
    key(value) {
      if (value === '') {
        this.list = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .center {
    flex: 1;
    padding: 0 10px;
    position: relative;
    input {
      width: 100%;
      height: 34px;
      border-radius: 17px;
      // border: 1px solid #ccc;
      font-size: 14px;
      padding-left: 30px;
    }
    .iconfont {
      position: absolute;
      left: 22px;
      top: 10px;
    }
  }
  .right {
    font-size: 14px;
  }
}
.content {
  padding: 10px;
  .history {
    margin-bottom: 10px;
  }
  h3 {
    font-size: 14px;
    margin: 10px 0;
  }
  .list {
    overflow: hidden;
  }
  .item {
    float: left;
    width: 60px;
    height: 30px;
    // border: 1px solid #ccc;
    // background-color: #ddd;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    margin: 5px;
  }
}
.recomend-list {
  padding: 0 10px;
  .item {
    border-bottom: 1px solid #ccc;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
  }
}
</style>
