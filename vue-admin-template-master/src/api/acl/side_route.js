import request from "@/utils/request";

export default {
  getRouteList() {
    return request({
      url: `/serviceAcl/index/menu`,
      method: "get"
    });
  },
  addOneSubject() {
    return request({
      url: `/serviceAcl/index/menu/add`,
      method: "get"
    });
  }
};
