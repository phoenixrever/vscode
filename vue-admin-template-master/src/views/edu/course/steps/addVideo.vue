<template>
  <el-form
    :model="dynamicValidateForm"
    ref="dynamicValidateForm"
    label-width="100px"
    class="demo-dynamic"
  >
    <el-form-item prop="chapter.title" label="章节">
      <el-input v-model="chapter.title" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item
      v-for="(domain, index) in dynamicValidateForm.chapterVideos"
      :label="'小结' + index"
      :key="domain.key"
      :prop="'chapterVideos.' + index + '.title'"
      :rules="{
        required: true,
        message: '小结',
        trigger: 'blur',
      }"
    >
      <el-input v-model="domain.title"></el-input>
      <el-button @click.prevent="removeDomain(domain)">删除</el-button>
      <el-row :style="{ 'margin-top': '10px' }">
        <el-col :span="6"
          ><videoUpload
            :indexId="domain.indexId"
            @addVideoId="addVideoId"
            @processUpload="processUpload"
          ></videoUpload
        ></el-col>
        <el-col :span="10">
          <el-form-item label="排序">
            <el-input-number
              :min="0"
              v-model="domain.sort"
              controls-position="right"
              size="small"
            />
          </el-form-item>
          <el-form-item label="是否免费">
            <el-radio v-model="domain.isFree" label="1">是</el-radio>
            <el-radio v-model="domain.isFree" label="0">否</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        :loading="loading"
        @click="submitForm('dynamicValidateForm')"
        >{{ submit }}</el-button
      >
      <el-button @click="addDomain">新增小结</el-button>
      <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import chapterApi from '@/api/edu/chapter'
import video from '@/api/edu/video'
import videoUpload from './videoUpload'
export default {
  components: {
    videoUpload,
  },
  props: {
    chapter: {
      type: Object,
    },
  },
  data() {
    return {
      dynamicValidateForm: {
        chapterVideos: [
          {
            courseId: this.$route.params.id,
            title: '',
            chapter_id: this.chapter.id,
            sort: '',
            isFree: '',
            videoSourceId: '',
            indexId: Date.now() + '',
          },
        ],
        chapter: {
          course_id: this.$route.params.id,
          title: '',
          sort: '',
        },
      },
      loading: false,
      submit: '提交',
    }
  },
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
          console.log(this.dynamicValidateForm.chapterVideos)
          video
            .addChapterVideos(this.dynamicValidateForm.chapterVideos)
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
    addVideoId(videoSourceId) {
      this.dynamicValidateForm.chapterVideos.videoSourceId = videoSourceId
    },
    processUpload() {
      this.loading = true
      this.submit = '上传中'
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.chapterVideos.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.chapterVideos.splice(index, 1)
      }
    },
    addVideoId(editData) {
      var array = this.dynamicValidateForm.chapterVideos
      for (let index = 0; index < array.length; index++) {
        const e = array[index]
        if (e.indexId === editData.indexId) {
          e.videoOriginalName = editData.videoOriginalName
          e.videoSourceId = editData.videoSourceId
        }
      }

      this.loading = false
      this.submit = '提交'
    },
    addDomain() {
      this.dynamicValidateForm.chapterVideos.push({
        course_id: this.$route.params.id,
        title: '',
        chapterId: this.chapter.id,
        sort: '',
        key: Date.now(),
      })
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
