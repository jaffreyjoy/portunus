<template>
  <div>
    <!-- Recent -->
    <div class="header pb-8 pt-6 pt-md-7">
      <div class="container-fluid">
        <div class="header-body">
          <!-- Card stats -->
          <div class="row">
            <div class="col">
              <h3 class="ml-1 text-white">Recent</h3>
            </div>
          </div>
          <div class="row">
            <template v-for="file in recentFiles">
              <div @click="downloadFile(file.name)" :key="file._id" class="col-xl-3 col-lg-6">
                <div class="card card-stats mb-4 mb-xl-0">
                  <div class="card-body">
                    <div class="row">
                      <div class="col">
                        <span class="h3 font-weight-bold mb-0">{{ file.name | limitLength }}</span>
                        <h5 class="card-title text-uppercase text-muted mb-0">{{ getReadableFileSize(file.size) }}</h5>
                      </div>
                      <div class="col-auto">
                        <div :class="getBg(file.color)" class="icon icon-shape text-white rounded-circle shadow">
                          <i :class="file.icon" class="fa"></i>
                        </div>
                      </div>
                    </div>
                    <p class="mt-3 mb-0 text-muted text-sm">
                      <span class="text-nowrap">Last access: {{ file.date }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <!-- Drive-->
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <h3 class="ml-1 text-white">Drive</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12 mb-5 mb-xl-0">
          <div class="card shadow">
            <div class="card-header border-0">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0">Home</h3>
                </div>
              </div>
            </div>
            <!-- File Explorer -->
            <div class="table-responsive mb-2">
              <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Last Modified</th>
                    <th scope="col">Size</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="file in files">
                    <tr :key="file._id">
                      <th scope="row">
                        <i :class="[file.color,file.icon]" class="fas text-lg mr-3"></i>
                        <span @click="downloadFile(file.name)" class="text-md">{{ file.name }}</span>
                      </th>
                      <td>{{ file.date }}</td>
                      <td>{{ getReadableFileSize(file.size) }}</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Upload Modal -->
    <UploadModal />
  </div>
</template>
<script>
import UploadModal from './UploadModal';
import client from "../client.js";
let that = null;
export default {
  name: "Dashboard",
  components: {
    UploadModal
  },
  data: function() {
    return {
      files : null,
      recentFiles: null,
    }
  },
  async created() {
    that = this;
    await this.setFiles();
  },
  async mounted() {
    this.$root.$on('getUsedSpace', () => {
      console.log('getUsedSpace');
      localStorage.usedSpaceBytes =  this.files.reduce((acc,el)=>acc+el.size,0);
    })
  },
  methods: {
    async setFiles() {
      console.log('setFiles')
      let userFiles = await client.getUserFiles(localStorage.username);
      that.recentFiles = userFiles.reverse().slice(0,4);
      that.files = userFiles.reverse();
      that.$emit('setUsedSpace',
        that.files.reduce((acc,el)=>acc+el.size,0)
      )
    },
    getBg(str) {
      return 'bg' + str.slice(str.indexOf('-'), str.length)
    },
    getReadableFileSize(size) {
      if(size < 1024)
        return `${size} B`;
      else if(size >= 1024 && size < 1048576)
        return `${this.limitLength(size/1024)} KB`;
      else if(size >= 1048576 && size < 1073741824)
        return `${this.limitLength(size/1048576)} MB`;
      else
        return `${this.limitLength(size/1073741824)} GB`;
    },
    limitLength(value, limit=2) {
      var str = value.toString();
      var pointInd = str.indexOf('.');
      if(pointInd !== -1)
        return str.substring(0,
          pointInd + Math.min(limit, str.length-pointInd) + 1
        );
      else
        return str;
    },
    downloadFile(filename) {
      location.href=`http://localhost:3000/download/${localStorage.username}/${filename}`;
    }
  },
  filters: {
    limitLength: function (str) {
      if(str.length > 10)
        return str.substring(0,10) + "...";
      else return str;
    }
  }
};
</script>
<style scoped>
.logo-img-cont {
  text-align: center;
}
.text-md {
  font-size: 0.95rem !important;
}
</style>
