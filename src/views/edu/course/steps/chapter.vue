<template>
  <div class="app-container">
    <el-row :style="{ 'margin-bottom': '20px' }" type="flex" justify="end">
      <el-button size="small">删除</el-button>
      <!-- <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
      >保存并下一步</el-button -->
      <el-button type="primary" size="small" @click="dialogFormVisible = true"
        >新增章节</el-button
      >
      <el-button type="primary" size="small" @click="dialogFormVisible = true"
        >新增小节</el-button
      >
    </el-row>
    <el-tree
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
      default-expand-all
    ></el-tree>
    <div :style="{ 'margin-top': '20px' }">
      <el-button @click="retrunLastStep">上一步</el-button>
      <!-- <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
      >保存并下一步</el-button -->
      <el-button type="primary">保存并下一步</el-button>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <addChapter></addChapter>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div> -->
    </el-dialog>
  </div>
</template>
<<script>
import addChapter from "./addChapter.vue";
import chapter from "@/api/edu/chapter";

export default {
  components: {
    addChapter
  },
  created() {
    this.getChapterVideoList();
  },
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      data: [],
      defaultProps: {
        children: "list",
        label: "title"
      }
    };
  },
  methods: {
    getChapterVideoList() {
      chapter
        .getChapterById(this.$route.params.id)
        .then(response => {
          console.log(response);
          this.data = response.data.chapterList;
        })
        .then(error => {});
    },
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>
<style scoed>
.el-tree-node__children .el-tree-node .el-tree-node__label {
  font-size: 14px;
  margin: ;
}
.el-tree-node__content > .el-tree-node__label {
  font-size: 20px;
}
</style>
