<template>
  <div>
    <el-upload
      class="upload-demo"
      :multiple="false"
      :action="BASE_API + '/serviceVod/video/videoUpload'"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :limit="1"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button size="small" type="primary" @click="clearFileList"
        >点击上传</el-button
      >
    </el-upload>
  </div>
</template>
<script>
import video from '@/api/edu/video'
// import axios from "axios";

export default {
  props: {
    videoName: {
      type: String,
    },
    videoSourceId: {
      type: String,
    },
    indexId: {
      type: String,
    },
  },
  created() {
    console.log('upload==========' + this.indexId)
  },
  data() {
    return {
      BASE_API: process.env.BASE_API,
      fileList: [
        {
          name: this.videoName,
          url: '',
        },
      ],
      videoId: this.videoSourceId,
    }
  },
  watch: {
    videoName(val) {
      this.fileList[0].name = this.videoName
    },
  },
  methods: {
    clearFileList() {
      this.fileList = []
    },
    /*
    customUpload(file) {
      let FormDatas = new FormData();
      FormDatas.append("file", file.file);

      axios.interceptors.request.use(
        function(config) {
          // 在发送请求之前做些什么
          return config;
        },
        function(error) {
          // 对请求错误做些什么
          return Promise.reject(error);
        }
      );

      axios({
        method: "post",
        url: this.BASE_API + "/serviceVod/video/videoUpload",
        data: FormDatas
        // onUploadProgress: progressEvent => {
        //   console.log(progressEvent.loaded);
        //   let num = ((progressEvent.loaded / progressEvent.total) * 100) | 0; //百分比
        //   file.onProgress({ percent: num }); //进度条
        // }
      });
      // video
      //   .videoUpload(FormDatas)
      //   .then(response => {
      //     onUploadProgress: progressEvent => {
      //       let num = ((progressEvent.loaded / progressEvent.total) * 100) | 0; //百分比
      //       file.onProgress({ percent: num }); //进度条
      //     };
      //   })
      //   .catch(error => {});
      // this.flag = setInterval(() => {
      //   this.getProgressbar(file);
      // }, 300);
    },

    getProgressbar(file) {
      video
        .getProgressbar()
        .then(response => {
          console.log(response.stringMapData["admin"]);
          console.log(response.stringMapData);
          var recvStatus = response.stringMapData["status"];
          var recvSize = response.stringMapData["admin"];
          if (recvStatus === "on") {
            var num = Math.round((recvSize * 100) / file.file.size);
            file.onProgress({ percent: num });
            // console.log(num)
          }
          if ((recvStatus = "off" && recvSize === "-1")) {
            clearInterval(this.flag);
            console.log("上传文件完成");
            file.onSuccess();
          }
        })
        .catch(error => {});
    },
    */
    handleRemove(file, fileList) {
      // console.log(file, fileList)
      console.log(this.videoId)
      if (this.videoId !== '') {
        video
          .deleteByVideoId(this.videoId)
          .then((response) => {
            console.log(response)
            var editData = {}
            editData.videoSourceId = ''
            editData.videoOriginalName = ''
            editData.indexId = this.indexId
            // console.log(URL.createObjectURL(file.raw)); // base64编码
            // this.cover = res.data.fileUrl;
            this.$emit('addVideoId', editData)
            this.$message({
              type: 'sucsess',
              message: '删除成功',
            })
          })
          .catch((error) => {
            this.$message({
              type: 'danger',
              message: '删除失败' + error,
            })
          })
      }
    },
    beforeUpload() {
      this.$emit('processUpload')
    },
    handleSuccess(res, file) {
      console.log(res) // 上传响应
      console.log(file) // 上传响应
      var editData = {}
      editData.videoSourceId = res.stringMapData.VideoId
      editData.videoOriginalName = file.name
      editData.indexId = this.indexId
      this.videoId = editData.videoSourceId
      // console.log(URL.createObjectURL(file.raw)); // base64编码
      // this.cover = res.data.fileUrl;
      this.$emit('addVideoId', editData)
    },
    handlePreview(file) {
      // console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
  },
}
</script>
