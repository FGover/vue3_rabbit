<template>
  <div>
    <div class="top-category">
      <div class="container">
        <!-- 面包屑 -->
        <div class="bread-container">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 轮播图 -->
        <div class="home-banner">
          <el-carousel height="500px">
            <el-carousel-item v-for="item in bannerList" :key="item.id">
              <img :src="item.imgUrl" alt="" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- 分类数据 -->
        <div class="sub-list">
          <h3>全部分类</h3>
          <ul>
            <li v-for="item in categoryData.children" :key="item.id">
              <RouterLink :to="`/category/sub/${item.id}`">
                <img v-img-lazy="item.picture" alt="" />
                <p>{{ item.name }}</p>
              </RouterLink>
            </li>
          </ul>
        </div>
        <!-- 商品 -->
        <div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
          <div class="head">
            <h3>- {{ item.name }} -</h3>
          </div>
          <div class="body">
            <GoodsItem :goods="good" v-for="good in item.goods" :key="good.id" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="index">
import GoodsItem from '@/views/Home/components/GoodsItem.vue'
import { useBanner } from '@/hooks/useBanner'
import { useCategory } from '@/hooks/useCategory'

const { bannerList } = useBanner()
const { categoryData } = useCategory()
</script>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
}
.home-banner {
  width: 1240px;
  height: 500px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 500px;
  }
}
.sub-list {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
  h3 {
    font-size: 22px;
    font-weight: normal;
    margin-bottom: 20px;
    text-align: center;
  }
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    li {
      flex: 1;
      transition: all 0.5s;
      padding: 20px 0;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
      a {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgb(0, 0, 0, 20%);
      }
      img {
        width: 120px;
        height: 120px;
      }
      p {
        font-size: 16px;
        padding-top: 10px;
        text-align: center;
      }
    }
  }
}
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;
  h3 {
    font-size: 22px;
    font-weight: normal;
    margin-bottom: 20px;
    padding: 20px;
    text-align: center;
  }
  .body {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
