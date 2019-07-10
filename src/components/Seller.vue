<template>
  <div class="bg">
    <div class="sellerInfo">
      <div class="sellerInfo-top">
        <div class="sellerInfo-top_left">
          <star :size="24" :score="seller.score"></star>
          <div class="description">(seller.ratingCount)  月售{{seller.sellCount}}单</div>
        </div>
        <div class="sellerInfo-top_right">
          <img src="" alt="">
          <p>收藏</p>
        </div>
      </div>
      <div class="sellerInfo-buttom">
        <div class="minPrice"></div>
        <div class="deliveryPrice"></div>
        <div class="deliveryTime"></div>
      </div>
    </div>
    <div class="activies">
      <h3>公告与活动</h3>
      <div class="text">

      </div>
      <div class="activities-item" v-for="(item, index) in seller.support" :key="index">
        <img src="" alt="">
        <div class="title"></div>
      </div>
    </div>
  </div>
</template>

<script>
import star from './star/star'
export default {
  name: 'seller',
  data () {
    return {

    }
  },
  components: {
    star
  },
  methods: {

  },
  props: {
    seller: {
      type: Object
    },
  },
}
</script>

<style scoped>

</style>
