import request from "@/utils/request";

export function login(username, password) {
  return request({
    url: "/serviceEdu/login",
    method: "post",
    data: {
      username,
      password
    }
  });
}

export function getInfo(token) {
  return request({
    url: "/serviceEdu/info",
    method: "get",
    params: { token }
  });
}

export function logout() {
  return request({
    url: "/serviceEdu/logout",
    method: "post"
  });
}
