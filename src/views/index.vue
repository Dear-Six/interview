<!-- home -->
<template>
  <div class="index-container">
    <div class="top df">
      <div>评论({{ reviewNum }})</div>
      <div class="addReview" @click="addItem('review')">添加评论</div>
      <van-popup v-model="show" position="bottom" :style="{ height: '30%' }" class="popup">
        <van-field v-model="text" class="field"> </van-field>
        <van-button size="small" type="info" @click="sumbit">发送</van-button>
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
    </div>
  </div>
</template>

<script>
import * as api from '../api/review'
export default {
  data() {
    return {
      reviewNum: 0,
      show: false,
      text: '',
      data: [],
      isLike: false,
      likeNum: 0,
      type: ''
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
    async sumbit() {
      if (this.type === 'review') {
        const res = await api.addReview()
        res.content = this.text
        this.data.unshift(res)
        this.show = false
        this.text = ''
        console.log(res)
      }
      if (this.type === 'reply') {
        console.log(this.text)
      }
    },
    setLike(val) {
      val.isLike = !val.isLike
      val.isLike ? val.likeNum++ : val.likeNum--
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
    background-color: #ccc;
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
    margin-left: 50px;
    margin-top: 10px;
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
}
</style>
