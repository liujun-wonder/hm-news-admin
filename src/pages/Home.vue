<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <div class="logo">黑马头条</div>
        <el-menu
          :default-active="$route.path"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">文章列表</span>
          </el-menu-item>
          <el-menu-item index="/post-publish">
            <i class="el-icon-message-solid"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <img :src="$axios.defaults.baseURL + user.head_img" alt="" />
          <span class="nickname">{{ user.nickname }}</span>
          <a href="javascript:;" @click="logout">退出</a>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  created() {
    const user = JSON.parse(localStorage.getItem('user'))
    this.user = user
  },
  data() {
    return {
      user: {}
    }
  },
  methods: {
    async logout() {
      try {
        await this.$confirm('你确定要退出吗?', '温馨提示', {
          type: 'warning'
        })
        localStorage.removeItem('token')
        this.$router.push('/login')
        this.$message.success('退出成功')
      } catch {
        this.$message('取消成功')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-container {
    height: 100%;
  }
}
.el-header {
  background-color: #b3c0d1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .nickname {
    margin: 0 10px;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
}
.el-aside {
  background-color: #545c64;
  .logo {
    width: 200px;
    height: 60px;
    background-color: #333333;
    text-align: center;
    line-height: 60px;
    color: #fff;
    font-size: 18px;
  }
}

.el-main {
  background-color: #e9eef3;
}
</style>
