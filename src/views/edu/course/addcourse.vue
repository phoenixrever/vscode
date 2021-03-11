<template>
  <div class="app-container">
    <el-row :gutter="10" type="flex" justify="center">
      <el-col :xs="20" :sm="20" :md="20" :lg="16" :xl="16">
        <h2 style="text-align: center;">发布新课程</h2>

        <el-steps
          :active="active"
          finish-status="success"
          style="margin-bottom: 40px;"
        >
          <el-step title="步骤 1" icon="el-icon-edit"></el-step>
          <el-step title="步骤 2" icon="el-icon-upload"></el-step>
          <el-step title="步骤 3" icon="el-icon-picture"></el-step>
        </el-steps>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      status: "process"
    };
  },

  watch: {
    $route(to, from) {
      if (to.name === "courseChapter" && from.name === "courseInfo") {
        this.active++;
      }

      if (to.name === "courseChapter" && from.name === "coursePublish") {
        this.active++;
      }
      if (from.name === "courseChapter" && to.name === "courseInfo") {
        this.active--;
      }

      if (from.name === "courseChapter" && to.name === "coursePublish") {
        this.active--;
      }
    }
  },

  methods: {}
};
</script>
