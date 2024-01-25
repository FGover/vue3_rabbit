<template>
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
import { findHotAPI } from '@/apis/home'
import { ref, onMounted } from 'vue'

const hotList = ref([])
const getHotList = async () => {
  const { result: res } = await findHotAPI()
  hotList.value = res
}

onMounted(() => {
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
