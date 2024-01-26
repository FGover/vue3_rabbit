<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/sub/${categoryData.parentId}` }">居家 </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs>
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
    </div>
    <!-- 商品列表 -->
    <div class="body"></div>
  </div>
</template>

<script setup name="index">
import { getCategoryFilterAPI } from '@/apis/category'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const categoryData = ref({})
const route = useRoute()
const getCategoryData = async () => {
  const { result: res } = await getCategoryFilterAPI(route.params.id)
  categoryData.value = res
}
onMounted(() => {
  getCategoryData()
})
</script>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}
.sub-container {
  padding: 20px 10px;
  background-color: #fff;
}
</style>
