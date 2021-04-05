<template>
  <el-upload
    class="upload-demo"
    :action="BASE_API + '/eduoss/fileoss/upload?folder=cover'"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :before-upload="beforeUpload"
    :limit="1"
    :file-list="fileList"
    list-type="picture"
    :on-exceed="handleExceed"
  >
    <el-button size="small" type="primary" @click="clearFileList"
      >点击上传</el-button
    >
    <div slot="tip" class="el-upload__tip">
      只能上传jpg/png文件，且不超过500kb
    </div>
  </el-upload>
</template>
<script>
export default {
  props: {
    cover: {
      type: String,
    },
  },
  data() {
    return {
      BASE_API: process.env.BASE_API,
      fileList: [
        {
          name: 'food.jpeg',
          url: this.cover,
        },
      ],
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleSuccess(res, file) {
      console.log(res) // 上传响应
      console.log(URL.createObjectURL(file.raw)) // base64编码
      // this.cover = res.data.fileUrl;
      this.$emit('changeCover', res.data.fileUrl)
    },
    clearFileList() {
      this.$emit('changeButton')
      this.fileList = []
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
  },
}
</script>
