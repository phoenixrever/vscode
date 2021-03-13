import request from "@/utils/request";

export default {
  getChapterById(id) {
    return request({
      url: `/serviceEdu/eduChapter/get/${id}`,
      method: "get"
    });
  },
  addChapterVideos(chapter) {
    return request({
      url: `/serviceEdu/eduChapter/addChapterVideos`,
      method: "post",
      data: chapter
    });
  },
  editChapter(chapter) {
    return request({
      url: `/serviceEdu/eduCourse/update`,
      method: "put",
      data: course
    });
  }
};
