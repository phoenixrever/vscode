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
  completeCourseInfo(id) {
    return request({
      url: `/serviceEdu/eduCourse/publish/${id}`,
      method: "get"
    });
  },
  publishCourse(id) {
    return request({
      url: `/serviceEdu/eduCourse/publishCourse/${id}`,
      method: "put"
    });
  },
  getCoursePagination(completeCourseInfo, currentPage) {
    return request({
      url: `/serviceEdu/eduCourse/${currentPage}`,
      method: "post",
      data: completeCourseInfo
    });
  },
  deleteCourse(id) {
    return request({
      url: `/serviceEdu/eduCourse/delete/${id}`,
      method: "delete"
    });
  },
  validateUniqueName(name) {
    return request({
      url: `/serviceEdu/Course/validateUniqueName/${name}`,
      method: "get"
    });
  }
};
