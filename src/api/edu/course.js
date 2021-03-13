import request from "@/utils/request";

export default {
  getCourseById(id) {
    return request({
      url: `/serviceEdu/eduCourse/get/${id}`,
      method: "get"
    });
  },
  addCourse(course) {
    return request({
      url: `/serviceEdu/eduCourse/add`,
      method: "post",
      data: course
    });
  },
  editCourse(course) {
    return request({
      url: `/serviceEdu/eduCourse/update`,
      method: "put",
      data: course
    });
  },
  validateUniqueName(name) {
    return request({
      url: `/serviceEdu/Course/validateUniqueName/${name}`,
      method: "get"
    });
  }
};
