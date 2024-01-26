import httpInstance from '@/utils/http'

// 获取banner
export const getBannerAPI = (params = {}) => {
  const { distributionSite = '1' } = params
  return httpInstance({
    url: '/home/banner',
    params: {
      distributionSite
    }
  })
}

// 获取新鲜好物
export const findNewAPI = () => {
  return httpInstance({
    url: '/home/new',
  })
}

// 获取人气推荐
export const findHotAPI = () => {
  return httpInstance({
    url: '/home/hot',
  })
}

// 获取所有商品模块
export const findGoodsAPI = () => {
  return httpInstance({
    url: '/home/goods',
  })
}
