<template>
  <div class="cart">
    <a href="javascript:;" class="curr">
      <i class="iconfont icon-cart"></i>
      <div class="num">{{ cartStore.cartList.length }}</div>
    </a>
    <div class="layer">
      <div class="list">
        <div class="item" v-for="item in cartStore.cartList" :key="cartStore.cartList.skuId">
          <RouterLink to="">
            <img :src="item.picture" alt="" />
            <div class="center">
              <p class="name">{{ item.name }}</p>
              <p class="attr">{{ item.attrsText }}</p>
            </div>
            <div class="right">
              <p class="price">￥{{ item.price }}</p>
              <p class="count">x{{ item.count }}</p>
            </div>
          </RouterLink>
          <i class="iconfont icon-close-new" @click="cartStore.delCart(item.skuId)"></i>
        </div>
      </div>
      <div class="foot">
        <div class="total">
          <p>共{{ cartStore.totalCount }}件商品</p>
          <p>￥{{ cartStore.totalPrice.toFixed(2) }}</p>
        </div>
        <el-button size="large" type="primary" @click="$router.push('/cartlist')">去购物车结算</el-button>
      </div>
    </div>
  </div>
</template>

<script setup name="HeaderCart">
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { onMounted } from 'vue'

const cartStore = useCartStore()
const userStore = useUserStore()

onMounted(() => {
  if (userStore.userInfo.token) {
    cartStore.updateCartList()
  }
})
</script>

<style lang="scss" scoped>
.cart {
  width: 50px;
  position: relative;
  z-index: 600;
  .curr {
    height: 32px;
    line-height: 32px;
    text-align: center;
    position: relative;
    display: block;
    .icon-cart {
      font-size: 22px;
    }
    .num {
      position: absolute;
      right: 0;
      top: 0;
      width: 20px;
      height: 20px;
      line-height: 20px;
      background: $helpColor;
      color: #fff;
      font-size: 12px;
      border-radius: 12px;
    }
  }
  &:hover {
    .layer {
      opacity: 1;
      transform: none;
    }
  }
  .layer {
    opacity: 0;
    transform: translateY(-200px) scale(1, 0);
    transition: all 0.4s 0.2s;
    width: 400px;
    height: 450px;
    position: absolute;
    top: 50px;
    right: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    background: #fff;
    border-radius: 4px;
    padding-top: 10px;
    &::before {
      content: '';
      position: absolute;
      right: 14px;
      top: -10px;
      width: 20px;
      height: 20px;
      background: #fff;
      transform: scale(0.6, 1) rotate(45deg);
      box-shadow: -3px -3px 5px rgba(0, 0, 0, 0.1);
    }
    .list {
      height: 400px;
      padding: 0 10px;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }
      &::-webkit-scrollbar-track {
        background: #f8f8f8;
        border-radius: 2px;
      }
      &::-webkit-scrollbar-thumb {
        background: #eee;
        border-radius: 10px;
      }
      &::-webkit-scrollbar-thumb:hover {
        background: #ccc;
      }
      .item {
        border-bottom: 1px solid #f5f5f5;
        padding: 10px 0;
        position: relative;
        i {
          position: absolute;
          bottom: 38px;
          right: 0;
          opacity: 0;
          color: #666;
          transition: all 0.5s;
        }
        &:hover {
          i {
            opacity: 1;
            cursor: pointer;
          }
        }
        a {
          display: flex;
          align-items: center;
          img {
            width: 80px;
            height: 80px;
          }
          .center {
            padding: 0 10px;
            width: 200px;
            .name {
              font-size: 16px;
            }
            .attr {
              color: #999;
              padding-top: 5px;
            }
          }
          .right {
            width: 100px;
            padding-right: 20px;
            text-align: center;
            .price {
              font-size: 16px;
              color: $priceColor;
            }
            .count {
              color: #999;
              margin-top: 5px;
              font-size: 16px;
            }
          }
        }
      }
    }
    .foot {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 70px;
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      background: #f8f8f8;
      align-items: center;
      .total {
        padding-left: 10px;
        color: #999;

        p {
          &:last-child {
            font-size: 18px;
            color: $priceColor;
          }
        }
      }
    }
  }
}
</style>
