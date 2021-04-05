import request from "@/utils/request";

export default {
  getVideoById(id) {
    return request({
      url: `/serviceEdu/eduChapter/get/${id}`,
      method: "get"
    });
  },
  deleteVideoById(id) {
    return request({
      url: `/serviceEdu/eduVideo/delete/${id}`,
      method: "delete"
    });
  },
  addChapterVideos(vidoes) {
    return request({
      url: `/serviceEdu/eduVideo/add`,
      method: "post",
      data: vidoes
    });
  },
  editVideo(video) {
    return request({
      url: `/serviceEdu/eduVideo/edit`,
      method: "put",
      data: video
    });
  },
  getProgressbar() {
    return request({
      // url: `/serviceVod/video/uploadProgress/${new Date().getMilliseconds}`,
      url: `/serviceVod/video/uploadProgress`,
      method: "get"
    });
  },
  videoUpload(file) {
    return request({
      url: `/serviceVod/video/videoUpload`,
      method: "post",
      data: file,
      timeout: 5000000
    });
  },
  deleteByVideoId(videoId){
    return request({
      url: `/serviceVod/video/delete/${videoId}`,
      method: "delete",
    });
  }
};
