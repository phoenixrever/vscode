import request from "@/utils/request";

export default {
  uploadavatar(form) {
    return request({
      url: `/eduoss/fileoss/upload?folder=avatar`,
      method: "POST",
      data: form
    });
  }
};
