import { getBannerAPI } from '@/apis/home'
import { ref, onMounted } from 'vue'

export function useBanner() {
  const bannerList = ref([])
  const getBanner = async () => {
    const { result: res } = await getBannerAPI({
      distributionSite: '2',
    })
    bannerList.value = res
  }
  onMounted(() => {
    getBanner()
  })

  return { bannerList }
}
