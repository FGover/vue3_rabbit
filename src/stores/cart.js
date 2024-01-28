import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user'
import { addCartAPI, findCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartList = ref([])
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)

    // 添加购物车
    const addCart = async (goods) => {
      const { skuId, count } = goods
      if (isLogin.value) {
        // 登录状态，调用后端接口
        await addCartAPI({ skuId, count })
        updateCartList()
      } else {
        // 通过 skuId 是否相同来判断该商品是否添加过购物车
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
          item.count += goods.count
        } else {
          cartList.value.push(goods)
        }
      }
    }

    // 删除购物车
    const delCart = async (skuId) => {
      if (isLogin.value) {
        // 登录状态，调用后端接口
        await delCartAPI([skuId])
        updateCartList()
      } else {
        const index = cartList.value.findIndex((item) => skuId === item.skuId)
        cartList.value.splice(index, 1)
      }
    }

    // 获取最新购物车列表
    const updateCartList = async () => {
      const { result: res } = await findCartListAPI()
      cartList.value = res
    }

    // 清除购物车
    const clearCart = () => {
      cartList.value = []
    }

    // 单选功能
    const singleCheck = (skuId, selected) => {
      const item = cartList.value.find((item) => skuId === item.skuId)
      item.selected = selected
    }

    // 全选功能
    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected))
    }

    // 计算属性
    // 总数量
    const totalCount = computed(() => {
      return cartList.value.reduce((accumulator, currentValue) => accumulator + currentValue.count, 0)
    })
    // 总价格
    const totalPrice = computed(() => {
      return cartList.value.reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.count, 0)
    })
    // 是否全选
    const isCheckAll = computed(() => {
      // 检查每个是否为true，every方法返回一个布尔值
      return cartList.value.every((item) => item.selected === true)
    })
    // 已选中个数
    const selectedCount = computed(() => {
      let count = 0
      const arr = cartList.value.filter((item) => item.selected === true)
      arr.forEach((item) => (count = count + item.count))
      return count
    })
    // 已选中的总价格
    const selectedTotalPrice = computed(() => {
      // 1.我写的方法
      // let price = 0
      // const arr = cartList.value.filter((item) => item.selected === true)
      // arr.forEach((item) => (price = price + item.price * item.count))
      // return price
      // 2. 链式调用
      return cartList.value.filter((item) => item.selected === true).reduce((accumulator, currentValue) => accumulator + currentValue.price * currentValue.count, 0)
    })

    return { cartList, totalCount, totalPrice, isCheckAll, selectedCount, selectedTotalPrice, addCart, delCart, clearCart, updateCartList, singleCheck, allCheck }
  },
  { persist: true }
)
