<template>
  <div class="user-edit">
    <hm-header>编辑资料</hm-header>
    <div class="avatar">
      <img :src="$base + user.head_img" alt="" />
      <van-uploader :after-read="afterRead" />
    </div>
    <hm-navtem @click="shownickname">
      <template>
        昵称
      </template>
      <template #content>
        {{ user.nickname }}
      </template>
    </hm-navtem>
    <hm-navtem @click="showpassword">
      <template>
        密码
      </template>
      <template #content>
        ******
      </template>
    </hm-navtem>
    <hm-navtem @click="showgender">
      <template>
        性别
      </template>
      <template #content>
        {{ user.gender === 1 ? '男' : '女' }}
      </template>
    </hm-navtem>
    <van-dialog
      v-model="isshownickname"
      title="标题"
      show-cancel-button
      @confirm="updatanickname"
    >
      <van-field v-model="nickname" ref="nickname" placeholder="请输入昵称" />
    </van-dialog>
    <van-dialog
      v-model="isshowpassword"
      title="修改密码"
      show-cancel-button
      @confirm="updatapassword"
    >
      <van-field v-model="password" ref="password" placeholder="请输入密码" />
    </van-dialog>
    <van-dialog
      v-model="isshowgender"
      title="修改性别"
      show-cancel-button
      @confirm="updatagender"
    >
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
    <div class="mask" v-show="isshowmask">
      <van-button type="primary" class="crop" @click="crop">裁剪</van-button>
      <van-button type="danger" class="cancel" @click="isshowmask = false"
        >取消</van-button
      >
      <VueCropper
        :img="img"
        ref="aa"
        autoCrop
        autoCropWidth="100"
        autoCropHeight="100"
        fixed
      ></VueCropper>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  data() {
    return {
      user: '',
      isshownickname: false,
      nickname: '',
      isshowpassword: false,
      password: '',
      isshowgender: false,
      gender: '',
      isshowmask: false,
      img: ''
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
    async shownickname() {
      this.isshownickname = true
      this.nickname = this.user.nickname
      await this.$nextTick()
      this.$refs.nickname.focus()
    },
    async updatanickname() {
      this.updataUser({
        nickname: this.nickname
      })
    },
    async showpassword() {
      this.isshowpassword = true
      this.password = this.user.password
      await this.$nextTick()
      this.$refs.password.focus()
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
    },
    isimg(name) {
      if (
        name.endsWith('.gif') ||
        name.endsWith('.jpg') ||
        name.endsWith('.png') ||
        name.endsWith('.jpeg')
      ) {
        return true
      } else {
        return false
      }
    },
    async afterRead(file) {
      if (!this.isimg(file.file.name)) {
        return this.$toast.fail('请上传图片')
      }
      if (file.file.size >= 30 * 1024) {
        return this.$toast.fail('上传图片太大')
      }
      this.isshowmask = true
      this.img = file.content
    },
    crop() {
      this.$refs.aa.getCropBlob(async blob => {
        const fd = new FormData()
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.updataUser({
            head_img: data.url
          })
        }
        this.isshowmask = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  position: relative;
  padding: 40px 0;
  text-align: center;
  img {
    width: 85px;
    height: 85px;
    border-radius: 50%;
  }
  .van-uploader {
    position: absolute;
    left: 50%;
    top: 40px;
    transform: translateX(-50%);
    opacity: 0;
  }
}
/deep/ .van-dialog__content {
  padding: 15px;
  .van-field {
    border: 1px solid #ccc;
  }
}
.mask {
  width: 100%;
  height: 100%;
  z-index: 999;
  position: fixed;
  left: 0;
  top: 0;
  .crop,
  .cancel {
    position: fixed;
    top: 0;
    z-index: 1;
  }
  .cancel {
    right: 0;
  }
  .vue-cropper {
    background-color: #000;
    background-image: url('');
  }
}
</style>
