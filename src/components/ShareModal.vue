<template>
  <div
    class="modal fade"
    id="shareModal"
    data-backdrop="static"
    data-keyboard="false"
    tabindex="-1"
    role="dialog"
    aria-labelledby="shareModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header mt-2">
          <h2 class="modal-title" id="shareModalLabel">Share Wizard</h2>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mt--2">
        </div>
        <div class="modal-footer mt--4">
          <button type="button" class="btn btn-secondary btn" data-dismiss="modal" @click="close">Close</button>
          <button id="share" type="button" class="btn btn-primary btn" :disabled="!filename">Share</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import client from "../client.js";
import _ from '../misc.js';
let that = null;
export default {
  name: "ShareModal",
  data() {
    return {
      filename: false,
    };
  },
  async created() {
    that = this;
  },
  methods: {
    onFileSelect: function(e) {
      this.filename = e.target.files[0].name;
    },
    close: function() {
      this.filename = false;
      this.shareClicked = false;
    }
  }
};
</script>
<style scoped>
</style>

