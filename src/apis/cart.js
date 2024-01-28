import httpInstance from '@/utils/http'

// 加入购物车
export const addCartAPI = ({ skuId, count }) => {
  return httpInstance({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count,
    },
  })
}

// 获取购物车数据
export const findCartListAPI = () => {
  return httpInstance({
    url: '/member/cart',
  })
}

// 删除购物车
export const delCartAPI = (ids) => {
  return httpInstance({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids,
    },
  })
}

// 合并本地和接口购物车数据
export const mergeCartAPI = (data) => {
  return httpInstance({
    url: '/member/cart/merge',
    method: 'POST',
    data,
  })
}
