import request from "@/utils/request";

export default {
  uploadavatar(form) {
    return request({
      url: `/eduoss/fileoss/upload`,
      method: "POST",
      data: form
    });
  }
};
