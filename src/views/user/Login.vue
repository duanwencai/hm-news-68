<template>
  <div>
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <van-form @submit="login">
      <van-field
        v-model="username"
        label="用户名"
        placeholder="用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <p class="leave">
      没有账号去<router-link to="/register">注册</router-link>
    </p>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  created() {
    if (this.$route.params.username === undefined) {
      return
    }

    const { username, password } = this.$route.params
    this.username = username
    this.password = password
    // const { username, password } = this.$route.params
    // this.user.username = username
    // this.user.password = password
    // console.log(username, password)
  },
  data() {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          {
            pattern: /^\d{3,6}$/,
            message: '请填写用户名3至6位',
            trigger: 'onChange'
          }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'onChange' },
          {
            pattern: /^\d{3,6}$/,
            message: '请填写密码名3至6位',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  methods: {
    async login() {
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        localStorage.setItem('token', data.token)
        localStorage.setItem('userid', data.user.id)
        if (this.$route.query.back) {
          this.$router.back()
        } else {
          this.$router.push('/user')
        }
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.leave {
  text-align: right;
  font-size: 16px;
  padding: 15px;
  a {
    color: red;
  }
}
</style>
