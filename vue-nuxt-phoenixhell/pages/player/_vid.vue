<template>
  <div>
    <!-- 阿里云视频播放器样式 -->
    <link
      rel="stylesheet"
      href="https://g.alicdn.com/de/prismplayer/2.8.1/skins/default/aliplayer-min.css"
    />
    <!-- 阿里云视频播放器脚本 -->
    <script
      charset="utf-8"
      type="text/javascript"
      src="https://g.alicdn.com/de/prismplayer/2.8.1/aliplayer-min.js"
    />

    <!-- 定义播放器dom -->
    <div id="J_prismPlayer" class="prism-player" />
  </div>
</template>

<script>
export default {
  layout: "player",
  data() {
    return {
      videoId: this.$route.params.vid,
      playauth: "",
      playURL: ""
    };
  },
  created() {
    this.getplayAuth(this.videoId);
  },
  methods: {
    getplayAuth(videoId) {
      this.$axios.$get(`/serviceVod/video/play/${videoId}`).then(response => {
        this.playauth = response.data.playAuth;
        this.playURL = response.data.playURL;
        this.createPlayer();
      });
    },
    createPlayer() {
      // console.log(this.playauth);
      var player = new Aliplayer(
        {
          id: "J_prismPlayer",
          // source: this.playURL,
          // "https://outin-e896d477858711ebae3100163e1c9256.oss-cn-shanghai.aliyuncs.com/sv/21a06711-17835d0b7f5/21a06711-17835d0b7f5.flv?Expires=1616815290&OSSAccessKeyId=LTAI3DkxtsbUyNYV&Signature=cYNj510csfi3k3aatYshOoZLH4o%3D",
          vid: this.videoId, // 视频id
          playauth: this.playauth, // 播放凭证
          encryptType: "1", // 如果播放加密视频，则需设置encryptType=1，非加密视频无需设置此项
          width: "100%",
          height: "500px",
          // 以下可选设置
          // cover:
          // "http://outin-e896d477858711ebae3100163e1c9256.oss-cn-shanghai.aliyuncs.com/b56558588b254b7e86bf3abd4abcd7a8/snapshots/92d14b9c3ea94c35b9b2505ba100b4e5-00005.jpg?Expires=1616816442&OSSAccessKeyId=LTAI3DkxtsbUyNYV&Signature=Rit2361Yd1d1Y3yMyPh6jbk9Rvs%3D", // 封面
          qualitySort: "asc", // 清晰度排序

          mediaType: "video", // 返回音频还是视频
          autoplay: false, // 自动播放
          isLive: false, // 直播
          rePlay: false, // 循环播放
          preload: true,
          controlBarVisibility: "hover", // 控制条的显示方式：鼠标悬停
          useH5Prism: true // 播放器类型：html5
        },
        function(player) {
          console.log("播放器创建成功");
        }
      );
    }
  }
  /**
   * 页面渲染完成时：此时js脚本已加载，Aliplayer已定义，可以使用
   * 如果在created生命周期函数中使用，Aliplayer is not defined错误
   * created到mounted是同步的，肯定会比api执行得更早。这里取不到this里面的值
   * 另外视频播放由过期时间默认100ms所以老是解析失败 这里好坑
   */
};
</script>

<style></style>
