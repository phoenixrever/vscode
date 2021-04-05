<template>
  <div class="app-container">
    <h1>课程列表</h1>
    <!-- https://element.eleme.cn/#/zh-CN/component/table el-table -->
    <div>
      <!--查询course表单-->
      <el-form :inline="true" class="demo-form-inline" size="medium">
        <el-form-item>
          <el-input v-model="searchCourseInfo.title" placeholder="课程名称" />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="searchCourseInfo.teacherName"
            placeholder="课程讲师"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="searchCourseInfo.subjectLevelOne"
            placeholder="课程分类"
          />
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="searchCourseInfo.status"
            clearable
            placeholder="课程名称"
          >
            <el-option :value="'Normal'" label="已发布" />
            <el-option :value="'Draft'" label="未发布" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-col :span="11">
            <el-form-item>
              <el-input
                v-model="searchCourseInfo.gtPrice"
                placeholder="起始价格"
              />
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center">-</el-col>
          <el-col :span="11">
            <el-form-item>
              <el-input
                v-model="searchCourseInfo.ltPrice"
                placeholder="最大价格"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <!-- 直接执行要写括号 不如传mosemovment -->
        <el-button
          type="primary"
          icon="el-icon-search"
          size="medium"
          @click="getList()"
          >查询</el-button
        >
        <el-button type="danger" size="medium" @click="clearSearchForm"
          >清空</el-button
        >
      </el-form>
    </div>
    <el-table
      v-loading="listLoading"
      :data="completeCourseInfo"
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
      <el-table-column label="课程名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程讲师" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.teacherName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="课程简介" width="180" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>
              分类:
              {{ scope.row.subjectLevelOne + '-' + scope.row.subjectLevelTwo }}
            </p>
            <p>价格: {{ scope.row.price }}</p>
            <p>
              简介:
              {{
                scope.row.intro && scope.row.intro.length > 20
                  ? scope.row.description.substring(0, 20) + '...'
                  : scope.row.description
              }}
            </p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ '详细信息' }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="课时" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.row.lessonNum }}
        </template>
      </el-table-column>
      <el-table-column label="课时价格" align="center" width="80">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column label="课程状态" width="100" align="center">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="Display_time"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.gmtModified }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/save/info/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >修改信息</el-button
            ></router-link
          >
          <router-link :to="'/course/save/chapter/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >修改课程</el-button
            ></router-link
          >
          <!-- </router-link> -->
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeCourseById(scope.row.id, $event)"
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
      :page-size="completeCourseInfo.limit"
      :total="total"
      style="padding: 30px 0; text-align: right"
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
  </div>
</template>
<script>
import courseApi from '@/api/edu/course'
// import searchform from "./searchform";
export default {
  data() {
    //定义变量初始值
    return {
      searchCourseInfo: {
        limit: 10,
      }, //查询之后接口返回集合
      completeCourseInfo: [],
      listLoading: true,
      page: 1,
      limit: 3,
      total: 0,
    }
  },
  created() {
    //页面渲染之前执行一般调用method里面的方法
    this.getList()
  },
  methods: {
    //创建具体方法,调用teacher.js里面定义的方法
    //讲师列表
    clearSearchForm() {
      this.searchCourseInfo = {}
      this.searchCourseInfo.limit = 10
      this.getList()
    },
    removeCourseById(id, event) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        courseApi
          .deleteCourse(id)
          .then((response) => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            this.getList()
          })
          .catch((error) => {
            console.log(error)
          })
      })
      //catch统一不写 有的浏览器  框架本身执行一次 自己执行一次
      // .catch(() => {
      //   this.$message({
      //     type: "info",
      //     message: "已取消删除"
      //   });
      // });

      //取消按钮选中状态
      let target = event.target
      if (target.nodeName == 'SPAN') {
        target = event.target.parentNode
      }
      target.blur()
    },
    getCoursePagination(searchCourseInfo, currentPage) {
      this.page = currentPage
      this.listLoading = true

      courseApi
        .getCoursePagination(searchCourseInfo, this.page)
        .then((response) => {
          // console.log(response);
          this.completeCourseInfo = response.data.completeCourseInfo
          this.total = response.data.total
          this.listLoading = false
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getList(page = 1) {
      //分页隐式传page参数
      this.page = page
      this.getCoursePagination(this.searchCourseInfo, this.page)
    },
  },
}
</script>
