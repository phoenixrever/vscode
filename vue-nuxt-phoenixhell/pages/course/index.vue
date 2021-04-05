<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a
                    title="全部"
                    href="#"
                    :class="{ 'current bg-orange': !currentSubTwo.length > 0 }"
                    @click.prevent="getAllsub()"
                    >全部</a
                  >
                </li>
                <li v-for="sub in allSubject" :key="sub.id">
                  <a
                    :title="sub.label"
                    href="#"
                    :class="{
                      'current bg-orange':
                        seachParam.subjectLevelOne == sub.label
                    }"
                    @click.prevent="subClick(sub)"
                    >{{ sub.label }}</a
                  >
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li" v-if="currentSubTwo.length">
              <ul class="clearfix">
                <li v-for="subTwo in currentSubTwo" :key="subTwo.id">
                  <a
                    :title="subTwo.label"
                    href="#"
                    :class="{
                      'current bg-orange':
                        seachParam.subjectLevelTwo == subTwo.label
                    }"
                    @click.prevent="subTwoClick(subTwo)"
                    >{{ subTwo.label }}</a
                  >
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li :class="{ 'current bg-orange': seachParam.gmtModified }">
                <a title="最新" href="#" @click.prevent="sortByDate">最新</a>
              </li>
              <li :class="{ 'current bg-orange': seachParam.viewCount }">
                <a title="关注度" href="#" @click.prevent="sortByView"
                  >关注度</a
                >
              </li>

              <li :class="seachParam.price === '' ? '' : 'current bg-orange'">
                <a title="价格" href="#" @click.prevent="sortByPrice"
                  >价格&nbsp;
                  <span>↓</span>
                </a>
              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="courses.length == 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam"
              >没有相关数据，小编正在努力整理中...</span
            >
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list" v-if="courses.length > 1">
            <ul class="of" id="bna">
              <li v-for="course in courses" :key="course.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img
                      :src="course.cover"
                      class="img-responsive"
                      :alt="course.title"
                    />
                    <div class="cc-mask">
                      <a
                        :href="'/course/' + course.id"
                        title="开始学习"
                        class="comm-btn c-btn-1"
                        >开始学习</a
                      >
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a
                      :href="'/course/' + course.id"
                      :title="course.title"
                      class="course-title fsize18 c-333"
                      >{{ course.title }}</a
                    >
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA">{{
                        course.price == 0 ? "免费" : "收费"
                      }}</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{ course.buyCount }}人学习</i>
                      |
                      <i class="c-999 f-fA">{{ course.viewCount }}评论</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
            <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
            <!-- @clickprevent 阻止a标签跳转 -->
            <a
              href="#"
              title="首页"
              @click.prevent="pageInfo.current == 1 ? '' : getCourseInfo(1)"
              :class="{ undisable: !pageInfo.hasPrevious }"
              >首</a
            >
            <a
              href="javascript:void(0)"
              title="前一页"
              @click="
                pageInfo.hasPrevious ? getCourseInfo(pageInfo.current - 1) : ''
              "
              :class="{ undisable: !pageInfo.hasPrevious }"
              >&lt;</a
            >
            <a
              v-for="page in pageInfo.totalPages"
              href="javascript:void(0)"
              :title="'第' + page + '页'"
              @click="pageInfo.current == page ? '' : getCourseInfo(page)"
              :class="page == pageInfo.current ? 'current undisable' : ''"
              :key="page"
              >{{ page }}</a
            >
            <a
              href="javascript:void(0)"
              title="后一页"
              @click="
                pageInfo.hasNext ? getCourseInfo(pageInfo.current + 1) : ''
              "
              :class="{ undisable: !pageInfo.hasNext }"
              >&gt;</a
            >
            <a
              href="javascript:void(0)"
              title="末页"
              :class="{ undisable: !pageInfo.hasNext }"
              @click="
                pageInfo.current == pageInfo.totalPages
                  ? ''
                  : getCourseInfo(pageInfo.totalPages)
              "
              >末</a
            >
            <div class="clear"></div>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageInfo: {},
      allSubject: {},
      courses: {},
      currentSubTwo: {},
      seachParam: {
        limit: 8,
        viewCount: "",
        gmtModified: 1,
        price: "",
        subjectLevelOne: "",
        subjectLevelTwo: ""
      }
    };
  },
  created() {
    this.getCourseInfo(1);
  },
  methods: {
    getAllsub() {
      this.currentSubTwo = {};
      this.seachParam.subjectLevelOne = "";
      this.seachParam.subjectLevelTwo = "";
      this.getCourseInfo(1);
    },
    subClick(sub) {
      this.seachParam.subjectLevelOne = sub.label;
      this.currentSubTwo = sub.children;
      this.getCourseInfo(1);
    },
    subTwoClick(subTwo) {
      this.seachParam.subjectLevelTwo = subTwo.label;
      this.getCourseInfo(1);
    },
    getCourseInfo(page) {
      this.$axios
        .$post(`/serviceEdu/front/teacher/search/${page}`, this.seachParam)
        .then(response => {
          console.log(response);
          this.pageInfo = response.data;
          this.allSubject = response.data.allSubject;
          this.courses = response.data.completeCourseInfo;
        });
    },
    sortByView() {
      this.seachParam.gmtModified = "";
      this.seachParam.price = "";
      if (this.seachParam.viewCount === "") {
        this.seachParam.viewCount = 1;
      } else {
        this.seachParam.viewCount = "";
      }
      console.log(this.seachParam);
      this.getCourseInfo(1);
    },
    sortByDate() {
      this.seachParam.price = "";
      this.seachParam.viewCount = "";
      if (this.seachParam.gmtModified === "") {
        this.seachParam.gmtModified = 1;
      } else {
        this.seachParam.gmtModified = "";
      }
      this.getCourseInfo(1);
    },
    sortByPrice() {
      this.seachParam.viewCount = "";
      this.seachParam.gmtModified = "";
      if (this.seachParam.price === "") {
        this.seachParam.price = 1;
      } else {
        this.seachParam.price = "";
      }
      this.getCourseInfo(1);
    }
  }
};
</script>
