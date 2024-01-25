import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/latyout'

export const useCategoryStore = defineStore('category', () => {
  // state数据
  const categoryList = ref([])

  // action方法
  const getCategory = async () => {
    const { result: res } = await getCategoryAPI()
    categoryList.value = res
  }

  // return 出去
  return { categoryList, getCategory }
})
