<template>
  <div class="login">
    <el-form :model="form" label-width="80px" :rules="rules" ref="form">
      <el-form-item label="账号" prop="username">
        <el-input
          v-model="form.username"
          placeholder="请输入用户名"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
          show-password
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^1\d{4,10}$/,
            message: '请输入合法的账号/手机号',
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: ['blur', 'change']
          },
          {
            min: 3,
            max: 12,
            message: '长度在 3 到 12 个字符',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },

  methods: {
    reset() {
      this.$refs.form.resetFields()
    },

    async login() {
      try {
        await this.$refs.form.validate()

        const res = await this.$axios.post('/login', this.form)
        console.log(res.data)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.$message.success('登录成功')
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
          this.$router.push('/')
        } else {
          this.$message.error('用户名或者密码错误')
        }
      } catch (e) {
        console.log('表单校验失败', e)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 400px;
  margin: 200px auto;
  border: 1px solid #ccc;
  padding: 20px;
}
.el-button:first-child {
  margin-right: 80px;
}
</style>
