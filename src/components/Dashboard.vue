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
            <div class="col-xl-3 col-lg-6">
              <div class="card card-stats mb-4 mb-xl-0">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <span class="h2 font-weight-bold mb-0">PDF</span>
                      <h5 class="card-title text-uppercase text-muted mb-0">12 MB</h5>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-red text-white rounded-circle shadow">
                        <i class="fa fa-file-pdf"></i>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3 mb-0 text-muted text-sm">
                    <span class="text-nowrap">Last access: 5/1/19</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6">
              <div class="card card-stats mb-4 mb-xl-0">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <span class="h2 font-weight-bold mb-0">TXT</span>
                      <h5 class="card-title text-uppercase text-muted mb-0">4 KB</h5>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-light text-white rounded-circle shadow">
                        <i class="fa fa-file-alt"></i>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3 mb-0 text-muted text-sm">
                    <span class="text-nowrap">Last access: 3/1/19</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6">
              <div class="card card-stats mb-4 mb-xl-0">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <span class="h2 font-weight-bold mb-0">XLXS</span>
                      <h5 class="card-title text-uppercase text-muted mb-0">60 KB</h5>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-green text-white rounded-circle shadow">
                        <i class="fa fa-file-excel"></i>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3 mb-0 text-muted text-sm">
                    <span class="text-nowrap">Last access: 3/1/19</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-6">
              <div class="card card-stats mb-4 mb-xl-0">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <span class="h2 font-weight-bold mb-0">DOCX</span>
                      <h5 class="card-title text-uppercase text-muted mb-0">2.5 MB</h5>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-blue text-white rounded-circle shadow">
                        <i class="fa fa-file-word"></i>
                      </div>
                    </div>
                  </div>
                  <p class="mt-3 mb-0 text-muted text-sm">
                    <span class="text-nowrap">Last access: 1/1/19</span>
                  </p>
                </div>
              </div>
            </div>
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
            <div class="table-responsive">
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
                    <tr :key="file.id">
                      <th scope="row">
                        <i class="fas fa-file-alt text-lg text-gray mr-3"></i>
                        <span class="text-md">{{ file.name }}</span>
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
export default {
  name: "Dashboard",
  components: {
    UploadModal
  },
  data: function() {
    return {
      files : null
    }
  },
  async created() {
    let userFiles = await client.getUserFiles(localStorage.username);
    this.files = userFiles;
    // console.log(`view: ${userFiles}`);
  },
  methods: {
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
