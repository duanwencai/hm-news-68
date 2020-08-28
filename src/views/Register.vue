<template>
  <div>
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>
    <van-form @submit="register">
      <van-field
        v-model="user.username"
        label="用户名"
        placeholder="用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="user.nickname"
        label="昵称"
        placeholder="昵称"
        :rules="rules.nickname"
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
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  methods: {
    async register() {
      const res = await this.$axios.post('/register', this.user)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.toast.success(message)
        this.router.push('/login')
      } else {
        this.toast.fail(message)
      }
    }
  },
  data() {
    return {
      user: {
        username: '',
        passwprd: '',
        nickname: ''
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
          }],
        nickname: [{ required: true, message: '请填写昵称', trigger: 'onChange' }, {
          pattern: /^[\u4e00-\u9fa5]{3,6}$/,
          message: '请填写昵称名3至6位',
          trigger: 'onChange'
        }]
      }
    }
  }
}
</script>

<style></style>
