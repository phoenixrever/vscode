import request from "@/utils/request";

export default {
  subjectlist() {
    return request({
      url: `/serviceEdu/subject/getAllSubject`,
      method: "get"
    });
  }
};
