<template>
  <div>
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <van-form @submit="login">
      <van-field
        v-model="user.username"
        label="用户名"
        placeholder="用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="user.password"
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
    <p class="leave">没有账号去<router-link to='/register'>注册</router-link></p>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data() {
    return {
      user: {
        username: '',
        passwprd: ''
      },
      rules: {
        username: [{ required: true, message: '请填写用户名', trigger: 'onChange' },
          {
            pattern: /^\d{3,6}$/,
            message: '请填写用户名3至6位',
            trigger: 'onChange'
          }],
        password: [{ required: true, message: '请填写密码', trigger: 'onChange' },
          {
            pattern: /^\d{3,6}$/,
            message: '请填写密码名3至6位',
            trigger: 'onChange'
          }]
      }
    }
  },
  methods: {
    async login() {
      const res = await this.$axios.post('/login', this.user)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$router.push('/user')
        this.$toast.success(message)
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less">
.leave{
  text-align: right;
  font-size: 16px;
  padding: 15px;
  a{
    color:red
  }
}
</style>
