<template>
  <div class="app-container">
    <h1>讲师列表</h1>
    <!-- https://element.eleme.cn/#/zh-CN/component/table el-table -->
    <searchform @searchParam="searchParam"></searchform>
    <el-button type="success" @click="addTeacher" style="margin-bottom: 20px"
      >添加讲师</el-button
    >
    <router-link :to="'/teacher/save'">
      <el-button type="warning" style="margin-bottom: 20px"
        >路由跳转组件演示</el-button
      >
    </router-link>
    <el-button type="info" @click="routejump" style="margin-bottom: 20px"
      >路由跳转点击演示</el-button
    >
    <avatardialog
      ref="avatardialog"
      @changeAvatarSrc="changeAvatarSrc"
      :avatardialogSrc="avatarSrc"
    ></avatardialog>
    <teacherDialog
      ref="teacherDialog"
      :getList="getList"
      :teacherDialogSrc="avatarSrc"
      @openAvatarDialog="openAvatarDialog"
    ></teacherDialog>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="70">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="Name" align="center" width="120">
        <template slot-scope="scope">
          <!-- scope代表整表数据 row代表一行 name为此行的属性-->
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头衔" width="80" align="center">
        <template slot-scope="scope">
          <!-- == 判断值 ===判断值和类型 -->
          {{ scope.row.level === 1 ? "高级讲师" : "首席讲师" }}
        </template>
      </el-table-column>
      <el-table-column label="Intro" align="center" width="200">
        <template slot-scope="scope">
          <!-- 防止爆legthundefined错误 -->
          <span>{{
            scope.row.intro && scope.row.intro.length > 20
              ? scope.row.intro.substring(0, 20) + "..."
              : scope.row.intro
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Career" align="center">
        <template slot-scope="scope">
          {{ scope.row.career }}
        </template>
      </el-table-column>
      <!-- <el-table-column
        class-name="status-col"
        label="level"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.level | statusFilter">{{
            scope.row.level
          }}</el-tag>
        </template>
      </el-table-column> -->

      <el-table-column
        align="center"
        prop="created_at"
        label="Display_time"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.gmtCreate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="updated_at"
        label="Updated_time"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.gmtModified }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <!-- <router-link :to="'/edu/teacher/edit/' + scope.row.id"> -->
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="editTeacher(scope.row)"
            >修改</el-button
          >
          <!-- </router-link> -->
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id, $event)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页  -->
    <!-- v-on: 简写@ -->
    <el-pagination
      background
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: right"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>

<script>
//@是webpack配置的路径别名
import teacher from "@/api/edu/teacher";
import searchform from "./searchform";
import teacherDialog from "./teacherDialog";
import avatardialog from "./avatardialog";

export default {
  // filters: {
  //   statusFilter(status) {
  //     const statusMap = {
  //       published: "success",
  //       draft: "gray",
  //       deleted: "danger"
  //     };
  //     return statusMap[status];
  //   }
  // },
  components: {
    searchform,
    teacherDialog,
    avatardialog
  },
  // : 和() 都可以  组件中必须写成()组件数据才独立
  data() {
    //定义变量初始值
    return {
      list: null, //查询之后接口返回集合
      listLoading: true,
      page: 1,
      limit: 3,
      total: 0,
      teacherList: {},
      avatarSrc:
        "https://phoenixhell.oss-cn-shanghai.aliyuncs.com/2021/03/05/46ae2a8cacb8410385a1e018279a3cae.jpg"
    };
  },
  created() {
    //页面渲染之前执行一般调用method里面的方法
    this.getList();
  },
  methods: {
    //创建具体方法,调用teacher.js里面定义的方法
    //讲师列表
    searchParam(teacherList) {
      this.teacherList = teacherList;
      this.getList();
    },
    removeDataById(id, event) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        teacher
          .deleteTeacherById(id)
          .then(response => {
            this.getList();
          })
          .catch(error => {
            console.log(error);
          });
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
      //catch统一不写 有的浏览器  框架本身执行一次 自己执行一次
      // .catch(() => {
      //   this.$message({
      //     type: "info",
      //     message: "已取消删除"
      //   });
      // });

      //取消按钮选中状态
      let target = event.target;
      if (target.nodeName == "SPAN") {
        target = event.target.parentNode;
      }
      target.blur();
    },
    getList(page = 1) {
      this.page = page;
      this.listLoading = true;

      teacher
        .getTeacherList(this.page, this.limit, this.teacherList)
        .then(response => {
          console.log(response);
          this.list = response.data.items;
          this.total = response.data.total;
          this.listLoading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    addTeacher() {
      const addTeacherDialog = this.$refs.teacherDialog;
      addTeacherDialog.edit = false;
      addTeacherDialog.dialogFormVisible = true;
    },
    editTeacher(rowteacher) {
      console.log(this.list);
      const editTeacherDialog = this.$refs.teacherDialog;
      editTeacherDialog.dialogFormVisible = true;
      editTeacherDialog.edit = true;
      // editTeacherDialog.teacher = JSON.parse(JSON.stringify(rowteacher));
      // 使用对象拓展运算符，拷贝对象，而不是引用，
      // 否则新增一条记录后，defaultForm就变成了之前新增的teacher的值
      editTeacherDialog.teacher = { ...rowteacher };
    },
    routejump() {
      this.$router.push({ path: "teacher/save" });
    },
    openAvatarDialog() {
      const avatardialog = this.$refs.avatardialog;
      avatardialog.dialogVisible = true;
    },
    changeAvatarSrc(avatarSrc) {
      this.avatarSrc = avatarSrc;
    }
  }
};
</script>
