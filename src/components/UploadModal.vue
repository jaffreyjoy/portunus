<template>
  <div
    class="modal fade"
    id="uploadModal"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
    role="dialog"
    aria-labelledby="uploadModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header mt-2">
          <h2 class="modal-title" id="uploadModalLabel">Upload Wizard</h2>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mt--2">
          <div
            v-if="!uploadClicked"
            id="uploadArea"
            class="bg-lighter dashed-border pb-5 pt-5 justify-center text-center"
          >
            <i class="fa fa-file-upload display-2 text-gray"></i>
            <br>
            <input @change="onFileSelect" type="file" name="file" id="file" class="box__file">
            <span id="uploadAreaText">
                <label id="chooseFileText" for="file" @click="uploadHandlers">
                  <strong>Choose a file</strong>
                </label>
                <span> or drag it here</span><br>
                <span v-if="filename">{{ this.filename }}</span>
            </span>
          </div>
          <div v-if="uploadClicked">
            <div class="progress-wrapper">
              <div class="progress-info">
                <div class="progress-label">
                  <span>{{ this.message }}</span>
                </div>
                <div class="progress-percentage">
                  <span>{{ this.progress+'%' }}</span>
                </div>
              </div>
              <div class="progress">
                <div
                  class="progress-bar bg-primary"
                  role="progressbar"
                  :aria-valuenow="progress"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  :style="[progressWidth]"
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!uploadClicked" class="modal-footer mt--4">
          <button type="button" class="btn btn-secondary btn" data-dismiss="modal" @click="close">Close</button>
          <button id="upload" type="button" class="btn btn-primary btn" @click="setUpload" :disabled="!filename">Upload</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import client from "../client.js";
let that = null;
export default {
  name: "UploadModal",
  data() {
    return {
      filename: false,
      uploadClicked: false,
      progress: 0,
      progressWidth: {
        width: '0%'
      },
      message: 'Uploading'
    };
  },
  async created() {
    that = this;
  },
  methods: {
    uploadHandlers: async function() {
      const uploader = await client.getUploader();

      uploader.addEventListener("start", event => {
        this.filename = event.file.name;
        event.file.meta.owner = localStorage.username;
      });

      uploader.listenOnSubmit(
        document.getElementById("upload"),
        document.getElementById("file")
      );
    },
    onFileSelect: function(e) {
      this.filename = e.target.files[0].name;
    },
    setUpload: function() {
      this.uploadClicked = true;
    },
    updateProgress: function(progress) {
      that.progress = progress;
      that.progressWidth.width = `${progress}%`;
      if (progress === 100) {
        that.message = 'Upload Complete !!';
      }
    },
    close: function() {
      this.filename = false;
      this.uploadClicked = false;
      this.progress = 0;
      this.progressWidth.width = '0%';
      this.message = 'Uploading';
    }
  }
};
</script>
<style scoped>
#uploadArea:hover {
  background-color: var(--secondary) !important;
}
.dashed-border {
  border: 3.5px dashed gray;
  border-radius: 8px;
}
.box__file {
  display: none;
}
#chooseFileText {
  font-family: "Metropolis Bold" !important;
}
#chooseFileText:hover {
  text-decoration: underline !important;
  cursor: pointer;
}
</style>

