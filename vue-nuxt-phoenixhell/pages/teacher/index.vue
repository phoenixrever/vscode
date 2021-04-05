<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title all-teacher-title">
        <h2 class="fl tac">
          <span class="c-333">全部讲师</span>
        </h2>
        <section class="c-tab-title">
          <a id="subjectAll" title="全部" href="#">全部</a>
          <!-- <c:forEach var="subject" items="${subjectList }">
                            <a id="${subject.subjectId}" title="${subject.subjectName }" href="javascript:void(0)" onclick="submitForm(${subject.subjectId})">${subject.subjectName }</a>
          </c:forEach>-->
        </section>
      </header>
      <section class="c-sort-box unBr">
        <div>
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="pageInfo.total == 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam"
              >没有相关数据，小编正在努力整理中...</span
            >
          </section>
          <!-- /无数据提示 结束-->
          <article class="i-teacher-list" v-if="pageInfo.total > 0">
            <ul class="of">
              <li v-for="item in pageInfo.items" :key="item.id">
                <section class="i-teach-wrap">
                  <div class="i-teach-pic">
                    <a
                      :href="'/teacher/' + item.id"
                      :title="item.name"
                      target="_blank"
                    >
                      <img :src="item.avatar" :alt="item.name" />
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <a
                      :href="'/teacher/' + item.id"
                      :title="item.name"
                      target="_blank"
                      class="fsize18 c-666"
                      >{{ item.name }}</a
                    >
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">{{ item.career }}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{ item.intro }}</p>
                  </div>
                </section>
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
              @click.prevent="pageInfo.current == 1 ? '' : getTeacherPages(1)"
              :class="{ undisable: !pageInfo.hasPrevious }"
              >首</a
            >
            <a
              href="javascript:void(0)"
              title="前一页"
              @click="
                pageInfo.hasPrevious
                  ? getTeacherPages(pageInfo.current - 1)
                  : ''
              "
              :class="{ undisable: !pageInfo.hasPrevious }"
              >&lt;</a
            >
            <a
              v-for="page in pageInfo.totalPages"
              href="javascript:void(0)"
              :title="'第' + page + '页'"
              @click="pageInfo.current == page ? '' : getTeacherPages(page)"
              :class="page == pageInfo.current ? 'current undisable' : ''"
              :key="page"
              >{{ page }}</a
            >
            <a
              href="javascript:void(0)"
              title="后一页"
              @click="
                pageInfo.hasNext ? getTeacherPages(pageInfo.current + 1) : ''
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
                  : getTeacherPages(pageInfo.totalPages)
              "
              >末</a
            >
            <div class="clear"></div>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /讲师列表 结束 -->
  </div>
</template>
<script>
export default {
  //异步调用 相当于 this.$route.params 首次加载页面调用 只执行一次
  //需要http插件nuxt/http 插件
  //https://zh.nuxtjs.org/docs/2.x/features/data-fetching/#async-data
  // async asyncData({ params, $http, error }) {
  //   const pageInfo = await $http.$get(`/serviceEdu/front/teacher/page/1/4`)
  //   return { pageInfo }
  // },
  data() {
    return {
      pageInfo: {
        currentPage: 1
      },
      limit: 8
    };
  },
  created() {
    this.getTeacherPages(1);
  },
  methods: {
    getTeacherPages(currentPage, limit = this.limit) {
      this.$axios
        .$get(`/serviceEdu/front/teacher/page/${currentPage}/${limit}`)
        .then(response => {
          this.pageInfo = response.data;
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
