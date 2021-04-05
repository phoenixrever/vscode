<template>
  <div>
    <!-- 幻灯片 开始 -->
    <!-- <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" style="background: #040B1B;">
          <a target="_blank" href="/">
            <img
              src="~/assets/photo/banner/1525939573202.jpg"
              alt="首页banner"
            />
          </a>
        </div>
        <div class="swiper-slide" style="background: #040B1B;">
          <a target="_blank" href="/">
            <img
              src="@/assets/photo/banner/153525d0ef15459596.jpg"
              alt="首页banner"
            />
          </a>
        </div>
      </div>
      <div class="swiper-pagination swiper-pagination-white"></div>
      <div
        class="swiper-button-prev swiper-button-white"
        slot="button-prev"
      ></div>
      <div
        class="swiper-button-next swiper-button-white"
        slot="button-next"
      ></div> -->
    <!-- </div> -->
    <swiper></swiper>
    <!-- 幻灯片 结束 -->
    <div id="aCoursesList">
      <!-- 网校课程 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门课程</span>
            </h2>
          </header>
          <div>
            <article class="comm-course-list">
              <ul class="of" id="bna">
                <li v-for="course in sortedCourse" :key="course.id">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        v-if="checkImgExists(course.cover)"
                        :src="course.cover"
                        class="img-responsive"
                        :alt="course.title"
                      />
                      <el-image v-if="!checkImgExists(course.cover)">
                        <div slot="error" class="image-slot">
                          <img
                            src="https://guli-file-190513.oss-cn-beijing.aliyuncs.com/cover/default.gif"
                            class="img-responsive"
                            :alt="course.title"
                          />
                        </div>
                      </el-image>

                      <div class="cc-mask">
                        <a href="#" title="开始学习" class="comm-btn c-btn-1">{{
                          '开始学习'
                        }}</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a
                        href="#"
                        :title="course.title"
                        class="course-title fsize18 c-333"
                        >{{ course.title }}</a
                      >
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green">
                        <i class="c-fff fsize12 f-fA">{{
                          course.price == 0 ? '免费' : '收费'
                        }}</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">{{ course.buyCount }}</i>
                        <i class="c-999 f-fA">{{ course.viewCount }}</i>
                      </span>
                    </section>
                  </div>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="#" title="全部课程" class="comm-btn c-btn-2">全部课程</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校课程 结束 -->
      <!-- 网校名师 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">名师大咖</span>
            </h2>
          </header>
          <div>
            <article class="i-teacher-list">
              <ul class="of">
                <li v-for="teacher in sortTeacher" :key="teacher.id">
                  <section class="i-teach-wrap">
                    <div class="i-teach-pic">
                      <a href="/teacher/1" :title="teacher.name">
                        <img
                          :alt="teacher.name"
                          :src="
                            checkImgExists(teacher.avatar)
                              ? teacher.avatar
                              : require('../assets/photo/teacher/1442297919077.jpg')
                          "
                        />
                      </a>
                    </div>
                    <div class="mt10 hLh30 txtOf tac">
                      <a
                        href="/teacher/1"
                        :title="teacher.name"
                        class="fsize18 c-666"
                        >{{ teacher.name }}</a
                      >
                    </div>
                    <div class="hLh30 txtOf tac">
                      <span class="fsize14 c-999">{{ teacher.intro }}</span>
                    </div>
                    <div class="mt15 i-q-txt">
                      <p class="c-999 f-fA">
                        {{ teacher.career }}
                      </p>
                    </div>
                  </section>
                </li>
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="#" title="全部讲师" class="comm-btn c-btn-2">全部讲师</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校名师 结束 -->
    </div>
  </div>
</template>

<script>
import swiper from './swiper.vue'
export default {
  components: { swiper },
  data() {
    return {
      // swiperOption: {
      //   effect: "fade",
      //   //配置分页
      //   pagination: {
      //     el: ".swiper-pagination" //分页的dom节点
      //   },
      //   //配置导航
      //   navigation: {
      //     nextEl: ".swiper-button-next", //下一页dom节点
      //     prevEl: ".swiper-button-prev" //前一页dom节点
      //   }
      // }
      sortedCourse: [],
      sortTeacher: [],
    }
  },
  created() {
    this.getCourseTeacher()
  },
  methods: {
    checkImgExists(imgurl) {
      var ImgObj = new Image() //判断图片是否存在
      ImgObj.src = imgurl
      //存在图片
      if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
        return true
      } else {
        return false
      }
    },
    getCourseTeacher() {
      this.$axios
        .$get('/serviceCms/bannerFront/course/sortViewDesc')
        .then((response) => {
          console.log(response)
          this.sortedCourse = response.data.courses
          this.sortTeacher = response.data.teacher
        })
        .catch((error) => {
          console.error(error)
        })
    },
  },
}
</script>
