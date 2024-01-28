<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="userStore.userInfo.token">
          <li>
            <a href="javascript:;">
              <i class="iconfont icon-user">{{ userStore.userInfo.account }}</i>
            </a>
          </li>
          <li>
            <el-popconfirm title="Are you sure you to logout?" confirm-button-text="Yes" cancel-button-text="No" @confirm="confirm" @cancel="cancel">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;">我的订单</a></li>
          <li><a href="javascript:;">会员中心</a></li>
        </template>
        <template v-else>
          <li><a @click="$router.push('/login')">请先登录</a></li>
          <li><a href="javascipt:;">帮助中心</a></li>
          <li><a href="javascipt:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script setup name="LayoutNav">
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
// import 'element-plus/theme-chalk/el-message.css'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()

const confirm = () =>{
  userStore.clearUserInfo()
  ElMessage.success('退出登录成功')
  router.push('/login')
}

const cancel = () =>{
  ElMessage('已取消退出登录')
}

</script>

<style lang="scss" scoped>
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        cursor: pointer;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: $xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
