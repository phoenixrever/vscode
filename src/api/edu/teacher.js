import request from "@/utils/request";

export default {
  //1讲师列表 /serviceEdu/teacher/pageCondition/{currentPage}/{limit}
  getTeacherList(currentPage, limit, teacherquery) {
    return request({
      url: `/serviceEdu/teacher/pageCondition/${currentPage}/${limit}`,
      method: "POST",
      //json data表示 把对象转换成json进行传递到接口里面
      data: teacherquery
    });
  }
  // getTeacherLsit: (currentPage, limit, teacherquery) => {
  //   return request({
  //     url: `/serviceEdu/teacher/pageCondition/${currentPage}/${limit}`,
  //     method: "get",
  //     //json data表示 把对象转换成json进行传递到接口里面
  //     data: teacherquery
  //   });
  // }
};

// export function getLsit(params) {
//   return request({
//     url: "/table/list",
//     mehtod: "get",
//     params
//   });
// }
