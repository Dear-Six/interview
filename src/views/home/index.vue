<!-- home -->
<template>
  <div class="index-container">
    <div class="review">评论({{reviewNum}})</div>
  </div>
</template>

<script>
import { getReview } from '../../api/user'
export default {
  data() {
    return {
      reviewNum: 0
    }
  },
  mounted() {
    console.log(getReview())
    getReview().then(res => {
      console.log(res)
    })
  }

}
</script>
<style lang="scss" scoped>
.index-container {
  padding: 20px;
  .review {
    height: 30px;
    font-size: 19px;
    font-weight: 700;
  }
}
</style>
