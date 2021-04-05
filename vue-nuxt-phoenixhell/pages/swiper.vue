<template>
  <div class="block">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in items" :key="item.id">
        <img :src="item.imageUrl" :alt="item.title" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import bannerApi from '@/api/banner'
export default {
  data() {
    return {
      items: [
        // { id: 0, src: require("../assets/photo/banner/1525939573202.jpg") }
        // {
        //   id: 1,
        //   src: require("../assets/photo/banner/153525d0ef15459596.jpg")
        // }
      ],
    }
  },
  created() {
    this.getBanner()
  },
  methods: {
    getBanner() {
      this.$axios
        .$get('/serviceCms/bannerAdmin/list', { progress: true })
        .then((response) => {
          console.log(response)
          let list = response.data.list
          //怎么往json数组中加入键值对
          // for (let i = 0; i < list.length; i++) {
          //   const element = list[i]
          //   var temp = {}
          //   temp.id = element.id
          //   temp.src = element.imageUrl
          //   this.items.push(temp)
          // }
          this.items = list
        })
        .then((error) => {
          // console.log(error)
        })
    },
  },
}
</script>

<style>
.el-carousel__item {
  background-position: center;
  background-size: cover;
}

img {
  /*设置图片宽度和浏览器宽度一致*/
  width: 100%;
  /* height:100% */
  height: inherit;
}
</style>
