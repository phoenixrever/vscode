import { Message, MessageBox } from "element-ui";
import cookie from "js-cookie";

export default function({ $axios }) {
  $axios.onRequest(config => {
    // console.log("Making request to " + config.url);
    if (cookie.get("token")) {
      config.headers["token"] = cookie.get("token");
    }
  });
  $axios.onResponse(response => {
    const res = response.data;
    // console.log(res);
    if (res.code !== 20000) {
      Message({
        message:
          res.message + res.data.customMessage ? res.data.customMessage[1] : "",
        type: "error",
        duration: 5 * 1000
      });

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          "你已被登出，可以取消继续留在该页面，或者重新登录",
          "确定登出",
          {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          // store.dispatch("FedLogOut").then(() => {
          //   location.reload(); // 为了重新实例化vue-router对象 避免bug
          // });
        });
      }
      return Promise.reject("error");
    } else {
      return response;
    }
  });

  $axios.onError(error => {
    console.log(error);
    return Promise.reject(error);
  });
}
