<template>
  <div class="in-wrap">
    <!-- 公共头引入 -->
    <header id="header">
      <section class="container">
        <h1 id="logo">
          <a href="#" title="谷粒学院">
            <img src="~/assets/img/logo.png" width="100%" alt="谷粒学院" />
          </a>
        </h1>
        <div class="h-r-nsl">
          <ul class="nav">
            <router-link to="/" tag="li" active-class="current" exact>
              <a>首页</a>
            </router-link>
            <router-link to="/course" tag="li" active-class="current">
              <a>课程</a>
            </router-link>
            <router-link to="/teacher" tag="li" active-class="current">
              <a>名师</a>
            </router-link>
            <router-link to="/article" tag="li" active-class="current">
              <a>文章</a>
            </router-link>
            <router-link to="/qa" tag="li" active-class="current">
              <a>问答</a>
            </router-link>
          </ul>
          <!-- / nav -->
          <ul class="h-r-login">
            <li id="no-login" v-if="!user.id">
              <a href="/login" title="登录">
                <em class="icon18 login-icon">&nbsp;</em>
                <span class="vam ml5">登录</span>
              </a>
              |
              <a href="/register" title="注册">
                <span class="vam ml5">注册</span>
              </a>
            </li>
            <li class="mr10" id="is-login-one">
              <a href="#" title="消息" id="headerMsgCountId" v-if="user.id">
                <em class="icon18 news-icon">&nbsp;</em>
              </a>
              <q class="red-point" v-if="user.id">&nbsp;</q>
            </li>
            <li class="h-r-user" id="is-login-two" v-if="user.id">
              <a href="#" title>
                <img
                  :src="user.avatar"
                  width="30"
                  height="30"
                  class="vam picImg"
                  alt
                />
                <span class="vam" id="userName">
                  {{ user.nickname }}
                </span>
              </a>
              <a
                href="javascript:void(0)"
                title="退出"
                @click="exit"
                class="ml5"
                >退出</a
              >
            </li>
            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>
          <aside class="h-r-search">
            <form action="#" method="post">
              <label class="h-r-s-box">
                <input
                  type="text"
                  placeholder="输入你想学的课程"
                  name="queryCourse.courseName"
                  value
                />
                <button type="submit" class="s-btn">
                  <em class="icon18">&nbsp;</em>
                </button>
              </label>
            </form>
          </aside>
        </div>
        <aside class="mw-nav-btn">
          <div class="mw-nav-icon"></div>
        </aside>
        <div class="clear"></div>
      </section>
    </header>
    <!-- /公共头引入 -->

    <Nuxt />

    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div class>
          <h4 class="hLh30">
            <span class="fsize18 f-fM c-999">友情链接</span>
          </h4>
          <ul class="of flink-list">
            <li>
              <a href="http://www.atguigu.com/" title="尚硅谷" target="_blank"
                >尚硅谷</a
              >
            </li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="关于我们" target="_blank">关于我们</a>|
                <a href="#" title="联系我们" target="_blank">联系我们</a>|
                <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                <a href="#" title="资源下载" target="_blank">资源下载</a>|
                <span>服务热线：010-56253825(北京) 0755-85293825(深圳)</span>
                <span>Email：info@atguigu.com</span>
              </section>
              <section class="b-f-link mt10">
                <span>©2018课程版权均归谷粒学院所有 京ICP备17055252号</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt />
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt />
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->
  </div>
</template>
<script>
import '~/assets/css/reset.css'
import '~/assets/css/theme.css'
import '~/assets/css/global.css'
import '~/assets/css/web.css'
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import '~/assets/css/swiper-3.3.1.min.css'
import '~/assets/css/pages-weixinpay.css'
import cookie from 'js-cookie'

export default {
  data() {
    return {
      token: '',
      user: {},
    }
  },
  created() {
    if (this.$route.query.token) {
      this.wxLogin()
    }
    this.showUserInfo()
  },
  methods: {
    wxLogin() {
      cookie.set('token', this.$route.query.token, { domain: 'localhost' })
      cookie.set('ucenter', '', { domain: 'localhost' })
      //登录成功根据token获取用户信息
      this.$axios.$get('/serviceUcenter/member/info').then((response) => {
        this.user = response.data.user
        //登录信息存入vuex store
        this.$store.commit('add', this.user)
        //将用户信息记录cookie
        cookie.set('ucenter', this.user, {
          domain: 'localhost',
        })
      })
    },
    showUserInfo() {
      if (cookie.get('ucenter')) {
        this.user = JSON.parse(cookie.get('ucenter'))
        //登录信息存入vuex store
        this.$store.commit('add', this.user)
      }
    },
    exit() {
      cookie.set('token', '', { domain: 'localhost' })
      cookie.set('ucenter', '', { domain: 'localhost' })
      this.$store.commit('remove')
      this.user = {}
      this.token = ''
      this.$router.push('/')
    },
  },
}
</script>
