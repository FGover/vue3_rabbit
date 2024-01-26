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
      <el-tabs type="card" v-model="data.sortField" @tab-change="handleTab">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <!-- 商品列表 -->
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <GoodsItem class="good-item" v-for="good in goodList" :key="good.id" :goods="good"></GoodsItem>
      </div>
    </div>
  </div>
</template>

<script setup name="index">
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import GoodsItem from '../Home/components/GoodsItem.vue'

const route = useRoute()
const categoryData = ref({})
const goodList = ref([])
const data = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime',
})
const disabled = ref(false)

const getCategoryData = async () => {
  const { result: res } = await getCategoryFilterAPI(route.params.id)
  categoryData.value = res
}
const getGoodList = async () => {
  const { result: res } = await getSubCategoryAPI(data.value)
  goodList.value = res.items
}

const handleTab = () => {
  data.value.page = 1
  getGoodList()
  disabled.value = false
}

// 无限滚动加载
const load = async() => {
  data.value.page++
  const { result: res } = await getSubCategoryAPI(data.value)
  goodList.value.push(...res.items)
  // 也可以直接拼接
  // goodList.value = [...goodList.value, ...res.items]
  // 判断数据加载完毕停止监听
  if (res.items.length === 0) {
    disabled.value = true
  }
}

onMounted(() => {
  getCategoryData()
  getGoodList()
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
  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    .good-item {
      width: 232px;
      height: 299.4px;
      margin-right: 10px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
