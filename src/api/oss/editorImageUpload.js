import request from "@/utils/request";

export default {
  editorImageUpload(form) {
    return request({
      url: `/eduoss/fileoss/upload?folder=editor`,
      method: "POST",
      data: form
    });
  }
};
