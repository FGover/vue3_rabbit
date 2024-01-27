import httpInstance from '@/utils/http'

export const getDetailAPI = (id) => {
  return httpInstance({
    url: '/goods',
    params: {
      id,
    },
  })
}

export const getHotGoodsAPI = ({id, type, limit = 10}) =>{
  return httpInstance({
    url: '/goods/hot',
    params: {
      id,
      type,
      limit
    }
  })
}