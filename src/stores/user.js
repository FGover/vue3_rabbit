import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/user'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})
    // 获取用户信息
    const getUserInfo = async ({ account, password }) => {
      const { result: res } = await loginAPI({ account, password })
      userInfo.value = res
    }

    // 退出登录清除用户信息
    const clearUserInfo = () => {
      userInfo.value = {}
    }
    return { userInfo, getUserInfo, clearUserInfo }
  },
  { persist: true }
)
