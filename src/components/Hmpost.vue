<template>
  <div hm-post>
    <div class="single-img-post" v-if='post.cover.length < 3'>
      <div class="item">
        <div class="info">
          <div class="title">{{post.title}}</div>
          <div class="user">
            <span>{{post.user.nickname}}</span>
            <span>{{post.comment_length}}跟帖</span>
          </div>
        </div>
        <div class="img">
          <img :src="$url(post.cover[0].url)" alt="">
        </div>
      </div>
    </div>
    <div class="mulitiple-img-post" v-else>
      <div class="title">{{post.title}}</div>
      <div class="imgs">
        <img :src="$url(post.cover[0].url)" alt="">
        <img :src="$url(post.cover[1].url)" alt="">
        <img :src="$url(post.cover[2].url)" alt="">
      </div>
      <div class="user">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>

<style lang='less' scoped>
.single-img-post{
  .item{
    border-bottom: 1px solid #ccc;
    padding: 10px;
    display: flex;
    .info{
      flex: 1;
      font-size: 16px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .user{
        color:#666;
        font-size: 14px;
        span {
          margin-right: 15px;
        }
      }
    }
    .img{
      img{
        width: 120px;
        height: 74px;
        object-fit: cover;
      }
    }
  }
}
.mulitiple-img-post{
  border-bottom: 1px solid #ccc;
  padding: 10px;
  .title {
    font-size:16px;
  }
  .imgs {
    display: flex;
    justify-content: space-between;
    img {
      width: 112px;
      height: 74px;
    }
  }
}
</style>
