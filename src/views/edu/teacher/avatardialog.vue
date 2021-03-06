<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <div class="example">
      <cropper
        ref="cropper"
        class="example-cropper"
        :src="image"
        stencil-component="circle-stencil"
      />
      <div class="button-wrapper">
        <span class="button" @click="$refs.file.click()">
          <input
            type="file"
            ref="file"
            @change="uploadImage($event)"
            accept="image/*"
          />
          Upload image
        </span>
        <span class="button" @click="cropImage">Crop image</span>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import uploadavatar from "@/api/oss/uploadavatar";

export default {
  props: {
    avatardialogSrc: {
      type: String
    }
  },
  components: {
    Cropper
  },
  data() {
    return {
      dialogVisible: false,
      image: this.avatardialogSrc
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    cropImage() {
      const { canvas } = this.$refs.cropper.getResult();
      if (canvas) {
        const form = new FormData();
        canvas.toBlob(blob => {
          let file = new File([blob], "temp.jpg");
          form.append("file", file);
          // You can use axios, superagent and other libraries instead here
          uploadavatar
            .uploadavatar(form)
            .then(response => {
              console.log(response);
              this.$emit("changeAvatarSrc", response.data.fileUrl);
              this.dialogVisible = false;
            })
            .catch(error => {
              console.log(error);
              this.dialogVisible = false;
            });
          // Perhaps you should add the setting appropriate file format here
        }, "image/jpeg");
      }
    },
    uploadImage(event) {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = e => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.image = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    }
  }
};
</script>

<style>
.example-cropper {
  border: solid 1px #eee;
  width: auto;
  min-height: 300px;
  max-height: 400px;
  width: 100%;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 17px;
}

.button {
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  background: #3fb37f;
  cursor: pointer;
  transition: background 0.5s;
  font-family: Open Sans, Arial;
  margin: 0 10px;
}

.button:hover {
  background: #38d890;
}

.button input {
  display: none;
}
</style>
