<template>
  <div class="app-container">
    <h1>chapeter</h1>
    <el-button @click="retrunLastStep">上一步</el-button>
    <!-- <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
      >保存并下一步</el-button -->
    <el-button type="primary">保存并下一步</el-button>
  </div>
</template>
<<script>
export default {
  methods: {
    retrunLastStep() {
      console.log(this.$route.name);
      this.$router.push({ path: `/course/save/info/${this.$route.params.id}` });
    }
  }
};
</script>
