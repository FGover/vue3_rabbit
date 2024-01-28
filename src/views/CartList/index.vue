<template>
  <div class="xtx-cart-page">
    <div class="container">
      <div class="cart">
        <table>
          <!-- 表头 -->
          <thead>
            <!-- 一行 -->
            <tr>
              <th width="120">
                <el-checkbox :model-value="cartStore.isCheckAll" @change="allCheck" />
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 表体 -->
          <tbody>
            <tr v-for="item in cartStore.cartList" :key="item.skuId">
              <td>
                <el-checkbox :model-value="item.selected" @change="(selected) => singleCheck(item.skuId, selected)" />
              </td>
              <td>
                <div class="goods">
                  <RouterLink to="/">
                    <img :src="item.picture" alt="" />
                  </RouterLink>
                  <div class="name">{{ item.name }}</div>
                </div>
              </td>
              <td class="tc">
                <p>￥{{ item.price }}</p>
              </td>
              <td class="tc">
                <el-input-number v-model="item.count" :min="1" />
              </td>
              <td class="tc">
                <p class="price">￥{{ (item.price * item.count).toFixed(2) }}</p>
              </td>
              <td class="tc">
                <p>
                  <el-popconfirm title="确认删除吗？" @confirm="confirm(item.skuId)" @cancel="cancel" confirm-button-text="确认" cancel-button-text="取消">
                    <template #reference>
                      <a href="javascript:;">删除</a>
                    </template>
                  </el-popconfirm>
                </p>
              </td>
            </tr>
            <!-- 购物车没数据时 -->
            <tr v-if="cartStore.cartList.length === 0">
              <td colspan="6">
                <div class="cart-none">
                  <el-empty description="还没有加入购物车哦^_^">
                    <el-button type="primary">随便逛逛</el-button>
                  </el-empty>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- 操作栏 -->
        <div class="action">
          <div class="left">
            <div>共{{ cartStore.totalCount }}件商品，已选择{{ cartStore.selectedCount }}件，商品合计：</div>
            <div class="totalPrice">￥{{ cartStore.selectedTotalPrice.toFixed(2) }}</div>
          </div>
          <div class="right">
            <el-button size="large" type="primary">下单结算</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="CartList">
import { useCartStore } from '@/stores/cart'
import { ElMessage } from 'element-plus'
import { delCartAPI } from '@/apis/cart'

const cartStore = useCartStore()

const singleCheck = (skuId, selected) => {
  cartStore.singleCheck(skuId, selected)
}

const allCheck = (selected) => {
  cartStore.allCheck(selected)
}

const confirm = async (skuId) => {
  await delCartAPI([skuId])
  ElMessage.success('删除成功')
  cartStore.updateCartList()
}

const cancel = () => {
  ElMessage('已取消删除')
}
</script>

<style lang="scss" scoped>
.xtx-cart-page {
  margin-top: 20px;
  .cart {
    background: #fff;
    color: #666;
    table {
      // 移除单元格之间的间距，使表格紧凑显示
      border-spacing: 0;
      // 合并相邻的边框
      border-collapse: collapse;
      line-height: 24px;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
      .tc {
        text-align: center;
        a {
          color: $xtxColor;
        }
        .price {
          color: $priceColor;
          font-size: 16px;
        }
      }
      .goods {
        display: flex;
        align-items: center;
        img {
          width: 100px;
          height: 100px;
        }
        .name {
          margin-left: 10px;
        }
      }
    }
    .cart-none {
      text-align: center;
      padding: 120px 0;
      background: #fff;
    }
    .action {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      margin-top: 20px;
      height: 80px;
      font-size: 16px;
      padding: 0 30px;
      .left {
        display: flex;
        align-items: center;
        .totalPrice {
          color: $priceColor;
          font-size: 18px;
        }
      }
    }
  }
}
</style>
