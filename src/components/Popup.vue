<template>
  <div>
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }" class="popup">
      <van-field v-model="text" class="field"> </van-field>
      <van-button size="small" type="info" @click="submit">发送</van-button>
    </van-popup>
  </div>
</template>
<script>
export default {
  name: 'Popup',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      text: ''
    }
  },
  methods: {
    sumbit(value) {
      this.$emit('submit', this.text)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
