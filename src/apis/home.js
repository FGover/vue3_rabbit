import httpInstance from '@/utils/http'

// 获取banner
export const getBannerAPI = () => {
  return httpInstance({
    url: '/home/banner',
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