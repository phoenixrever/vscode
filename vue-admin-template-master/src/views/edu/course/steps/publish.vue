<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>课程信息</span>
      <el-button
        style="float: right; padding: 3px 0"
        type="text"
        @click="submit"
        >最终发布</el-button
      >
      <el-button
        style="float: right; padding: 3px 0;margin-right:10px"
        type="text"
        @click="prev"
        >上一步</el-button
      >
    </div>
    <el-row :gutter="20" type="flex" justify="space-around">
      <el-col :span="16">
        <el-image :src="completeCourseInfo.cover" fit="cover"></el-image
      ></el-col>
      <el-col :span="8">
        <div class="text item">
          <strong>课程名字：</strong>{{ completeCourseInfo.title }}
          <el-divider></el-divider>
        </div>
        <div class="text item">
          <strong>课时：</strong>{{ completeCourseInfo.lessonNum }}
          <el-divider></el-divider>
        </div>
        <div class="text item">
          <strong>所属分类：</strong
          >{{
            completeCourseInfo.subjectLevelOne +
              "-" +
              completeCourseInfo.subjectLevelTwo
          }}
          <el-divider></el-divider>
        </div>
        <div class="text item">
          <strong>课程讲师：</strong>{{ completeCourseInfo.teacherName }}
          <el-divider></el-divider>
        </div>
        <div class="text item">
          <strong>价格：</strong>{{ completeCourseInfo.price }}
          <el-divider></el-divider>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>
<script>
import courseApi from "@/api/edu/course";
export default {
  data() {
    return {
      completeCourseInfo: {
        title: "",
        lessonNum: "",
        subjectLevelOne: "",
        subjectLevelTwo: "",
        teacherName: "",
        price: "",
        cover: ""
      }
    };
  },
  created() {
    courseApi
      .completeCourseInfo(this.$route.params.id)
      .then(response => {
        this.completeCourseInfo = response.data.completeCourseInfo;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    prev() {
      this.$router.push({
        path: `/course/save/chapter/${this.$route.params.id}`
      });
    },
    submit() {
      courseApi
        .publishCourse(this.$route.params.id)
        .then(response => {
          this.$message({
            type: "success",
            message: "课程发布成功"
          });
          this.$router.push(`/course/list`);
        })
        .catch(error => {});
    }
  }
};
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  margin-left: 18px;
  margin-top: 18px;
}
.el-divider {
  margin: 12px 0;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
/* 
.box-card {
  width: 480px;
} */
</style>
