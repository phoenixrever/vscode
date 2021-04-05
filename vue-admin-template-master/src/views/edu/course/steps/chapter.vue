<template>
  <div class="app-container">
    <el-row :style="{ 'margin-bottom': '20px' }" type="flex" justify="end">
      <el-button type="warning" size="small" @click="prev">上一步</el-button>

      <el-button type="primary" size="small" @click="dialogFormVisible = true"
        >新增章节</el-button
      >
      <el-button type="primary" size="small" @click="next">下一步</el-button>
    </el-row>
    <div class="block">
      <el-tree
        :data="data"
        node-key="id"
        :props="defaultProps"
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
        default-expand-all
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button
              v-if="node.level === 1"
              type="text"
              size="small"
              @click="() => add(data)"
            >
              <i class="el-icon-plus"></i>
            </el-button>
            <el-button type="text" size="small" @click="() => edit(node, data)">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="() => remove(node, data)"
            >
              <i class="el-icon-delete"></i>
            </el-button>
          </span>
        </span>
        ></el-tree
      >
    </div>

    <el-dialog title="添加章节" :visible.sync="dialogFormVisible">
      <addChapter @refresh="refresh"></addChapter>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div> -->
    </el-dialog>
    <el-dialog title="增加小结" :visible.sync="dialogVideoVisible">
      <addVideo @refresh="refresh" :chapter="chapter"> </addVideo>
    </el-dialog>
    <el-dialog title="修改小结" :visible.sync="dialogEditVideoVisible">
      <editVideo @refresh="refresh" :chapterVideos="chapterVideos"> </editVideo>
    </el-dialog>
  </div>
</template>
<<script>
import addChapter from "./addChapter.vue";
import addVideo from "./addVideo.vue";
import editVideo from "./editVideo.vue";
import chapter from "@/api/edu/chapter";
import video from "@/api/edu/video";

export default {
  components: {
    addChapter,
    addVideo,
    editVideo
  },
  created() {
    this.getChapterVideoList();
  },
  data() {
    return {
      dialogFormVisible: false,
      dialogVideoVisible: false,
      dialogEditVideoVisible: false,
      data: [],
      defaultProps: {
        children: "list",
        label: "title"
      },
      chapter: {},
      chapterVideos: {}
    };
  },
  methods: {
    refresh() {
      this.dialogFormVisible = false;
      this.dialogVideoVisible = false;
      this.dialogEditVideoVisible = false;

      this.getChapterVideoList();
    },

    getChapterVideoList() {
      chapter
        .getChapterById(this.$route.params.id)
        .then(response => {
          // console.log(response);
          this.data = response.data.chapterList;
        })
        .then(error => {});
    },
    handleNodeClick(data) {
      // console.log(data);
    },
    retrunLastStep() {
      this.$router.push({
        path: `/course/save/info/${this.$route.params.id}`
      });
    },
    edit(node, data) {
      // console.log(data);
      if (node.level > 1) {
        this.editVideo(data);
      } else {
        this.editChapter(data);
      }
    },
    editChapter(data) {
      this.$prompt("原章节名称:" + data.title, "修改章节名称", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\s\S]+$/,
        inputValue: data.title,
        inputErrorMessage: "不能为空",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            console.log(instance.inputValue);
            data.title = instance.inputValue;
            chapter
              .editChapter(data)
              .then(response => {
                instance.confirmButtonLoading = false;
                done();
                this.$message({
                  type: "success",
                  message: "修改成功"
                });
              })
              .catch(error => {
                instance.confirmButtonLoading = false;
                console.log(error);
                done();
              });
          } else {
            done();
          }
        }
      }).catch(() => {
        this.$message({
          type: "info",
          message: "取消输入"
        });
      });
    },
    // editVideo(data) {
    //   this.$prompt("原小节名称:" + data.title, "修改小节名称", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     inputPattern: /^[\s\S]+$/,
    //     inputValue: data.title,
    //     inputErrorMessage: "不能为空",
    //     beforeClose: (action, instance, done) => {
    //       if (action === "confirm") {
    //         instance.confirmButtonLoading = true;
    //         instance.confirmButtonText = "执行中...";
    //         console.log(instance.inputValue);
    //         data.title = instance.inputValue;
    //         video
    //           .editVideo(data)
    //           .then(response => {
    //             instance.confirmButtonLoading = false;
    //             done();
    //             this.$message({
    //               type: "success",
    //               message: "修改成功"
    //             });
    //           })
    //           .catch(error => {
    //             instance.confirmButtonLoading = false;
    //             console.log(error);
    //             done();
    //           });
    //       } else {
    //         done();
    //       }
    //     }
    //   }).catch(error => {
    //     this.$message({
    //       type: "info",
    //       message: "取消输入"
    //     });
    //   });
    // },
    editVideo(data) {
      // console.log(data);
      this.chapterVideos = data;
      this.dialogEditVideoVisible = true;
    },
    add(data) {
      this.dialogVideoVisible = true;

      // console.log(this.data);
      this.data.forEach(element => {
        if (element.id === data.id) {
          this.chapter = element;
        }
      });
      // console.log(this.chapter);
    },
    deleteChapter(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            chapter
              .deleteChapterById(data.id)
              .then(response => {
                // console.log(response);
                instance.confirmButtonLoading = false;
                done();

                this.getChapterVideoList();
                this.$message({
                  type: "info",
                  message: "删除成功"
                });
              })
              .catch(error => {
                instance.confirmButtonLoading = false;
                console.log(error);
                done();
              });
          } else {
            done();
          }
        }
      }).catch(error => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },
    deleteVideo(data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            video
              .deleteVideoById(data.id)
              .then(response => {
                console.log(response);
                done();
                instance.confirmButtonLoading = false;
                this.getChapterVideoList();
                this.$message({
                  type: "info",
                  message: "删除成功"
                });
              })
              .catch(error => {
                instance.confirmButtonLoading = false;
                console.log(error);
                done();
              });
          } else {
            done();
          }
        }
      }).catch(error => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },
    remove(node, data) {
      if (node.level > 1) {
        this.deleteVideo(data);
      } else {
        this.deleteChapter(data);
      }
    },
    next() {
      if (this.data == "") {
        this.$message({
          type: "warning",
          message: "请添加章节"
        });
      } else {
        this.$router.push({
          path: `/course/save/publish/${this.$route.params.id}`
        });
      }
    },
    prev() {
      this.$router.push({
        path: `/course/save/info/${this.$route.params.id}`
      });
    }
  }
};
</script>
<style scoed>
/* .custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
} */

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 18px;
  padding-right: 8px;
}

.custom-tree-node .el-icon-delete {
  color: red;
  font-size: 15px;
}
.custom-tree-node button {
  margin-left: 20px;
}
.el-icon-plus {
  color: green;
  font-size: 15px;
}
.el-icon-edit {
  font-size: 15px;
}
.el-tree-node {
  margin: 10px 0;
}
</style>
