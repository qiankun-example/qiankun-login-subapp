<template>
  <section class="login">
    <header>
      <h1>Edu boss管理系统</h1>
    </header>
    <el-form class="login-form" ref="form" :model="form" label-position="top">
      <h2>登录</h2>
      <el-form-item
        label="手机号"
        prop="phone"
        :rules="[
          { required: true, message: '手机号必填', trigger: 'blur' },
          {
            pattern: /^1\d{10}$/,
            message: '请输入正确手机号',
            trigger: 'blur',
          },
        ]"
      >
        <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
        :rules="[
          { required: true, message: '密码必填', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在6到18个字符', trigger: 'blur' },
        ]"
      >
        <el-input v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="login-button"
          :loading="loading"
          @click="onSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </section>
</template>
<script>
import { login } from '@/services/user'
export default {
  name: 'LoginPage',
  data () {
    return {
      form: {
        // phone: '18631142257',
        phone: '18201288771',
        password: '111111'
      },
      loading: false
    }
  },
  methods: {
    async onSubmit () {
      this.loading = true
      try {
        await this.$refs.form.validate()
        const { data } = await login(this.form)
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          window.localStorage.setItem('user', data.content)
          window.location.replace(process.env.NODE_ENV === 'production' ? '/' : '/main/qiankun-vue2-subapp/')
          this.$message.success('登录成功')
        }
      } catch (e) { // 接口报错message再次调用
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 90%;
  max-width: 22rem;
  margin: 1rem auto;
}
.login header {
  margin-bottom: 1rem;
  h1 {
    text-align: center;
    margin: 4rem 0;
  }
}
.login-form {
  background: #ffffff;
  padding: 20px;
}
.login-button {
  width: 100%;
}
</style>
