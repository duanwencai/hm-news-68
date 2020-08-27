<template>
  <div>
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <van-form @submit="login">
      <van-field
        v-model="username"
        label="用户名"
        placeholder="用户名 / 手机号码"
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
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          {
            pattern: /^\d{5,11}/,
            message: '用户长度是5-11位数字',
            trigger: 'onChange'
          }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'onChange' },
          {
            pattern: /^\d{3,9}/,
            message: '密码长度是3-9位数字',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  methods: {
    async login() {
      const res = await axios.post('http://127.0.0.1:3000/login', {
        username: this.username,
        password: this.password
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push('/user')
      } else {
        this.$toast.fail('登录失败')
      }
    }
  }
}
</script>

<style lang="less"></style>
