import request from "@/utils/request";

export function login(username, password) {
  return request({
    url: "/acl/login",
    method: "post",
    data: {
      username,
      password
    }
  });
}

export function getInfo(token) {
  return request({
    url: "/serviceAcl/index/info",
    method: "get"
  });
}

export function logout() {
  return request({
    url: "/acl/logout",
    method: "post"
  });
}
// 获取菜单权限数据;
export function getMenu() {
  return request({
    url: "/serviceAcl/index/menu/1",
    method: "get"
  });
  // 获取菜单权限数据
  // export function getMenu() {
  //   return request({
  //     url: "/serviceAcl/aclPermission/listAll3/1",
  //     method: "get"
  //   });
}
