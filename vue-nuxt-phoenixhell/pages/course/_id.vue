<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程详情 开始 -->
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <a href="#" title class="c-999 fsize14">首页</a>
        \
        <a href="#" title class="c-999 fsize14">课程列表</a>
        \
        <span class="c-333 fsize14">Java精品课程</span>
      </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px">
          <section class="p-h-video-box" id="videoPlay">
            <img :src="course.cover" :alt="course.title" class="dis c-v-pic" />
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{ course.title }}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>
              <b class="c-yellow" style="font-size: 24px"
                >￥{{ course.price }}</b
              >
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14"
                >主讲： {{ course.teacherName }}&nbsp;&nbsp;&nbsp;</span
              >
            </section>
            <section class="c-attr-mt of">
              <span class="ml10 vam">
                <em class="icon18 scIcon"></em>
                <a class="c-fff vam" title="收藏" href="#">收藏</a>
              </span>
            </section>
            <section class="c-attr-mt">
              <a
                href="#"
                :title="
                  Number(course.price) === 0 || is_payed
                    ? '立即观看'
                    : '立即购买'
                "
                class="comm-btn c-btn-3"
                @click.prevent="buyCourse()"
                >{{
                  Number(course.price) === 0 || is_payed
                    ? '立即观看'
                    : '立即购买'
                }}</a
              >
            </section>
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol clearfix">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ course.buyCount }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ course.lessonNum }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br />
                <h6 class="c-fff f-fM mt10">{{ course.viewCount }}</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"></div>
      </div>
      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程详情">课程详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <p v-html="course.description"></p>
                    </section>
                  </div>
                </div>
                <!-- /课程介绍 -->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>课程大纲</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 文件目录 -->
                          <li
                            class="lh-menu-stair"
                            v-for="chapter in chapterList"
                            :key="chapter.id"
                          >
                            <a
                              href="javascript: void(0)"
                              :title="chapter.title"
                              class="current-1"
                            >
                              <em class="lh-menu-i-1 icon18 mr10"></em
                              >{{ chapter.title }}
                            </a>
                            <ol class="lh-menu-ol" style="display: block">
                              <li
                                class="lh-menu-second ml30"
                                v-for="item in chapter.list"
                                :key="item.id"
                              >
                                <a
                                  :href="'/player/' + item.videoSourceId"
                                  target="_blank"
                                  :title="item.title"
                                >
                                  <span class="fr">
                                    <i class="free-icon vam mr10">免费试听</i>
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em
                                  >{{ item.title }}
                                </a>
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
                <!-- /课程大纲 -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">主讲讲师</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto">
                  <li>
                    <div class="u-face">
                      <a href="#">
                        <img
                          :src="course.avatar"
                          width="50"
                          height="50"
                          :alt="course.avatar"
                        />
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a class="c-333 fsize16 fl" href="#">{{
                        course.teacherName
                      }}</a>
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{ course.intro }}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </aside>
        <div class="clear"></div>
      </div>
      <div class="mt50 commentHtml commentBox">
        <div>
          <h6 class="c-c-content c-infor-title" id="i-art-comment">
            <span class="commentTitle">课程评论</span>
          </h6>
          <section class="lh-bj-list pr mt20 replyhtml" v-if="checkLogin()">
            <ul>
              <li class="unBr">
                <aside class="noter-pic">
                  <img
                    width="50"
                    height="50"
                    class="picImg"
                    :src="userInfo.avatar"
                  />
                </aside>
                <div class="of">
                  <section class="n-reply-wrap">
                    <fieldset>
                      <textarea
                        name=""
                        v-model="comment.content"
                        placeholder="输入您要评论的文字"
                        id="commentContent"
                      ></textarea>
                    </fieldset>
                    <p class="of mt5 tar pl10 pr10">
                      <span class="fl"
                        ><tt
                          class="c-red commentContentmeg"
                          style="display: none"
                        ></tt
                      ></span>
                      <input
                        type="button"
                        @click="addComment()"
                        value="回复"
                        class="lh-reply-btn"
                      />
                    </p>
                  </section>
                </div>
              </li>
            </ul>
          </section>
          <section class="question-list lh-bj-list pr">
            <ul class="pr10">
              <li v-for="(comment, index) in pageInfo.items" v-bind:key="index">
                <aside class="noter-pic">
                  <img
                    width="50"
                    height="50"
                    class="picImg"
                    :src="comment.avatar"
                  />
                </aside>
                <div class="of">
                  <span class="fl">
                    <font class="fsize12 c-blue"> {{ comment.nickname }}</font>
                    <font class="fsize12 c-999 ml5">评论：</font></span
                  >
                </div>
                <div class="noter-txt mt5">
                  <p>{{ comment.content }}</p>
                </div>
                <div class="of mt5">
                  <span class="fr"
                    ><font class="fsize12 c-999 ml5">{{
                      comment.gmtCreate
                    }}</font></span
                  >
                </div>
              </li>
            </ul>
            <!-- 公共分页 开始 -->
            <div>
              <div class="paging">
                <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
                <!-- @clickprevent 阻止a标签跳转 -->
                <a
                  href="#"
                  title="首页"
                  @click.prevent="
                    pageInfo.current == 1 ? '' : getCommnetsByCourseId(1)
                  "
                  :class="{ undisable: !pageInfo.hasPrevious }"
                  >首</a
                >
                <a
                  href="javascript:void(0)"
                  title="前一页"
                  @click="
                    pageInfo.hasPrevious
                      ? getCommnetsByCourseId(pageInfo.current - 1)
                      : ''
                  "
                  :class="{ undisable: !pageInfo.hasPrevious }"
                  >&lt;</a
                >
                <a
                  v-for="page in pageInfo.totalPages"
                  href="javascript:void(0)"
                  :title="'第' + page + '页'"
                  @click="
                    pageInfo.current == page ? '' : getCommnetsByCourseId(page)
                  "
                  :class="page == pageInfo.current ? 'current undisable' : ''"
                  :key="page"
                  >{{ page }}</a
                >
                <a
                  href="javascript:void(0)"
                  title="后一页"
                  @click="
                    pageInfo.hasNext
                      ? getCommnetsByCourseId(pageInfo.current + 1)
                      : ''
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
                      : getCommnetsByCourseId(pageInfo.totalPages)
                  "
                  >末</a
                >
                <div class="clear"></div>
              </div>
            </div>
            <!-- 公共分页 结束 -->
          </section>
        </div>
      </div>
    </section>

    <!-- /课程详情 结束 -->
  </div>
