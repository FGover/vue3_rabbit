<template>
  <div>
    <header class="login-header">
      <div class="container">
        <h1 class="logo">
          <RouterLink to="/"></RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav><a href="javascript:;">账户登录</a></nav>
        <div class="account-box">
          <div class="form">
            <el-form :model="form" :rules="rulesForm" ref="formRef" status-icon>
              <el-form-item label="账户" prop="account">
                <el-input v-model="form.account" clearable></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" clearable></el-input>
              </el-form-item>
              <el-form-item label-width="22px" prop="agree">
                <el-checkbox size="large" v-model="form.agree">我已同意隐私条款和服务条款 </el-checkbox>
              </el-form-item>
              <el-button type="primary" size="large" class="subBtn" @click="login" @keyup.enter ="enter">点击登录</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>
    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">售后服务</a>
          <a href="javascript:;">配送与验收</a>
          <a href="javascript:;">商务合作</a>
          <a href="javascript:;">搜索推荐</a>
          <a href="javascript:;">友情链接</a>
        </p>
        <p>CopyRight &copy; 小兔鲜儿</p>
      </div>
    </footer>
  </div>
</template>

<script setup name="Login">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

const userStore = useUserStore()

// 表单对象
const form = ref({
  account: 'heima282',
  password: 'hm#qd@23!',
  agree: true,
})
// 规则对象
const rulesForm = {
  account: [{ required: true, message: '请输入账户', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  agree: [
    {
      validator: (rule, value, callback) => {
        if (value) {
          callback()
        }
        callback(new Error('请同意勾选协议'))
      },
    },
  ],
}
// 获取form表单实例
const formRef = ref(null)
const router = useRouter()
const login = () => {
  const { account, password } = form.value
  formRef.value.validate(async (valid) => {
    if (valid) {
      // 登录成功
      await userStore.getUserInfo({ account, password })
      ElMessage.success('登录成功')
      router.replace('/')
    }
  })
}

// 按键盘回车登录
const enter = (e) => {
  if (e.keyCode === 13) {
    login()
  }
}

onMounted(()=>{
  window.addEventListener('keydown', enter)
})

</script>

<style lang="scss" scoped>
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    width: 200px;
    a {
      display: block;
      height: 100px;
      width: 100%;
      background: url(@/assets/images/logo.png) no-repeat center 18px / contain;
    }
  }
  .entry {
    width: 120px;
    font-size: 16px;
    i {
      font-size: 14px;
      color: $xtxColor;
      // 让文本缩减5px
      letter-spacing: -5px;
    }
  }
}
.login-section {
  background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  height: 480px;
  position: relative;
  .wrapper {
    width: 380px;
    background: #fff;
    padding: 0 20px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      padding: 20px 0;
      text-align: center;
      a {
        font-size: 18px;
      }
    }
    .form {
      padding: 0 20px 20px 20px;
      .subBtn {
        margin-top: 5px;
        width: 100%;
        color: #fff;
      }
    }
  }
}
.login-footer {
  padding: 30px 0 50px;
  background: #fff;
  p {
    text-align: center;
    color: #999;
    padding-top: 20px;
    a {
      padding: 0 10px;
      color: #999;
      ~ a {
        border-left: 1px solid #ccc;
      }
    }
  }
}
</style>
