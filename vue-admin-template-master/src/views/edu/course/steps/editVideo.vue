<template>
  <el-form
    :model="chapterVideos"
    ref="chapterVideos"
    label-width="100px"
    class="demo-dynamic"
  >
    <el-form-item
      label="小结"
      :rules="{
        required: true,
        message: '小结',
        trigger: 'blur',
      }"
    >
      <el-input v-model="chapterVideos.title"></el-input>
      <el-row :style="{ 'margin-top': '10px' }">
        <el-col :span="6"
          ><videoUpload
            :videoName="chapterVideos.videoOriginalName"
            :videoSourceId="chapterVideos.videoSourceId"
            @addVideoId="addVideoId"
            @processUpload="processUpload"
          ></videoUpload
        ></el-col>
        <el-col :span="10">
          <el-form-item label="排序">
            <el-input-number
              :min="0"
              v-model="chapterVideos.sort"
              controls-position="right"
              size="small"
            />
          </el-form-item>
          <el-form-item label="是否免费" label-position="left">
            <el-radio v-model="chapterVideos.isFree" :label="1">是</el-radio>
            <el-radio v-model="chapterVideos.isFree" :label="0">否</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        :loading="loading"
        @click="submitForm('chapterVideos')"
        >{{ submit }}</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
import video from '@/api/edu/video'
import videoUpload from './videoUpload'
export default {
  components: {
    videoUpload,
  },
  props: {
    chapterVideos: {
      type: Object,
    },
  },
  data() {
    return {
      loading: false,
      submit: '提交',
    }
  },
  created() {},
  //   watch: {
  //     chapter(val) {
  //       console.log(val);
  //       this.dynamicValidateForm.chapter = val;
  //     }
  //   },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.chapterVideos)
          video
            .editVideo(this.chapterVideos)
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
    processUpload() {
      this.loading = true
      this.submit = '上传中'
    },
    addVideoId(editData) {
      this.chapterVideos.videoSourceId = editData.videoSourceId
      this.chapterVideos.videoOriginalName = editData.videoOriginalName
      console.log(this.chapterVideos)
      this.loading = false
      this.submit = '提交'
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
