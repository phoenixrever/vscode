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
  },
  getAllTeacher() {
    return request({
      url: `/serviceEdu/teacher/listAll`,
      method: "get"
    });
  },
  deleteTeacherById(id) {
    return request({
      url: `/serviceEdu/teacher/delete/${id}`,
      method: "delete"
    });
  },
  addTeacher(teacher) {
    return request({
      url: `/serviceEdu/teacher/addTeacher`,
      method: "post",
      data: teacher
    });
  },
  editTeacher(teacher) {
    return request({
      url: `/serviceEdu/teacher/updateTeacher`,
      method: "post",
      data: teacher
    });
  },
  validateUniqueName(name) {
    return request({
      url: `/serviceEdu/teacher/validateUniqueName/${name}`,
      method: "get"
    });
  }
};

// export function getLsit(params) {
//   return request({
//     url: "/table/list",
//     mehtod: "get",
//     params
//   });
// }
