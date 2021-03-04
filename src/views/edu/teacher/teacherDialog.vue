<template>
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <el-scrollbar style="max-height:450px;">
      <div style="padding:0 20px;">
        <el-form
          :model="teacher"
          :rules="rules"
          ref="ruleteacher"
          :label-position="labelPosition"
          label-width="120px"
          size="small"
        >
          <el-form-item label="讲师名称" prop="name">
            <el-input v-model="teacher.name" />
          </el-form-item>
          <el-form-item label="讲师排序">
            <el-input-number
              v-model="teacher.sort"
              controls-position="right"
              :min="0"
            />
          </el-form-item>
          <el-form-item label="讲师头衔" prop="level">
            <el-select v-model="teacher.level" clearable placeholder="请选择">
              <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
              <el-option :value="1" label="高级讲师" />
              <el-option :value="2" label="首席讲师" />
            </el-select>
          </el-form-item>
          <el-form-item label="讲师简介" prop="intro">
            <el-input v-model="teacher.intro" />
          </el-form-item>
          <el-form-item label="讲师资历">
            <el-input
              v-model="teacher.career"
              :autosize="{ minRows: 4, maxRows: 8 }"
              type="textarea"
            />
          </el-form-item>

          <!-- 讲师头像：TODO -->

          <!-- <el-form-item>
          <el-button
            :disabled="saveBtnDisabled"
            type="primary"
            @click="saveOrUpdate"
            >保存</el-button
          >
        </el-form-item> -->
        </el-form>
      </div>
    </el-scrollbar>

    <div slot="footer" class="dialog-footer">
      <el-button
        @click="
          (dialogFormVisible = false), (teacher = {}), resetForm('ruleteacher')
        "
        >取 消</el-button
      >
      <el-button
        type="primary"
        :loading="loading"
        @click="edit ? editTeacher('ruleteacher') : addTeacher('ruleteacher')"
        >{{ buttontext }}</el-button
      >
    </div>
  </el-dialog>
</template>
<style>
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
</style>
<script>
import teacherapi from "@/api/edu/teacher";

export default {
  props: {
    getList: {
      type: Function,
      default: null
    }
  },
  data() {
    var validateName = (rule, value, callback) => {
      validateUnqueName(value, callback);
    };
    return {
      edit: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      labelPosition: "left",
      formLabelWidth: "120px",
      buttontext: "确定",
      loading: false,
      teacher: {
        level: 1
      },
      rules: {
        name: [
          { required: true, message: "请输入讲师名称", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到20 个字符", trigger: "blur" },
          { validator: validateName, trigger: "blur" }
        ],

        intro: [
          { required: true, message: "请输入讲师简介", trigger: "blur" },
          { min: 5, max: 20, message: "长度在5 到20 个字符", trigger: "blur" }
        ],
        level: [{ required: true, message: "请选择头衔", trigger: "change" }]
      }
    };
  },
  methods: {
    addTeacher(ruleteacher) {
      this.$refs[ruleteacher].validate(valid => {
        if (valid) {
          this.loading = true;
          this.buttontext = "执行中";
          teacherapi
            .addTeacher(this.teacher)
            .then(response => {
              console.log(response);
              if (this.getList) {
                this.getList();
              }
              this.loading = false;
              this.dialogFormVisible = false;
              this.resetForm("ruleteacher");
              this.buttontext = "确定";
              this.$message({
                message: "添加成功",
                type: "success"
              });
            })
            .catch(error => {
              console.log(error.message);
              console.log("-------------");
              this.loading = false;
              this.dialogFormVisible = false;
              this.buttontext = "确定";
              this.$message.error("错了哦，这是一条错误消息");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    editTeacher(ruleteacher) {
      this.$refs[ruleteacher].validate(valid => {
        if (valid) {
          this.loading = true;
          this.buttontext = "执行中";
          teacherapi
            .editTeacher(this.teacher)
            .then(response => {
              this.teacher = {};
              if (this.getList) {
                this.getList();
              }
              this.loading = false;
              this.dialogFormVisible = false;
              this.buttontext = "确定";
              this.resetForm("ruleteacher");
              this.$message({
                message: "修改成功",
                type: "success"
              });
            })
            .catch(error => {
              console.log(error);
              this.loading = false;
              this.dialogFormVisible = false;
              this.buttontext = "确定";
              this.$message.error("错了哦，这是一条错误消息");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(ruleteacher) {
      this.$refs[ruleteacher].resetFields();
    },
    validateUnqueName(value, callback) {
      teacherapi
        .validateUnqueName(value)
        .then(response => {
          console.log(response);
          callback();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
