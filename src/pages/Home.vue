<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-header>
          <img :src="$axios.defaults.baseURL + user.head_img" alt="" />
          <span class="nickname">{{ user.nickname }}</span>
          <a href="javascript:;">退出</a>
        </el-header>
        <el-main>Main</el-main>
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
}

.el-main {
  background-color: #e9eef3;
}
</style>
