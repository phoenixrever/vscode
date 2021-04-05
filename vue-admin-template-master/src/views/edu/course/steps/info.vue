<template>
  <div class="app-container">
    <!-- <el-form :gutter="0" label-width="120px" :style="{ 'max-width': '600px' }"> -->
    <el-form :gutter="0" label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"
        />
      </el-form-item>
      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>
      <!-- 所属分类：级联下拉列表 -->
      <!-- 一级分类 -->
      <el-form-item label="课程类别">
        <el-select
          v-model="courseInfo.oneSubjectId"
          placeholder="请选择"
          @change="sujectChange"
        >
          <el-option
            v-for="subject in oneSubjectList"
            :key="subject.id"
            :label="subject.label"
            :value="subject.id"
          />
        </el-select>
        <el-select v-model="courseInfo.twoSubjectId" placeholder="请选择">
          <el-option
            v-for="subject in twoSubjectList"
            :key="subject.id"
            :label="subject.label"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>
      <!-- 课程讲师 TODO -->

      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>

      <!-- 课程封面 TODO -->
      <el-form-item label="课程封面">
        <image-upload
          @changeButton="changeButton"
          :cover="courseInfo.cover"
          @changeCover="changeCover"
          :key="courseInfo.cover"
        ></image-upload>
      </el-form-item>
      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />
        元
      </el-form-item>
      <el-form-item label="课程简介">
        <div>
          <tinymce-editor
            v-model="courseInfo.description"
            :disabled="disabled"
            @onClick="onClick"
            ref="editor"
          ></tinymce-editor>
          <!-- <button @click="clear">清空内容</button>
          <button @click="disabled = true">禁用</button> -->
        </div>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
          >保存并下一步</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// import Tinymce from "@/components/Tinymce";
// import Editor from "@tinymce/tinymce-vue";
import TinymceEditor from "@/views/editor/editor";
import ImageUpload from "./imageUpload.vue";
import subjectlist from "@/api/edu/subject";
import course from "@/api/edu/course";
import teacher from "@/api/edu/teacher";

const defaultForm = {
  title: "",
  oneSubjectId: "",
  twoSubjectId: "",
  teacherId: "",
  lessonNum: 0,
  description: "Welcome to Use Tinymce Editor",
  cover:
    "https://phoenixhell.oss-cn-shanghai.aliyuncs.com/2021/03/05/46ae2a8cacb8410385a1e018279a3cae.jpg",
  price: 0
};

export default {
  // components: { Tinymce },
  components: {
    TinymceEditor,
    ImageUpload
  },
  data() {
    return {
      courseInfo: defaultForm,
      twoSubjectList: [], //一级分类列表
      oneSubjectList: [],
      teacherList: [],
      saveBtnDisabled: false,
      disabled: false // 保存按钮是否禁用
    };
  },
  watch: {
    $route(to, from) {
      console.log("watch------------------");
    }
  },
  created() {
    this.getsubjectlist();
    this.getTeacherlist();
  },
  methods: {
    sujectChange(value) {
      // console.log(this.courseInfo);
      this.twoSubjectId = "";
      this.oneSubjectList.forEach(element => {
        if (element.id === value) {
          this.twoSubjectList = element.children;
          // console.log(this.courseInfo.twosubjectList);
        }
      });
    },
    getCourseById(id) {
      course
        .getCourseById(id)
        .then(response => {
          console.log(response);
          this.courseInfo = response.data.courseInfo;
          this.oneSubjectList.forEach(element => {
            if (element.id === this.courseInfo.oneSubjectId) {
              this.twoSubjectList = element.children;
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    changeCover(fileUrl) {
      console.log("changebutton");
      this.saveBtnDisabled = false;
      this.courseInfo.cover = fileUrl;
    },
    changeButton() {
      this.saveBtnDisabled = true;
    },
    getsubjectlist() {
      subjectlist
        .subjectlist()
        .then(response => {
          // console.log(response);
          this.oneSubjectList = response.data.data;
          this.init();
        })
        .catch(error => {
          console.log(error);
        });
    },
    getTeacherlist() {
      teacher
        .getAllTeacher()
        .then(response => {
          this.teacherList = response.data.teachers;
        })
        .catch(error => {
          console.log(error);
        });
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.getCourseById(this.$route.params.id);
      }
    },
    onClick(e, editor) {
      // console.log("Element clicked");
      // console.log(e);
      // console.log(editor);
    },
    //清空内容
    clear() {
      this.$refs.editor.clear();
    },

    next() {
      this.saveBtnDisabled = true;
      if (!this.courseInfo.id) {
        this.saveData();
      } else {
        this.updateData();
      }
    },
    jump() {
      // if (
      //   this.$route.name === "courseInfo" ||
      //   this.$route.name === "editCourseInfo"
      // ) {
      //   console.log(this.$route.name);
      //   this.$router.push({
      //     path: `/course/save/chapter/${this.courseInfo.id}`
      //   });
      // } else if (this.$route.name === "courseChapter") {
      //   // console.log(this.$route.name);
      //   this.$router.push({
      //     path: `/course/save/publish/${this.courseInfo.id}`
      //   });
      // }
      this.$router.push({
        path: `/course/save/chapter/${this.courseInfo.id}`
      });
    },

    // 保存
    saveData() {
      course
        .addCourse(this.courseInfo)
        .then(response => {
          console.log(response);
          this.courseInfo.id = response.data.id;
          // console.log(this.courseInfo)
          this.saveBtnDisabled = false;
          this.jump();
          this.$message({
            type: "success",
            message: "保存成功!"
          });
        })
        .catch(response => {
          this.saveBtnDisabled = false;

          this.$message({
            type: "error",
            message: response.message
          });
        });
    },

    updateData() {
      course
        .editCourse(this.courseInfo)
        .then(response => {
          console.log(response);
          this.saveBtnDisabled = false;
          this.jump();
          this.$message({
            type: "success",
            message: "保存成功!"
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
