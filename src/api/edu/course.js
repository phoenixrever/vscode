import request from "@/utils/request";

export default {
  getCourseById(Course) {
    return request({
      url: `/serviceEdu/eduCourse/add`,
      method: "post",
      data: Course
    });
  },
  addCourse(Course) {
    return request({
      url: `/serviceEdu/eduCourse/add`,
      method: "post",
      data: Course
    });
  },
  editCourseById(Course) {
    return request({
      url: `/serviceEdu/Course/updateCourse`,
      method: "post",
      data: Course
    });
  },
  validateUniqueName(name) {
    return request({
      url: `/serviceEdu/Course/validateUniqueName/${name}`,
      method: "get"
    });
  }
};
