<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <HomeProduct />
</template>

<script setup name="index">
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeProduct from './components/HomeProduct.vue'
import HomeCategory from './components/HomeCategory.vue'
</script>
