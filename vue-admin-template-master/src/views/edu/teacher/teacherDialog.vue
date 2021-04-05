<template>
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible" @close="handleClose">
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
          <el-row type="flex" class="row-bg" justify="center">
            <span style="cursor:pointer" @click="changAvatar">
              <avatar username="Jane Doe" :src="teacher.avatar"></avatar>
            </span>
          </el-row>

          <el-form-item label="讲师名称" prop="name">
            <el-input v-model="teacher.name" :disabled="edit" />
          </el-form-item>
          <el-form-item label="讲师排序">
            <el-input-number v-model="teacher.sort" controls-position="right" :min="0" />
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
          </el-form-item>-->
        </el-form>
      </div>
    </el-scrollbar>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button
        type="primary"
        :loading="loading"
        :disabled="disabled"
        @click="edit ? editTeacher('ruleteacher') : addTeacher('ruleteacher')"
      >{{ buttontext }}</el-button>
    </div>
  </el-dialog>
</template>
<style>
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.row-bg {
  margin: 0 0 15px 0;
}
</style>
<script>
import teacherapi from "@/api/edu/teacher";
import Avatar from "vue-avatar";

export default {
  components: {
    Avatar
  },
  props: {
    getList: {
      type: Function,
      default: null
    },
    teacherDialogSrc: {
      type: String
    }
  },
  watch: {
    //watch props的值
    teacherDialogSrc (val) {
      this.teacher.avatar = this.teacherDialogSrc;
      console.log(this.teacher.avatar);
    }
  },
  data () {
    var validateName = (rule, value, callback) => {
      if (this.edit === false) {
        this.validateUniqueName(value, callback);
      } else {
        callback();
      }
    };
    return {
      edit: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      labelPosition: "left",
      formLabelWidth: "120px",
      buttontext: "确定",
      loading: false,
      disabled: false,
      teacher: {
        level: 1,
        avatar: this.teacherDialogSrc
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
    handleClose () {
      this.resetForm("ruleteacher");
      this.teacher = {
        level: 1,
        avatar: "" //千万不要是null 导致子组件头像不更新
      };
    },
    changAvatar () {
      console.log("change");
      this.$emit("openAvatarDialog");
    },
    addTeacher (ruleteacher) {
      this.$refs[ruleteacher].validate(valid => {
        if (valid) {
          this.loading = true;
          this.buttontext = "执行中";
          (this.disabled = true),
            teacherapi
              .addTeacher(this.teacher)
              .then(response => {
                console.log(response);
                if (this.getList) {
                  this.getList();
                }
                this.loading = false;
                (this.disabled = false), (this.dialogFormVisible = false);
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
    editTeacher (ruleteacher) {
      this.$refs[ruleteacher].validate(valid => {
        if (valid) {
          this.loading = true;
          this.buttontext = "执行中";
          teacherapi
            .editTeacher(this.teacher)
            .then(response => {
              // this.teacher = {};
              console.log("get lsit");
              if (this.getList) {
                this.getList();
              }
              this.loading = false;
              this.dialogFormVisible = false;
              this.buttontext = "确定";
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
    resetForm (ruleteacher) {
      this.$refs[ruleteacher].resetFields();
    },
    validateUniqueName (value, callback) {
      teacherapi
        .validateUniqueName(value)
        .then(response => {
          console.log(response);
          callback();
        })
        .catch(error => {
          console.log(error);
          callback(new Error("用戶名已存在"));
        });
    }
  }
};
</script>
