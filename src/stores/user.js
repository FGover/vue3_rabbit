import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user'
import { mergeCartAPI } from '@/apis/cart'
import { ref } from 'vue'
import { useCartStore } from './cart'

export const useUserStore = defineStore(
  'user',
  () => {
    const cartStore = useCartStore()
    const userInfo = ref({})
    // 获取用户信息
    const getUserInfo = async ({ account, password }) => {
      const { result: res } = await loginAPI({ account, password })
      userInfo.value = res
      // 合并购物车
      await mergeCartAPI(
        // 返回新的数组
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            count: item.count,
            selected: item.selected,
          }
        })
      )
      cartStore.updateCartList()
    }

    // 退出登录清除用户信息
    const clearUserInfo = () => {
      userInfo.value = {}
      cartStore.clearCart()
    }
    return { userInfo, getUserInfo, clearUserInfo }
  },
  { persist: true }
)
