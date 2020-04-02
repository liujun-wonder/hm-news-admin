<template>
  <div class="post-publish">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
      <el-breadcrumb-item>发布文章</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="form" label-width="80px" :rules="rules" ref="form">
      <el-form-item label="标题" prop="title">
        <el-input placeholder="请输入文章标题" v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="内容" prop="content">
        <!-- 当成textarea来用 -->
        <quill-editor v-model="form.content"></quill-editor>
      </el-form-item>

      <el-form-item label="栏目" prop="categories">
        <el-checkbox-group v-model="form.categories">
          <!-- 遍历 -->
          <!-- <el-checkbox label="1">篮球</el-checkbox> -->
          <!-- <el-checkbox label="2">足球</el-checkbox> -->
          <el-checkbox
            v-for="item in tabList"
            :key="item.id"
            :label="item.id"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="封面" prop="cover">
        <el-upload
          :action="$axios.defaults.baseURL + '/upload'"
          list-type="picture-card"
          :headers="headers"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="publish">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: '',
        content: '',
        categories: [],
        cover: [],
        type: 1
      },
      tabList: [],
      headers: {
        Authorization: localStorage.getItem('token')
      },
      rules: {
        title: [
          {
            required: true,
            message: '文章的标题不能为空',
            trigger: ['blur', 'change']
          }
        ],

        content: [
          {
            required: true,
            message: '文章的内容不能为空',
            trigger: ['blur', 'change']
          }
        ],

        categories: [
          {
            required: true,
            message: '文章的栏目不能为空',
            trigger: ['blur', 'change']
          }
        ],

        cover: [
          {
            required: true,
            message: '文章的封面不能为空',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },

  async created() {
    const res = await this.$axios.get('/category')
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.tabList = data.filter(
        item => item.name !== '关注' && item.name !== '头条'
      )
    }
  },

  methods: {
    handleSuccess(res, file, fileList) {
      const { statusCode, data } = res
      if (statusCode === 200) {
        this.form.cover.push({
          id: data.id,
          url: data.url
        })
      }
    },

    async publish() {
      try {
        await this.$refs.form.validate()
        const categories = this.form.categories.map(item => {
          return {
            id: item
          }
        })
        const data = {
          ...this.form,
          categories: categories
        }
        if (this.form.type === 2) {
          const reg = /<\/?.+?\/?>/g
          data.content = this.form.content.replace(reg, '')
        }
        const res = await this.$axios.post('/post', data)
        const { statusCode } = res.data
        if (statusCode === 200) {
          this.$router.push('/')
          this.$message.success('发布成功')
        }
      } catch {
        console.warn('表单校验失败了')
      }
    }
  },

  watch: {
    'form.content': {
      handler(value) {
        if (value) {
          console.log('123')
          this.$refs.form.clearValidate('content')
        }
      }
    },

    'form.cover': {
      deep: true,
      handler(value) {
        if (value.length) {
          console.log('123')
          this.$refs.form.clearValidate('cover')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  margin-top: 20px;
}
.quill-editor {
  background-color: #fff;
  /deep/ .ql-editor {
    height: 200px;
  }
}
</style>
