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

      <!-- 所属分类：级联下拉列表 -->
      <!-- 一级分类 -->
      <el-form-item label="课程类别" required>
        <el-col :span="12">
          <el-select
            v-model="courseInfo.subjectParentId"
            placeholder="请选择"
            style="width: 100%;"
          >
            <el-option
              v-for="subject in subjectNestedList"
              :key="subject.id"
              :label="subject.title"
              :value="subject.id"
            />
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-form-item>
            <!-- 二级分类 -->
            <el-select
              v-model="courseInfo.subjectId"
              placeholder="请选择"
              style="width: 100%;"
            >
              <el-option
                v-for="subject in subSubjectList"
                :key="subject.value"
                :label="subject.title"
                :value="subject.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
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

      <!-- 课程简介 TODO -->

      <!-- 课程封面 TODO -->

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
        <editor
          api-key="no-api-key"
          :init="{
            height: 500,
            menubar: false,
            plugins: [
              'advlist autolink lists link image fullscreen emoticons charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount'
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help| customInsertButton|fullscreen',
            setup: function(editor) {
              editor.ui.registry.addButton('customInsertButton', {
                text: 'My Button',
                onAction: function(_) {
                  editor.insertContent(
                    '&nbsp;<strong>It\'s my button!</strong>&nbsp;'
                  );
                }
              });
            }
          }"
        />
        />
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
import Tinymce from "@/components/Tinymce";

const defaultForm = {
  title: "",
  subjectId: "",
  teacherId: "",
  lessonNum: 0,
  description: "",
  cover: "",
  price: 0,
  subjectNestedList: [], //一级分类列表
  subSubjectList: [] //二级分类列表
};

export default {
  components: { Tinymce },
  data() {
    return {
      courseInfo: defaultForm,
      saveBtnDisabled: false // 保存按钮是否禁用
    };
  },

  watch: {
    $route(to, from) {
      console.log("watch $route");
      this.init();
    }
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        console.log(id);
      } else {
        this.courseInfo = { ...defaultForm };
      }
    },

    next() {
      this.saveBtnDisabled = true;
      if (this.$route.name === "courseInfo") {
        console.log(this.$route.name);
        this.$router.push({ path: "/course/save/chapter" });
      }
      if (this.$route.name === "courseChapter") {
        this.$router.push({ path: "/course/save/publish" });
      }
      // if (!this.courseInfo.id) {
      //   this.saveData();
      // } else {
      //   this.updateData();
      // }
    },

    // 保存
    saveData() {
      course
        .saveCourseInfo(this.courseInfo)
        .then(response => {
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          return response; // 将响应结果传递给then
        })
        .then(response => {
          this.$router.push({
            path: "/edu/course/chapter/" + response.data.courseId
          });
        })
        .catch(response => {
          this.$message({
            type: "error",
            message: response.message
          });
        });
    },

    updateData() {
      this.$router.push({ path: "/edu/course/chapter/1" });
    }
  }
};
</script>
