import { getCategoryAPI } from '@/apis/category'
import { ref, onMounted, watch } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

export function useCategory() {
  const categoryData = ref({})
  const route = useRoute()
  const getCategory = async (id = route.params.id) => {
    const { result: res } = await getCategoryAPI(id)
    categoryData.value = res
  }

  onMounted(() => {
    getCategory()
  })

  // 可以通过路由钩子监听路由变化
  // onBeforeRouteUpdate((to) => {
  //   getCategory(to.params.id)
  // })

  // 用watch监听路由变化
  watch(
    () => route.params,
    (newVal) => {
      getCategory(newVal.id)
    }
  )
  return {
    categoryData,
  }
}
