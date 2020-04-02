<template>
  <div class="post-list">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="postList">
      <el-table-column
        label="序号"
        width="100"
        type="index"
        :index="indexMethod"
      ></el-table-column>
      <el-table-column label="标题" prop="title"> </el-table-column>
      <el-table-column label="作者" prop="user.nickname"></el-table-column>
      <el-table-column label="创建时间">
        <template v-slot="scope">
          {{ scope.row.create_date | date }}
        </template>
      </el-table-column>
      <el-table-column label="封面">
        <template v-slot="scope">
          <img :src="handleUrl(scope.row.cover[0].url)" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="sizeChange"
      @current-change="handleChange"
      :current-page="pageIndex"
      :page-sizes="[3, 6, 9, 15]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      background
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  created() {
    this.getPostList()
  },

  data() {
    return {
      postList: [],
      pageIndex: 1,
      pageSize: 3,
      total: 0
    }
  },

  methods: {
    async getPostList() {
      const res = await this.$axios.get('/post', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      // console.log(res.data)
      const { statusCode, data, total } = res.data
      if (statusCode === 200) {
        this.postList = data
        this.total = total
      }
    },

    handleChange(val) {
      this.pageIndex = val
      this.getPostList()
    },

    sizeChange(val) {
      this.pageSize = val
      this.getPostList()
    },

    indexMethod(index) {
      return index + 1 + (this.pageIndex - 1) * this.pageSize
    },

    handleUrl(url) {
      if (url.startsWith('http')) {
        return url
      } else {
        return this.$axios.defaults.baseURL + url
      }
    }
  }
}
</script>

<style lang="less" scoped>
img {
  width: 200px;
  height: 150px;
  object-fit: cover;
}
.el-table {
  margin-top: 20px;
}
</style>
