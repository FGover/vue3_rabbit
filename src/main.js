import '@/styles/common.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { lazyPlugin } from './directives'
import { componentPlugin } from './components'
// 引入pinia数据持久化插件（在设置state的时候会自动把数据同步给localstorage，在获取state数据的时候会优先从localstorage中取）
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')

