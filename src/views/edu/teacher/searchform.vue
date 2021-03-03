<template>
  <div >
     <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline" size="medium">
      <el-form-item>
        <el-input v-model="teacherList.name" placeholder="讲师名"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="teacherList.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker
          v-model="teacherList.begin"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="teacherList.end"
          type="datetime"
          placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
        />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="fetchData()" size="medium">查询</el-button>
      <el-button type="danger" @click="resetData()" size="medium">清空</el-button>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        //属性名不写也没关系 会自动写进去
        teacherList: {
          name: '',
          level: '',
          begin:'',
          end:''
        }
      }
    },
    methods: {
      fetchData(){
        this.$emit("searchParam",this.teacherList)//调用父类searchParam方法
      },
      resetData(){
        this.teacherList={} //不能写"" 会导致data-pick bug
        this.fetchData()
      }
    }
  }
</script>