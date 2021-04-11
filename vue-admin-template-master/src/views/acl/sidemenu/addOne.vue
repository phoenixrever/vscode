<template>
  <el-form :model="form" ref="form" label-width="100px">
    <el-row :gutter="0">
      <el-col :span="12">
        <el-form-item
          :prop="oneSubject.name"
          label="name"
          :rules="[
            { required: true, message: '请输入菜單名称', trigger: 'blur' },
          ]"
        >
          <el-input v-model="oneSubject.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          :prop="oneSubject.path"
          label="path"
          :rules="[
            { required: true, message: '请输入菜單path', trigger: 'blur' },
          ]"
        >
          <el-input v-model="oneSubject.path"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="12">
        <el-form-item :prop="oneSubject.redirect" label="redirect">
          <el-input v-model="oneSubject.redirect"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :prop="oneSubject.icon" label="icon">
          <el-input v-model="oneSubject.icon"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="12">
        <el-form-item :prop="oneSubject.hidden" label="hidden">
          <el-input v-model="oneSubject.hidden"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :prop="oneSubject.component" label="component">
          <el-input
            v-model="oneSubject.component"
            :rules="[
              { required: true, message: '请输入菜單名称', trigger: 'blur' },
            ]"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="排序">
      <el-input-number
        :min="0"
        v-model="oneSubject.sort"
        controls-position="right"
      />
    </el-form-item>

    <el-divider>二級目錄</el-divider>

    <el-row :gutter="0">
      <el-col :span="12">
        <el-form-item
          :prop="twoSubject.name"
          label="name"
          :rules="[
            { required: true, message: '请输入菜單名称', trigger: 'blur' },
          ]"
        >
          <el-input v-model="twoSubject.name"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          :prop="twoSubject.path"
          label="path"
          :rules="[
            { required: true, message: '请输入菜單path', trigger: 'blur' },
          ]"
        >
          <el-input v-model="twoSubject.path"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="12">
        <el-form-item :prop="twoSubject.redirect" label="redirect">
          <el-input v-model="twoSubject.redirect"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :prop="twoSubject.icon" label="icon">
          <el-input v-model="twoSubject.icon"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="12">
        <el-form-item :prop="twoSubject.hidden" label="hidden">
          <el-input v-model="twoSubject.hidden"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :prop="twoSubject.component" label="component">
          <el-input
            v-model="twoSubject.component"
            :rules="[
              { required: true, message: '请输入菜單名称', trigger: 'blur' },
            ]"
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="排序">
      <el-input-number
        :min="0"
        v-model="twoSubject.sort"
        controls-position="right"
      />
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        :loading="loading"
        @click="submitForm('form')"
        >{{ submit }}</el-button
      >
      <el-button @click="addDomain">取消</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import sideroute from '@/api/acl/side_route'
// import videoUpload from './videoUpload'

export default {
  data() {
    return {
      twoSubject: [],
      oneSubject: [],

      loading: false,
      submit: '提交',
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.form)
          sideroute
            .addOneSubject(this.form)
            .then((response) => {
              console.log(response)
              this.$emit('refresh')
            })
            .catch((error) => {
              console.log(error)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    processUpload() {
      this.loading = true
      this.submit = '上传中'
    },
    remove(item) {
      var index = this.form.twoSubject.indexOf(item)
      if (index !== -1) {
        this.form.twoSubject.splice(index, 1)
      }
    },
  },
}
</script>
<style>
.demo-dynamic .el-input {
  margin-right: 10px;
  max-width: 450px;
  vertical-align: top;
}
</style>
