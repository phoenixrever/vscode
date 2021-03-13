<template>
  <el-form
    :model="dynamicValidateForm"
    ref="dynamicValidateForm"
    label-width="100px"
    class="demo-dynamic"
  >
    <el-form-item
      prop="chapter.title"
      label="章节"
      :rules="[{ required: true, message: '请输入章节名称', trigger: 'blur' }]"
    >
      <el-input v-model="dynamicValidateForm.chapter.title"></el-input>
    </el-form-item>
    <el-form-item label="排序">
      <el-input-number
        :min="0"
        v-model="dynamicValidateForm.chapter.sort"
        controls-position="right"
      />
    </el-form-item>
    <el-form-item
      v-for="(domain, index) in dynamicValidateForm.chapterVideos"
      :label="'小结' + index"
      :key="domain.key"
      :prop="'chapterVideos.' + index + '.title'"
      :rules="{
        required: true,
        message: '小结',
        trigger: 'blur'
      }"
    >
      <el-input v-model="domain.title"></el-input>
      <el-button @click.prevent="removeDomain(domain)">删除</el-button>

      <el-input-number
        :min="0"
        v-model="domain.sort"
        controls-position="right"
        :style="{ 'margin-top': '10px' }"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('dynamicValidateForm')"
        >提交</el-button
      >
      <el-button @click="addDomain">新增域名</el-button>
      <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import chapterApi from "@/api/edu/chapter";
export default {
  data() {
    return {
      dynamicValidateForm: {
        chapterVideos: [
          {
            course_id: this.$route.params.id,
            title: "",
            sort: ""
          }
        ],
        chapter: {
          course_id: this.$route.params.id,
          title: "",
          sort: ""
        }
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.dynamicValidateForm);
          chapterApi
            .addChapterVideos(this.dynamicValidateForm)
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.chapterVideos.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.chapterVideos.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.chapterVideos.push({
        value: "",
        key: Date.now()
      });
    }
  }
};
</script>
<style>
.demo-dynamic .el-input {
  margin-right: 10px;
  max-width: 450px;
  vertical-align: top;
}
</style>
