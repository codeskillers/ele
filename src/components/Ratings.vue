<template>
  <div class="bg">
    <div class="top">
      <div class="left">
        <h1>{{seller.score}}</h1>
        <div class="grades">综合评分</div>
        <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="right">
        <div class="attitude">
          服务态度
          <star class="stars" :size="36" :score="seller.serviceScore"></star>
          <p>{{seller.serviceScore}}</p>
        </div>
        <div class="shopGrade">
          商品评分
          <star class="stars" :size="36" :score="seller.foodScore"></star>
          <p>{{seller.foodScore}}</p>
        </div>
        <div class="arriveTime">
          送达时间
          <p>{{seller.deliveryTime}}分钟</p>
        </div>
      </div>
    </div>
    <div class="buttom">
      <div class="labels">
        <label class="all" :class="selectedAll" @click="allRatings">全部 {{ratings.length}}</label>
        <label class="nice" :class="selectedNice" @click="niceRatings">满意 {{nice}}</label>
        <label class="bad" :class="selectedBad" @click="badRatings">不满意 {{bad}}</label>
      </div>
      <div class="checkOnly">
        <div class="look">
          <img src="@/assets/check-selected.png" alt="" width="20" height="20" @click="onlyText">
          <p>只看有内容的评价</p>
        </div>
      </div>
      <div class="recommand">
        <div class="recommand-box" v-for="(item, index) in selectRatings" :key="index">
          <div class="left">
            <img class="img" :src="item.avatar" alt="">
          </div>
          <div class="right">
            <div class="username">{{item.username[0]}}******{{item.username[item.username.length-1]}}</div>
            <star :size="24" :score="item.score"></star>
            <!-- <text>{{item.deliveryTime}}</text> -->
            <span class="deliveryTime" v-show="item.deliveryTime">{{item.deliveryTime}}</span>
            <div class="description">{{item.text}}</div>
            <div class="foodsRecommand">
              <div class="recommend-labels" v-for="(food, index) in item.recommend" 
              :key="index" v-show="item.recommend.length">{{food}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import star from '@/components/star/star'
export default {
  name: 'Ratings',
  data () {
    return {
      ratings: [],
      nice: 0,
      bad: 0,
      selectRatings: [],
      selectedAll: 'active',
      selectedNice: '',
      selectedBad: '',
      checkImg: ["@/assets/check-selected.png", "@/assets/check.png"],
      checkImage: "@/assets/check-selected.png",
      unCheckImage: "@/assets/check.png",
    }
  },
  methods: {
    onlyText() {
      this.checkImage = "@/assets/check-selected.png"
      let result = []
      for(var i=0;i<this.ratings.length;i++) {
        if(this.ratings[i].text){ 
          result.push(this.ratings[i])
        }
      }
      this.selectRatings = result
      return this.selectRatings
    },
    allRatings () {
      this.selectRatings = this.ratings
      this.selectedAll = 'active'
      this.selectedNice = ''
      this.selectedBad = ''
      return this.selectRatings
    },
    niceRatings () {
      this.selectedAll = ''
      this.selectedNice = 'active'
      this.selectedBad = ''
      let result = []
      for(var i=0;i<this.ratings.length;i++){
        // if(this.selectRatings[i].rateType === 1){
        //   this.selectRatings.splice(i,1)
        // }
         if (this.ratings[i].rateType === 0) {
           result.push(this.ratings[i])
         }
      }
      this.selectRatings = result
      return this.selectRatings
    },
    badRatings () {
      this.selectedAll = ''
      this.selectedNice = ''
      this.selectedBad = 'active'
      let result = []
      for(var i=0;i<this.ratings.length;i++){
        // if(this.selectRatings[i].rateType === 0){
        //   this.selectRatings.splice(i,1)
        // }
        if (this.ratings[i].rateType === 1) {
           result.push(this.ratings[i])
         }
      }
      this.selectRatings = result
      return this.selectRatings
    },
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star
  },
  created () {
    this.$http.get('https://www.easy-mock.com/mock/5ca4960eea0dc52bf3b67fe5/hbz/rating')
    .then(res => {
      console.log(res.data.data)
      if(res.data.errno === 0){
        this.ratings = res.data.data
        this.selectRatings = res.data.data
        console.log(this.ratings)
        this.$nextTick( () => {  // 保证html渲染
          // this._initScroll()
        })
        this.ratings.forEach( item => {
          if(item.rateType === 0){
            this.nice += 1
         } else {
            this.bad += 1
         }
        })
      }
    })
  },
}
</script>

<style lang="stylus" scoped>
.bg
  background-color #f1f4f6
  .top
    display flex
    width 100%
    background-color #ffffff
    border-bottom 1px solid #dcdcdd
    .left
      flex 0 0 136px
      height 90px
      text-align center
      border-right 1px solid #e7e7e7
      margin-bottom 18px
      margin-top 30px
      h1
        color #ff9907
      .grades
        color #2b3031
        margin-top 10px
      .rankRate
        color #999da3
        font-size 13px
        margin-top 10px
    .right
      flex 1
      margin-top 30px
      margin-left 20px
      .attitude
        color #151a1b
        .stars
          display inline-block
          margin-left 4px
        p
          display inline-block
          color #ff9005
      .shopGrade
        color #151a1b
        margin-top 14px
        .stars
          display inline-block
          margin-left 4px
        p
          display inline-block
          color #ff9005
      .arriveTime
        color #151a1b
        margin-top 14px
        p
          display inline-block
          color #a4a4a4
  .buttom
    background-color #ffffff
    width 100%
    margin-top 20px
    position relative
    border-top 1px solid #dcdcdd
    .labels
      // display inline-block
      display table-cell
      width 100%
      height 68px
      // align-items center 
      vertical-align middle
      .all
        width 70px
        height 32px
        // background-color #0196e5
        background-color #d9dcdc
        padding 10px
        margin-left 16px
        color #ffffff
        &.active
          background-color #0196e5
      .nice
        width 70px
        height 32px
        background-color #cdeafa
        padding 10px
        margin-left 10px
        &.active
          background-color #0196e5
      .bad
        width 70px
        height 32px
        background-color #d9dcdc
        padding 10px
        margin-left 10px
        &.active
          background-color #0196e5
    .checkOnly
      display block 
      width 100%
      height 50px
      border-bottom 1px solid #dcdcdd
      border-top 1px solid #dcdcdd
      .look
        margin-left 20px
        position relative
        top 50%
        transform translateY(-50%)
        align-items center
        // vertical-align middle
        img 
          vertical-align middle
        p
          display inline-block
          text-align center
          font-size 14px
          color #8d9195
          vertical-align middle
    .recommand
      width 100%
      .recommand-box
        display flex
        width 100%
        // height 158px
        border-top 1px solid #dcdcdd
        border-bottom 1px solid #dcdcdd
        padding-bottom 10px
        position relative
        .left
          flex 0 0 60px
          text-align center
          .img 
            border-radius 50%
            margin-top 20px
            width 30px
            height 30px
        .right
          flex 1
          .username
            margin-top 20px
          .deliveryTime
            display inline-block
            position absolute
            left 130px
            top 35px
            font-size 14px
            color #97999e
          .description
            margin-top 10px
          .foodsRecommand
            display table-cell
            // display inline-block
            vertical-align middle
            .recommend-labels
              display inline-block
              height 18px
              padding 2px
              margin-left 12px
              margin-top 6px
              border 1px solid #e7e7e8
              background-color #fafdfc
              color #b1b5b9
            // &:first-child:before
            //   content ''
            //   // background url('@/assets/zan.png')
            //   background-image url('@/assets/zan.png')
            //   height 18px
            //   width 18px
            //   background-size contain


</style>
