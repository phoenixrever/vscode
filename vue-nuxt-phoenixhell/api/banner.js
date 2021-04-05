export default {
  getBanner() {
    return this.$axios({
      method: "get",
      url: "/serviceCms/bannerAdmin/list"
      //   data: {
      //     firstName: 'Fred',
      //     lastName: 'Flintstone'
      //   }
    });
  }
  //   getBanner() {
  //     return this.$axios({
  //       method: "get",
  //       url: "/serviceEdu/front/course/sortViewDesc",
  //       //   data: {
  //       //     firstName: 'Fred',
  //       //     lastName: 'Flintstone'
  //       //   }
  //     });
  //   },
};
