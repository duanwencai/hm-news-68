<template>
  <div class="manage">
    <hm-header>栏目管理</hm-header>
    <div class="content">
      <div class="active">
        <h3>点击删除以下频道</h3>
        <div class="list">
          <div class="item" v-for="item in activelist" :key='item.id' @click="delteb(item.id)">{{item.name}}</div>
        </div>
      </div>
      <div class="deactive">
        <h3>点击添加以下频道</h3>
        <div class="list">
          <div class="item" v-for="item in deactivelist" :key='item.id' @click="addteb(item.id)" >{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activelist: [],
      deactivelist: []
    }
  },
  async created() {
    const activelist = JSON.parse(localStorage.getItem('activelist'))
    const deactivelist = JSON.parse(localStorage.getItem('deactivelist'))
    if (activelist) {
      this.activelist = activelist
      this.deactivelist = deactivelist
      return
    }
    const res = await this.$axios.get('/category')
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.activelist = data
    }
  },
  methods: {
    delteb(id) {
      if (this.activelist.length <= 4) return
      const index = this.activelist.findIndex(item => {
        return item.id === id
      })
      this.deactivelist.push(this.activelist[index])
      this.activelist.splice(index, 1)
    },
    addteb(id) {
      const index = this.deactivelist.findIndex(item => {
        return item.id === id
      })
      this.activelist.push(this.deactivelist[index])
      this.deactivelist.splice(index, 1)
    }
  },
  watch: {
    activelist: {
      deep: true,
      handler(value) {
        localStorage.setItem('activelist', JSON.stringify(value))
        localStorage.setItem('deactivelist', JSON.stringify(this.deactivelist))
      }
    }
  }
}
</script>

<style lang='less' scoped>
.content {
  padding: 10px;
  .active,
  .deactive {
    h3 {
      font-size: 14px;
      font-weight: 400;
      margin: 10px 0;
    }
    .list {
      overflow: hidden;
      .item {
        width: 60px;
        height: 30px;
        border: 1px solid #ccc;
        background-color: #eee;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        float: left;
        margin: 5px;
      }
    }
  }
}
</style>
