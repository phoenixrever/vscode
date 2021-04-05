<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="Filter keyword"
      style="margin-bottom:30px;"
    />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
  </div>
</template>

<script>
import subjectlist from "@/api/edu/subject";
export default {
  created() {
    subjectlist
      .subjectlist()
      .then(response => {
        this.data2 = response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  data() {
    return {
      filterText: "",
      data2: [],
      defaultProps: {
        // children: "twoSubjectList",
        children: "children",
        // label: "title"
        label: "label"
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    }
  }
};
</script>
