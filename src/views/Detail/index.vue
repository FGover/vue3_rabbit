<template>
  <div class="xtx-goods-page">
    <div class="container" v-if="goods.categories">
      <!-- 
        错误原因：goods可能一开始为空，访问深层属性会undefined
        解决方法：使用v-if判断goods.属性是否存在，如果存在再访问深层属性
        或者 ：用可选链操作符 ?. 访问深层属性
       -->
      <div class="bread-container">
        <!-- 面包屑 -->
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/${goods.categories[1].id}` }">{{ goods.categories[1].name }}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/sub/${goods.categories[0].id}` }">{{ goods.categories[0].name }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ goods.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 商品信息 -->
      <div class="info-container">
        <div class="goods-info">
          <div class="media">
            <!-- 图片预览区 -->
            <ImageView :imgList="goods.mainPictures" />
            <!-- 统计数量 -->
            <ul class="goods-sales">
              <li>
                <p>销量人气</p>
                <p>{{ goods.salesCount }}</p>
                <p><i class="iconfont icon-task-filling"></i>销量人气</p>
              </li>
              <li>
                <p>商品评价</p>
                <p>{{ goods.commentCount }}</p>
                <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
              </li>
              <li>
                <p>收藏人气</p>
                <p>{{ goods.collectCount }}</p>
                <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
              </li>
              <li>
                <p>品牌信息</p>
                <p>{{ goods.brand.name }}</p>
                <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
              </li>
            </ul>
          </div>
          <!-- 商品信息区 -->
          <div class="spec">
            <p class="g-name">{{ goods.name }}</p>
            <p class="g-desc">{{ goods.desc }}</p>
            <p class="g-price">
              <span>{{ goods.price }}</span>
              <span>{{ goods.oldPrice }}</span>
            </p>
            <div class="g-service">
              <dl>
                <dt>促销</dt>
                <dd>2月好物放送，App领券购买直降120元</dd>
              </dl>
              <dl>
                <dt>服务</dt>
                <dd>
                  <span>无忧退货</span>
                  <span>快速退款</span>
                  <span>免费包邮</span>
                  <a href="javascript:;">了解详情</a>
                </dd>
              </dl>
            </div>
            <!-- sku组件 -->
            <!-- 数据组件 -->
            <!-- 按钮组件 -->
            <div>
              <el-button size="large" type="primary" class="btn">加入购物车</el-button>
            </div>
          </div>
        </div>
        <div class="goods-footer">
          <div class="goods-article">
            <!-- 商品详情 -->
            <div class="goods-tabs">
              <nav><a>商品详情</a></nav>
              <div class="goods-detail">
                <ul>
                  <li v-for="item in goods.details.properties" :key="item.value">
                    <span class="dt">{{ item.name }}</span>
                    <span class="dd">{{ item.value }}</span>
                  </li>
                </ul>
                <!-- 图片 -->
                <img v-for="img in goods.details.pictures" :key="img" :src="img" alt="" />
              </div>
            </div>
          </div>
          <!-- 24热榜 + 专题推荐 -->
          <div class="goods-aside">
            <!-- 24小时 -->
            <DetailHot :type="1" title="24小时热榜" />
            <!-- 周榜推荐 -->
            <DetailHot :type="2" title="周热榜" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="Detail">
import DetailHot from './components/DetailHot.vue'
import ImageView from '@/components/imageView/index.vue'
import { getDetailAPI } from '@/apis/detail'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const goods = ref({})
const getGoods = async () => {
  const { result: res } = await getDetailAPI(route.params.id)
  goods.value = res
}

onMounted(() => {
  getGoods()
})
</script>

<style lang="scss" scoped>
.xtx-goods-page {
  .bread-container {
    padding: 25px 0;
  }
  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;
    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
      .goods-sales {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 400px;
        height: 140px;
        padding: 0 10px;
        li {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          padding: 0 5px;
          ~ li::after {
            height: 60px;
            border-left: 1px solid #e4e4e4;
            content: '';
            position: absolute;
            top: 10px;
            left: 0;
          }
          p {
            &:first-child {
              color: #999;
            }
            &:nth-child(2) {
              color: $priceColor;
              margin-top: 10px;
            }
            &:last-child {
              color: #666;
              margin-top: 10px;
            }
          }
          i {
            color: $xtxColor;
            font-size: 14px;
            margin-right: 2px;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
      .g-name {
        font-size: 22px;
      }
      .g-desc {
        color: #999;
        margin-top: 10px;
      }
      .g-price {
        margin-top: 10px;
        span {
          &::before {
            content: '¥';
            font-size: 14px;
          }
          &:first-child {
            color: $priceColor;
            margin-right: 10px;
            font-size: 22px;
          }
          &:last-child {
            color: #999;
            text-decoration: line-through;
            font-size: 14px;
          }
        }
      }
      .g-service {
        background-color: #f5f5f5;
        width: 500px;
        padding: 20px 10px 0 10px;
        margin-top: 10px;
        dl {
          padding-bottom: 20px;
          display: flex;
          align-items: center;
          dt {
            width: 50px;
            color: #999;
          }
          dd {
            color: #666;
            &:last-child {
              span {
                margin-right: 10px;
                &::before {
                  content: '•';
                  color: $xtxColor;
                  margin-right: 2px;
                }
              }
              a {
                color: $xtxColor;
              }
            }
          }
        }
      }
      .btn {
        margin-top: 20px;
      }
    }
  }
  .goods-footer {
    margin-top: 20px;
    display: flex;
    .goods-article {
      width: 920px;
      .goods-tabs {
        min-height: 600px;
        background-color: #fff;
        padding: 40px;
        a {
          font-size: 20px;
          color: #666;
        }
        .goods-detail ul {
          border-top: 1px solid #ccc;
          margin-top: 40px;
          padding: 40px 0;
          display: flex;
          flex-wrap: wrap;
          li {
            display: flex;
            margin-bottom: 10px;
            width: 50%;
            .dt {
              width: 100px;
              color: #999;
            }
            .dd {
              flex: 1;
              color: #666;
            }
          }
          img {
            width: 100%;
          }
        }
      }
    }
    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }
}
</style>
