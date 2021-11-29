<!-- home -->
<template>
  <div class="index-container">
    <div class="top df">
      <div>评论({{ reviewNum }})</div>
      <div class="addReview" @click="addItem('review')">添加评论</div>
      <van-popup v-model="show" position="bottom" :style="{ height: '30%' }" class="popup">
        <van-field v-model="text" :placeholder="placeholder" class="field"> </van-field>
        <van-button size="small" type="info" @click="submit">发送</van-button>
      </van-popup>
    </div>
    <div v-for="(item, index) in data" :key="index" class="box-item">
      <div class="df">
        <img :src="item.img" class="img" />
        <div class="name_date">
          <div>{{item.name}}</div>
          <div>{{item.date}}</div>
        </div>
        <div class="icon_item">
          <van-icon name="good-job-o" size="22" :color="item.isLike ? '#ea6620' : '#333'" @click="setLike(item)"/>
          <span class="fs16 icon_good" :style="{color: item.isLike ? '#ea6620' : '#333'}">{{item.likeNum}}</span>
          <van-icon name="chat-o" size="22" @click="addItem('reply')"/>
        </div>
      </div>
      <div class="content">{{item.content}}</div>
      <div v-if="item.chilrenReply.length>0" class="container-reply">
        <div v-if="item.unfold">
          <div
            v-for="(child, index) in item.chilrenReply.slice(0,3)"
            :key="index"
            class="container-item"
            @click="replyUser(child,'replyUser')"
          >
              <span>{{child.name}} </span>
              <span style="color:#666262">
                {{child.content}}
              </span>
          </div>
          <span v-if="item.unfold" class="fold" @click="unfold(item)">展开全部{{item.chilrenReply.length}}条消息</span>
        </div>
        <div v-else>
          <div v-for="(child, index) in item.chilrenReply" :key="index" class="container-item" @click="replyUser(child,'replyUser')">
              <span>{{child.name}} </span>
              <span style="color:#666262">
                {{child.content}}
              </span>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import * as api from '../api/review'
// import Popup from '../components/Popup.vue'

export default {
  // components: {
  //   Popup
  // },
  data() {
    return {
      reviewNum: 0,
      show: false,
      text: '',
      data: [],
      isLike: false,
      likeNum: 0,
      type: '',
      placeholder: ''
    }
  },
  async mounted() {
    const res = await api.getReview()
    this.reviewNum = res.reviewNum
  },
  methods: {
    addItem(type) {
      this.show = true
      this.type = type
    },
    async addReview(val) {
      const res = await api.addReview()
      res.content = val
      if (res.chilrenReply.length > 3) res.unfold = true
      this.data.unshift(res)
      this.show = false
      this.text = ''
    },
    async addReply(val) {
        this.data[0]?.chilrenReply.unshift({
          name: 'six',
          content: val
        })
        this.show = false
        this.text = ''
    },
    async submit(val) {
      if (this.type === 'review') {
        const res = await api.addReview()
        res.content = this.text
        if (res.chilrenReply.length > 3) res.unfold = true
        this.data.unshift(res)
        this.show = false
        this.text = ''
        console.log(this.data)
      }
      if (this.type === 'reply') {
        this.data[0]?.chilrenReply.unshift({
          name: 'six',
          content: this.text
        })
        this.show = false
        this.text = ''
      }
      if (this.type === 'replyUser') {
        console.log(this.text)
        this.show = false
      }
    },
    setLike(val) {
      val.isLike = !val.isLike
      val.isLike ? val.likeNum++ : val.likeNum--
    },
    unfold(item) {
      item.unfold = false
    },
    replyUser(item, type) {
      this.show = true
      this.type = type
      this.placeholder = `回复 @${item.name}：`
      this.data[0].chilrenReply.push({
        name: `six 回复 @${item.name}：`,
        content: this.text
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "./css.scss";

.index-container {
  padding: 20px;
  .top {
    justify-content: space-between;
    height: 30px;
    font-size: 18px;
    font-weight: 700;
  }
  .addReview {
    font-size: 16px;
    font-weight: 400;
    color: rgb(0, 163, 228);
  }
  /deep/ .van-cell {
    width: 80%;
  }
  /deep/ .van-field__body {
    background-color: #eee;
    padding: 0 10px;
  }
  /deep/ .van-popup {
    display: flex;
    justify-content: center;
    align-items: baseline;
  }
  .img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .name_date {
    margin: 5px 10px;
  }
  .name_date:first-child {
    padding-bottom: 5px;
  }
  .content {
    margin: 10px 0 10px 50px;
    font-size: 16px;
  }
  .box-item {
    padding: 20px 0;
    border-bottom: 1px solid #eee;
  }
  .icon_item{
    display: flex;
    align-items: center;
    margin-left: auto;
    .icon_good {
      margin: 0 20px 0 5px;
    }
  }
  .container-reply {
    background-color: #eee;
    padding: 5px 10px 5px 10px;
    margin-left: 50px;
    font-size: 16px;
    .fold {
      color: royalblue;
    }
  }
  .container-item {
    padding-bottom: 10px;
  }
}
</style>