</template>

<script>
import cookie from 'js-cookie'
export default {
  data() {
    return {
      course: {
        cover:
          'https://phoenixhell.oss-cn-shanghai.aliyuncs.com/2021/03/05/46ae2a8cacb8410385a1e018279a3cae.jpg',
      },
      chapterList: [],
      pageInfo: {}, //显示评论
      comment: {
        content: '',
      }, //写评论
      userInfo: {},
      is_payed: false,
    }
  },
  created() {
    this.getCourseById(this.$route.params.id)
    this.getUserInfo()
    this.IsPayed()
  },
  methods: {
    getCourseById(id) {
      this.$axios
        .$get(`/serviceEdu/front/teacher/completeCourse/${id}`)
        .then((response) => {
          this.getCommnetsByCourseId()

          this.course = response.data.completeCourseInfo
          this.chapterList = response.data.chapterList
          this.comment.courseId = this.$route.params.id
          this.comment.teacherId = this.course.teacherId
          console.log(response)
        })
    },
    getCommnetsByCourseId(page = 1, limit = 5) {
      this.$axios
        .$get(
          `/serviceEdu/eduComment/${this.$route.params.id}/${page}/${limit}`
        )
        .then((response) => {
          console.log(response)
          this.pageInfo = response.data.pageInfo
        })
    },
    checkLogin() {
      if (cookie.get('ucenter')) {
        return true
      } else {
        return false
      }
    },
    getUserInfo() {
      //这边用json.parse cookie 取得值也一样
      this.userInfo = this.$store.state.ucenter
      this.comment.memberId = this.userInfo.id
      this.comment.nickname = this.userInfo.nickname
      this.comment.avatar = this.userInfo.avatar
    },
    addComment() {
      this.$axios
        .$post(`/serviceEdu/eduComment/add`, this.comment)
        .then((response) => {
          // console.log(response)
          this.comment.content = ''
          this.getCommnetsByCourseId(this.$route.params.id)
        })
    },
    buyCourse() {
      if (this.is_payed) {
        if (this.chapterList.length == 0) {
          this.$message({
            type: 'info',
            message: '此课程没有章节',
          })
        } else {
          this.$router.push(
            '/player/' + this.chapterList[0].list[0].videoSourceId
          )
        }
      } else {
        this.$axios
          .$post(`/serviceOrder/order/create/${this.$route.params.id}`)
          .then((response) => {
            if (response.data.orderId == '' || response.data.orderId == null) {
              this.$message({
                type: 'danger',
                message: '出错请重新购买',
              })
            } else {
              this.$router.push('/order/' + response.data.orderId)
            }
            console.log(response)
          })
      }
    },
    //获取订单状态status=1已经支付
    IsPayed() {
      this.$axios
        .$get(
          `/serviceOrder/order/payStatus/${this.$route.params.id}/${this.userInfo.id}`
        )
        .then((response) => {
          console.log(response)
          this.is_payed = response.data.isPayed
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
<style scoped>
@media (max-width: 991px) and (min-width: 768px) {
  #videoPlay img {
    width: 100%;
    height: 206px;
  }
}

@media (min-width: 1300px) {
  #videoPlay img {
    width: 100%;
    height: 357px;
  }
}
.commentBox {
  background-color: #fff;
  border: 1px solid #f0f0f0;
  padding: 20px 0 15px 25px;
  overflow: hidden;
}
</style>
