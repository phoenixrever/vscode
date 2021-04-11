import Vue from "vue";
import Router from "vue-router";

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from "../views/layout/Layout";

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  },
  { path: "/404", component: () => import("@/views/404"), hidden: true },

  // 首页
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    name: "Dashboard",
    children: [
      {
        path: "dashboard",
        name: "sasdsd",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "谷粒学院后台首页", icon: "dashboard" }
      }
    ]
  }
];
/**
 * 动态路由
 */
export const asyncRoutes = [
  // 讲师管理
  {
    path: "/teacher",
    component: Layout,
    redirect: "/teacher/table",
    name: "讲师管理",
    meta: { title: "讲师管理", icon: "example" },
    children: [
      {
        path: "table",
        name: "讲师列表",
        component: () => import("@/views/edu/teacher/list"), //@/ 相当于./  当前路径
        meta: { title: "讲师列表", icon: "table" }
      },
      {
        path: "avatar",
        name: "avatar",
        component: () => import("@/views/edu/teacher/avatar"),
        meta: { title: "添加讲师", icon: "tree" }
      },
      // created() {
      // 判断当前路径是否包含id的参数(/:id)
      //   console.log('created')
      //   if (this.$route.params && this.$route.params.id) {
      //     const id = this.$route.params.id
      //     this.fetchDataById(id)
      //   }
      // }
      {
        path: "edit/:id", //:和react的:id 一样
        name: "EduTeacherEdit",
        component: () => import("@/views/edu/teacher/save"),
        meta: { title: "编辑讲师", noCache: true },
        hidden: true //隐藏此路由
      }
    ]
  },
  {
    path: "/subject",
    component: Layout,
    redirect: "/subject/list",
    name: "课程分类管理",
    meta: { title: "课程分类管理", icon: "form" },
    children: [
      {
        path: "list",
        name: "课程分类列表",
        component: () => import("@/views/edu/subject/list"), //@/ 相当于./  当前路径
        meta: { title: "课程分类列表", icon: "table" }
      },
      {
        path: "save",
        name: "添加课程分类",
        component: () => import("@/views/edu/subject/save"),
        meta: { title: "添加课程分类", icon: "tree" }
      }
    ]
  },
  {
    path: "/course",
    component: Layout,
    redirect: "/course/list",
    name: "课程管理",
    meta: { title: "课程管理", icon: "form" },
    children: [
      {
        path: "list",
        name: "课程列表",
        component: () => import("@/views/edu/course/list"), //@/ 相当于./  当前路径
        meta: { title: "课程列表", icon: "table" }
      },
      {
        path: "save",
        name: "课程操作",
        redirect: "/course/save/info", //注redirect要从根路由算起
        component: () => import("@/views/edu/course/addcourse"),
        meta: { title: "课程操作", icon: "tree" },
        children: [
          {
            path: "info", //:和react的:id 一样
            name: "courseInfo",
            component: () => import("@/views/edu/course/steps/info"),
            meta: { title: "添加课程基本信息", noCache: true }
            // hidden: true //隐藏此路由
          },
          {
            path: "info/:id", //:和react的:id 一样
            name: "editCourseInfo",
            component: () => import("@/views/edu/course/steps/info"),
            meta: { title: "编辑课程基本信息", noCache: true },
            hidden: true //隐藏此路由
          },
          {
            path: "chapter/:id", //:和react的:id 一样
            name: "courseChapter",
            component: () => import("@/views/edu/course/steps/chapter"),
            meta: { title: "编辑课程大纲", noCache: true },
            hidden: true //隐藏此路由
          },
          {
            path: "publish/:id", //:和react的:id 一样
            name: "coursePublish",
            component: () => import("@/views/edu/course/steps/publish"),
            meta: { title: "发布课程", noCache: true },
            hidden: true //隐藏此路由
          }
        ]
      }
    ]
  },
  {
    path: "/statistics/daily",
    component: Layout,
    redirect: "/statistics/daily/create",
    name: "Statistics",
    meta: { title: "统计分析", icon: "chart" },
    children: [
      {
        path: "create",
        name: "StatisticsDailyCreate",
        component: () => import("@/views/statistics/daily/create"),
        meta: { title: "生成统计" }
      }
    ]
  },
  {
    path: "/acl",
    component: Layout,
    redirect: "/acl/user/list",
    name: "权限管理",
    meta: { title: "权限管理", icon: "chart" },
    children: [
      {
        path: "user/list",
        name: "用户管理",
        component: () => import("@/views/acl/user/list"),
        meta: { title: "用户管理" }
      },
      {
        path: "role/list",
        name: "角色管理",
        component: () => import("@/views/acl/role/list"),
        meta: { title: "角色管理" }
      },
      {
        path: "role/form",
        name: "角色添加",
        component: () => import("@/views/acl/role/form"),
        meta: { title: "角色添加" },
        hidden: true
      },
      {
        path: "role/update/:id",
        name: "角色修改",
        component: () => import("@/views/acl/role/form"),
        meta: { title: "角色修改" },
        hidden: true
      },
      {
        path: "role/distribution/:id",
        name: "角色权限",
        component: () => import("@/views/acl/role/roleForm"),
        meta: { title: "角色权限" },
        hidden: true
      },
      {
        path: "menu/list",
        name: "菜单管理",
        component: () => import("@/views/acl/menu/list"),
        meta: { title: "菜单管理" }
      },
      {
        path: "user/add",
        name: "用户添加",
        component: () => import("@/views/acl/user/form"),
        meta: { title: "用户添加" },
        hidden: true
      },
      {
        path: "user/update/:id",
        name: "用户修改",
        component: () => import("@/views/acl/user/form"),
        meta: { title: "用户修改" },
        hidden: true
      },
      {
        path: "user/role/:id",
        name: "用户角色",
        component: () => import("@/views/acl/user/roleForm"),
        meta: { title: "用户角色" },
        hidden: true
      }
    ]
  },

  { path: "*", redirect: "/404", hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// export default new Router({
//   // mode: 'history', //后端支持可开
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap
// })

export default router;
