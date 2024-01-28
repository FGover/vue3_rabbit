import axios from 'axios'
import { useUserStore } from '@/stores/user' 
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import router from '@/router'

const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000,
})

// 请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
httpInstance.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    const userStore = useUserStore()
    // 统一错误提示
    ElMessage.error(error.response.data.message)
    if(error.response.status === 401) {
      userStore.clearUserInfo()
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default httpInstance
