<template>
  <div>
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
    <!-- Page content -->
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
            <div class="table-responsive">
              <!-- Projects table -->
              <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Last Modified</th>
                    <th scope="col">Size</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      <i class="fas fa-folder text-lg text-dark mr-3"></i>
                      <span class="text-md">File</span>
                    </th>
                    <td>5/1/19 3:00 PM</td>
                    <td>10 MB</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <i class="fas fa-file-pdf text-lg text-red mr-3"></i>
                      <span class="text-md">Pdf</span>
                    </th>
                    <td>5/1/19 3:00 PM</td>
                    <td>10 MB</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <i class="fas fa-file-image text-lg text-orange mr-3"></i>
                      <span class="text-md">Image</span>
                    </th>
                    <td>5/1/19 3:00 PM</td>
                    <td>10 MB</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <i class="fas fa-file-word text-lg text-blue mr-3"></i>
                      <span class="text-md">Doc</span>
                    </th>
                    <td>5/1/19 3:00 PM</td>
                    <td>10 MB</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Dashboard"
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
