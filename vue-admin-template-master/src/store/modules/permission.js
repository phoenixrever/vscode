import { constantRoutes } from "@/router";
import { getMenu } from "@/api/login";
import Layout from "@/views/layout/Layout";

//生成动态路由
function filterAsyncRouter(asyncRouterMap) {
  // 遍历后台传来的路由字符串，转换为组件对象
  console.log(asyncRouterMap);
  try {
    const accessedRouters = asyncRouterMap.filter(route => {
      if (route.component) {
        if (route.component === "Layout") {
          // Layout组件特殊处理
          route.component = Layout;
        } else {
          const component = route.component;
          console.log(route.name);
          console.log(route.path);
          console.log(route.component);
          console.log(
            "======================================================="
          );
          route.component = resolve => {
            require(["@/views" + component + ".vue"], resolve);
          };
        }
      }

      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children);
      }
      return true;
    });
    console.log(accessedRouters);
    return accessedRouters;
  } catch (e) {
    console.log(e);
  }
}

const state = {
  routes: [],
  addRoutes: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  }
};

const actions = {
  async generateRoutes({ commit }, roles) {
    // 取后台路由
    const asyncRouter = await getMenu();
    return new Promise(resolve => {
      const tmp = asyncRouter.data.permissionList;
      const accessedRoutes = filterAsyncRouter(tmp);
      commit("SET_ROUTES", accessedRoutes);
      resolve(accessedRoutes);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
