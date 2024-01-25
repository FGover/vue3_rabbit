<template>
  <div class="home-product">
    <HomePanel v-for="item in goodsProduct" :key="item.id" :title="item.name">
      <div class="box">
        <RouterLink class="cover" to="/">
          <img v-img-lazy="item.picture" alt="" />
          <strong class="label">
            <span>{{ item.name }}馆</span>
            <span>{{ item.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for="i in item.goods" :key="i.id">
            <GoodsItem :goods="i" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script setup name="HomeProduct">
import { findGoodsAPI } from '@/apis/home'
import { ref, onMounted } from 'vue'
import HomePanel from './HomePanel.vue'
import GoodsItem from './GoodsItem.vue'

const goodsProduct = ref([])
const getGoods = async () => {
  const { result: res } = await findGoodsAPI()
  goodsProduct.value = res
}

onMounted(() => {
  getGoods()
})
</script>

<style lang="scss" scoped>
.home-product {
  background-color: #fff;
  margin-top: 20px;
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
