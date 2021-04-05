import request from "@/utils/request";

export default {
  getChapterById(id) {
    return request({
      url: `/serviceEdu/eduChapter/get/${id}`,
      method: "get"
    });
  },
  deleteChapterById(id) {
    return request({
      url: `/serviceEdu/eduChapter/delete/${id}`,
      method: "delete"
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
      url: `/serviceEdu/eduChapter/edit`,
      method: "put",
      data: chapter
    });
  }
};
