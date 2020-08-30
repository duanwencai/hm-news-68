<template>
  <div class="user-edit">
    <hm-header>编辑资料</hm-header>
     <div class="avatar">
      <img :src="base+user.head_img" alt="">
    </div>
    <hm-navtem @click='shownickname'>
      <template>
        昵称
      </template>
      <template #content>
        {{user.nickname}}
      </template>
    </hm-navtem>
    <hm-navtem @click='showpassword'>
      <template>
        密码
      </template>
      <template #content>
        ******
      </template>
    </hm-navtem>
    <hm-navtem @click='showgender'>
       <template>
        性别
      </template>
      <template #content>
        {{user.gender===1 ? '男' : '女'}}
      </template>
    </hm-navtem>
    <van-dialog v-model="isshownickname" title="标题" show-cancel-button @confirm='updatanickname'>
      <van-field v-model="nickname"  placeholder="请输入昵称" />
    </van-dialog>
    <van-dialog v-model="isshowpassword" title="修改密码" show-cancel-button @confirm='updatapassword'>
      <van-field v-model="password"  placeholder="请输入密码" />
    </van-dialog>
    <van-dialog v-model="isshowgender" title="修改性别" show-cancel-button @confirm='updatagender'>
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      user: '',
      isshownickname: false,
      nickname: '',
      isshowpassword: false,
      password: '',
      isshowgender: false,
      gender: ''
    }
  },
  computed: {
    base() {
      return this.$axios.defaults.baseURL
    }
  },
  created() {
    this.getUserinif()
  },
  methods: {
    async getUserinif() {
      const userid = localStorage.getItem('userid')
      const res = await this.$axios.get(`/user/${userid}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    },
    async updataUser(data) {
      const id = localStorage.getItem('userid')
      const res = await this.$axios.post(`/user_update/${id}`, data)
      if (res.data.statusCode === 200) {
        this.getUserinif()
        this.$toast.success('修改成功')
      }
    },
    shownickname() {
      this.isshownickname = true
      this.nickname = this.user.nickname
    },
    async updatanickname() {
      this.updataUser({
        nickname: this.nickname
      })
    },
    showpassword() {
      this.isshowpassword = true
      this.password = this.user.password
    },
    async updatapassword() {
      this.updataUser({
        password: this.password
      })
    },
    showgender() {
      this.isshowgender = true
      this.gender = this.user.gender
    },
    updatagender() {
      this.updataUser({
        gender: this.gender
      })
    }
  }
}
</script>

<style lang='less' scoped>
  .avatar {
  padding: 40px 0;
  text-align: center;
  img {
    width: 85px;
    height: 85px;
    border-radius: 50%;
  }
}
/deep/ .van-dialog__content{
    padding: 15px;
    .van-field{
      border: 1px solid #ccc;
    }
  }
</style>
