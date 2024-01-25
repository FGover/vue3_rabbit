<template>
  <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <ul class="goods-list">
      <li v-for="item in newList" :key="item">
        <RouterLink to="/">
          <img v-img-lazy="item.picture" alt="" />
          <p class="name">{{ item.name }}</p>
          <p class="price">￥{{ item.price }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <ul class="goods-list">
      <li v-for="item in hotList" :key="item">
        <RouterLink to="/">
          <img v-img-lazy="item.picture" alt="" />
          <p class="title">{{ item.title }}</p>
          <p class="alt">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
</template>

<script setup name="HomeNew">
import HomePanel from './HomePanel.vue'
import { findNewAPI, findHotAPI } from '@/apis/home'
import { ref, onMounted } from 'vue'

const newList = ref([])
const hotList = ref([])
const getNewList = async () => {
  const { result: res } = await findNewAPI()
  newList.value = res
}
const getHotList = async () => {
  const { result: res } = await findHotAPI()
  hotList.value = res
}

onMounted(() => {
  getNewList()
  getHotList()
})
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    transition: all 0.5s;
    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0, 0, 0, 20%);
    }
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .price {
      color: $priceColor;
    }
    .title {
      font-size: 18px;
    }
    .alt {
      color: #999;
      font-size: 14px;
    }
  }
}
</style>
