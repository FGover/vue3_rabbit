<template>
  <div>
    <LayoutFixed />
    <LayoutNav />
    <LayoutHeader />
    <!-- 添加key 破坏复用机制 强制销毁组件 -->
    <!-- <RouterView :key="$route.fullPath"/> -->
    <RouterView />
    <LayoutFooter />
  </div>
</template>

<script setup>
import LayoutFixed from './components/LayoutFixed.vue'
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import { useCategoryStore } from '@/stores/catagory'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()
onMounted(() => {
  categoryStore.getCategory()
})
</script>
