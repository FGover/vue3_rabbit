<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <RouterLink to="/" class="goods-item" v-for="item in hotList" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name">{{ item.name }}</p>
      <p class="desc">{{ item.desc }}</p>
      <p class="price">￥{{ item.price }}</p>
    </RouterLink>
  </div>
</template>

<script setup name="DetailHot">
import { getHotGoodsAPI } from '@/apis/detail'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const data = defineProps({
  title: {
    type: String,
  },
  type: {
    type: Number,
  },
})

const route = useRoute()
const hotList = ref([])
const getHotList = async () => {
  const { result: res } = await getHotGoodsAPI({
    id: route.params.id,
    type: data.type,
  })
  hotList.value = res
}

onMounted(() => {
  getHotList()
})
</script>

<style lang="scss" scoped>
.goods-hot {
  width: 320px;
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 20px;
    line-height: 70px;
    text-align: center;
    margin-bottom: 10px;
    margin-left: 20px;
    font-weight: normal;
  }
  .goods-item {
    margin-left: 20px;
    display: block;
    padding: 20px 30px;
    text-align: center;
    background-color: #fff;
    transition: all 0.5s;
    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
    }
    img {
      width: 160px;
      height: 160px;
    }
    p {
      padding-top: 10px;
    }
    .name {
      font-size: 16px;
    }
    .desc {
      color: #999;
      height: 40px;
    }
    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>
