<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup name="HomeBanner">
import { getBannerAPI } from '@/apis/home'
import { ref, onMounted } from 'vue'
const bannerList = ref([])
const getBanner = async () => {
  const {result: res} = await getBannerAPI()
  bannerList.value = res
}

onMounted(() => {
  getBanner()
})
</script>

<style lang="scss" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  z-index: 98;
  position: absolute;
  left: 0;
  top: 0;
  img {
    width: 100%;
    height: 500px;
  }
}
</style>