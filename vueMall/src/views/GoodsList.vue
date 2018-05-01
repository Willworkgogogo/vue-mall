<template>
  <div>
    <nav-header></nav-header>
    <div class="nav-breadcrumb-wrap">
      <div class="container">
        <nav class="nav-breadcrumb">
          <a href="/">Home</a>
          <span>Goods</span>
        </nav>
      </div>
    </div>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" :class="{'filterby-show': filterBy}" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur': priceChecked == 'all'}" @click="setPriceFilter('all')">All</a></dd>
              <dd v-for="(price, index) in range" :key="price.start">
                <a href="javascript:void(0)" :class="{'cur': priceChecked==index}" @click="setPriceFilter(index)">{{price.start}} - {{price.end}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in filterList" :key="item.id">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/'+item.img_url" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.name}}</div>
                    <div class="price">{{item.price}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overlayFlag" @click="closeFilterPop"></div>
    <nav-footer></nav-footer>
  </div>
</template>

<script type="text/ecmascript-6">
import NavHeader from 'components/Header'
import NavFooter from 'components/Footer'
import { getGoodsList } from '@/api/goods'
import { ERR_OK } from '@/api/config'

export default {
  components: { NavHeader, NavFooter },
  data() {
    return {
      list: [],
      filterList: [],
      range: [
        {
          start: 0,
          end: 1000
        },
        {
          start: 1001,
          end: 2000
        },
        {
          start: 2001,
          end: 3000
        }
      ],
      priceChecked: 'all',
      filterBy: false,
      overlayFlag: false
    }
  },
  created() {
    this.getGoods()
  },
  computed: {},
  methods: {
    getGoods() {
      getGoodsList()
        .then(res => {
          let data = res.data
          if (data.code === ERR_OK) {
            this.list = data.data
            this.filterList = data.data
          }
        })
        .catch(err => console.error(err))
    },
    setPriceFilter(index) {
      this.priceChecked = index
      let curRange = this.range[index]
      if (index === 'all') {
        this.filterList = this.list
      } else {
        this.filterList = this.list.filter(item => {
          return item.price >= curRange.start && item.price <= curRange.end
        })
      }
      this.closeFilterPop()
    },
    showFilterPop() {
      this.filterBy = this.overlayFlag = true
    },
    closeFilterPop() {
      this.filterBy = this.overlayFlag = false
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~assets/css/base";
  @import "~assets/css/product";
  @import "~assets/css/login";
</style>
