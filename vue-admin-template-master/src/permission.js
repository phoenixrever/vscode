import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import Layout from "@/views/layout/Layout";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // determine whether the user has logged in
  const hasToken = getToken();

  if (hasToken) {
    if (to.path === "/login") {
      // if is logged in, redirect to the home page
      next({ path: "/" });
      NProgress.done();
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const response = await store.dispatch("GetInfo");
          const roles = response.data.userInfo.roles;
          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch(
            "permission/generateRoutes",
            roles
          );
          // const accessRoutes = [
          //   {
          //     path: "/subject",
          //     component: Layout,
          //     redirect: "/subject/list",
          //     name: "课程分类管理",
          //     meta: { title: "课程分类管理", icon: "form" },
          //     children: [
          //       {
          //         path: "list",
          //         name: "课程分类列表",
          //         component: () => import("@/views/edu/subject/list"), //@/ 相当于./  当前路径
          //         meta: { title: "课程分类列表", icon: "table" }
          //       },
          //       {
          //         path: "save",
          //         name: "添加课程xxx分类",
          //         component: () => import("@/views/edu/subject/save"),
          //         meta: { title: "添加课程分类", icon: "tree" }
          //       }
          //     ]
          //   },
          //   {
          //     path: "/course",
          //     component: Layout,
          //     redirect: "/course/list",
          //     name: "课程管理",
          //     meta: { title: "课程管理", icon: "form" },
          //     children: [
          //       {
          //         path: "list",
          //         name: "课程列表",
          //         component: () => import("@/views/edu/course/list"), //@/ 相当于./  当前路径
          //         meta: { title: "课程列表", icon: "table" }
          //       },
          //       {
          //         path: "save",
          //         name: "添加课程分类",
          //         redirect: "/course/save/info", //注redirect要从根路由算起
          //         component: () => import("@/views/edu/course/addcourse"),
          //         meta: { title: "添加课程分类ss", icon: "tree" },
          //         children: [
          //           {
          //             path: "info", //:和react的:id 一样
          //             name: "courseInfo",
          //             component: () => import("@/views/edu/course/steps/info"),
          //             meta: { title: "添加课程基本信息", noCache: true }
          //             // hidden: true //隐藏此路由
          //           },
          //           {
          //             path: "info/:id", //:和react的:id 一样
          //             name: "editCourseInfo",
          //             component: () => import("@/views/edu/course/steps/info"),
          //             meta: { title: "编辑课程基本信息", noCache: true },
          //             hidden: true //隐藏此路由
          //           },
          //           {
          //             path: "chapter/:id", //:和react的:id 一样
          //             name: "courseChapter",
          //             component: () =>
          //               import("@/views/edu/course/steps/chapter"),
          //             meta: { title: "编辑课程大纲", noCache: true },
          //             hidden: true //隐藏此路由
          //           },
          //           {
          //             path: "publish/:id", //:和react的:id 一样
          //             name: "coursePublish",
          //             component: () =>
          //               import("@/views/edu/course/steps/publish"),
          //             meta: { title: "发布课程", noCache: true },
          //             hidden: true //隐藏此路由
          //           }
          //         ]
          //       }
          //     ]
          //   }
          // ];
          // dynamically add accessible routes
          console.log(accessRoutes);

          router.addRoutes(accessRoutes);
          console.log(router);

          next({ ...to, replace: true });
        } catch (error) {
          // remove token and go to login page to re-login
          console.log(error);
          await store.dispatch("FedLogOut");
          Message.error(error || "Has Error");
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
