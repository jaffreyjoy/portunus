<template>
  <div>
    <SideNav />
    <!-- Main content -->
    <div class="main-content">
      <!-- Top navbar -->
      <nav class="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
        <div class="container-fluid">
          <!-- Brand -->
          <a class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" href="./index.html"><h1>Dashboard</h1></a>
          <!-- Form -->
          <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <div class="form-group mb-0">
              <div class="input-group input-group-alternative">
                <div class="input-group-prepend">
                  <span class="input-group-text"><i class="fas fa-search"></i></span>
                </div>
                <input class="form-control" placeholder="Search" type="text">
              </div>
            </div>
          </form>
          <!-- User -->
          <ul class="navbar-nav align-items-center d-none d-md-flex">
            <li class="nav-item dropdown">
              <a class="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div class="media align-items-center">
                  <span class="avatar avatar-sm rounded-circle">
                    <img alt="Image placeholder" src="../../public/assets/img/theme/team-4-800x800.jpg">
                  </span>
                  <div class="media-body ml-2 d-none d-lg-block">
                    <span class="mb-0 text-sm  font-weight-bold">Jessica Jones</span>
                  </div>
                </div>
              </a>
              <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
                <a href="./examples/profile.html" class="dropdown-item">
                  <i class="ni ni-single-02"></i>
                  <span>My profile</span>
                </a>
                <a href="./examples/profile.html" class="dropdown-item">
                  <i class="ni ni-calendar-grid-58"></i>
                  <span>Activity</span>
                </a>
                <a href="./examples/profile.html" class="dropdown-item">
                  <i class="ni ni-support-16"></i>
                  <span>Help</span>
                </a>
                <div class="dropdown-divider"></div>
                <a href="#!" class="dropdown-item">
                  <i class="ni ni-user-run"></i>
                  <span>Logout</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <!-- Header -->
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
                      <td>
                        5/1/19 3:00 PM
                      </td>
                      <td>
                        10 MB
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <i class="fas fa-file-pdf text-lg text-red mr-3"></i>
                        <span class="text-md"> Pdf</span>
                      </th>
                      <td>
                        5/1/19 3:00 PM
                      </td>
                      <td>
                        10 MB
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <i class="fas fa-file-image text-lg text-orange mr-3"></i>
                        <span class="text-md"> Image</span>
                      </th>
                      <td>
                        5/1/19 3:00 PM
                      </td>
                      <td>
                        10 MB
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">
                        <i class="fas fa-file-word text-lg text-blue mr-3"></i>
                        <span class="text-md"> Doc</span>
                      </th>
                      <td>
                        5/1/19 3:00 PM
                      </td>
                      <td>
                        10 MB
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>

<script>
import SideNav from '../components/SideNav.vue'
import Footer from '../components/Footer.vue'
export default {
  name: "Drive",
  components:{
    SideNav,
    Footer
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo-img-cont{
  text-align: center;
}
.text-md{
  font-size: 0.95rem !important;
}
</style>
