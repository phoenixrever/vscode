<template>
  <div class="tinymce-editor">
    <editor
      apiKey="z43e7r6opx7ykzplmiklrwhdbioddc6oy3heivs09jods4mk"
      v-model="myValue"
      :init="init"
      :disabled="disabled"
      @onClick="onClick"
    >
    </editor>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import editorImageUpload from "@/api/oss/editorImageUpload";

export default {
  components: {
    editor: Editor
  },
  props: {
    //传入一个value，使组件支持v-model绑定
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: "lists image media table textcolor wordcount contextmenu"
    },
    toolbar: {
      type: [String, Array],
      default:
        "undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | removeformat"
    }
  },
  data() {
    return {
      //初始化配置
      init: {
        // height: 300,
        // plugins: this.plugins,
        // toolbar: this.toolbar,
        // branding: false,
        // menubar: false,
        // //此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // //如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        // images_upload_handler: (blobInfo, success, failure) => {
        //   const img = "data:image/jpeg;base64," + blobInfo.base64();
        //   success(img);
        // }
        height: 200,
        resize: false,
        menubar: false,
        branding: false,
        autosave_ask_before_unload: false,
        powerpaste_allow_local_images: true,
        /* without images_upload_url set, Upload tab won't show up*/
        // images_upload_url: "postAcceptor.php",

        /* we override default upload handler to simulate successful upload*/
        images_upload_handler: function(blobInfo, success, failure) {
          const form = new FormData();

          form.append("file", blobInfo.blob(), blobInfo.filename());
          // You can use axios, superagent and other libraries instead here
          editorImageUpload
            .editorImageUpload(form)
            .then(response => {
              console.log(response);
              success(response.data.fileUrl);
            })
            .catch(error => {
              console.log(error);
              failure("fail");
            });
        },
        plugins: [
          " advcode advlist anchor autolink codesample fullscreen help image  imagetools ",
          " lists link media noneditable powerpaste preview ",
          " searchreplace table tinymcespellchecker visualblocks wordcount"
        ],

        toolbar:
          "  undo redo | bold italic | forecolor backcolor | table codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image   fullscreen ",
        spellchecker_dialog: true
      },
      myValue: this.value
    };
  },
  //   mounted() {
  //     tinymce.init({});
  //   },
  methods: {
    //添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    //需要什么事件可以自己增加
    onClick(e) {
      // this.$emit("onClick", e, tinymce);
    },
    //可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = "";
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue;
    },
    myValue(newValue) {
      this.$emit("input", newValue);
    }
  }
};
</script>
<style scoped></style>
