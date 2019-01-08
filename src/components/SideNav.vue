<template>
  <!-- Sidenav -->
  <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
    <div class="container-fluid">
      <!-- Toggler -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Brand -->
      <router-link class="text-center" to="/">
        <img class="brand-img" src="../../public/assets/img/icons/logo/logo.png" alt="brand">
      </router-link>
      <!-- User -->
      <ul class="nav align-items-center d-md-none">
        <li class="nav-item dropdown">
          <a class="nav-link" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <div class="media align-items-center">
              <span class="avatar avatar-sm rounded-circle">
                <img alt="Image placeholder" src="../../public/assets/img/theme/team-4-800x800.jpg">
              </span>
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
      <!-- Collapse -->
      <div class="collapse navbar-collapse" id="sidenav-collapse-main">
        <!-- Collapse header -->
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <h1 style="font-family:'College'">PORTUNUS</h1>
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#sidenav-collapse-main" aria-controls="sidenav-main" aria-expanded="false" aria-label="Toggle sidenav">
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
        <!-- Form -->
        <form class="mt-4 mb-3 d-md-none">
          <div class="input-group input-group-rounded input-group-merge">
            <input type="search" class="form-control form-control-rounded form-control-prepended" placeholder="Search" aria-label="Search">
            <div class="input-group-prepend">
              <div class="input-group-text">
                <span class="fa fa-search"></span>
              </div>
            </div>
          </div>
        </form>
        <!-- Navigation -->
        <!-- Upload button -->
        <button class="btn btn-icon btn-3 btn-primary btn-lg mt-3" type="button" data-toggle="modal" data-target="#uploadModal">
          <span class="btn-inner--icon"><i class="fa fa-file-upload"></i></span>
          <span class="btn-inner--text">Upload</span>
        </button>
        <!-- Share button -->
        <button class="btn btn-icon btn-3 btn-outline-default btn-lg mt-3" type="button">
          <span class="btn-inner--icon"><i class="fa fa-share-alt"></i></span>
          <span class="btn-inner--text">Share</span>
        </button>
        <!-- Space Occupied Container -->
        <div class="progress-wrapper">
          <div class="progress-info mb-3 mt-3">
            <div class="progress-label">
              <span>Space Occupied</span>
            </div>
            <div class="progress-percentage">
              <span>1.5 of 5 GB</span>
            </div>
          </div>
          <div class="progress">
            <div class="progress-bar bg-default" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%;"></div>
          </div>
        </div>
        <!-- Divider -->
        <hr class="my-3">
        <!-- Links -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" @click="changeComponent('Dashboard')">
              <i class="ni ni-tv-2 text-primary mt--1"></i> Dashboard
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="changeComponent">
              <i class="ni ni-watch-time text-primary mt--1"></i> Recent
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="changeComponent">
              <i class="ni ni-single-copy-04 text-primary mt--1"></i> Shared
            </a>
          </li>
        </ul>
        <!-- Divider -->
        <hr class="my-3">
        <!-- Heading -->
        <!-- <h6 class="navbar-heading text-muted">Documentation</h6> -->
        <!-- Navigation -->
        <ul class="navbar-nav mb-md-3">
          <li class="nav-item">
            <a href="./examples/profile.html" class="nav-link">
              <i class="ni ni-settings-gear-65 mt--1"></i> Settings
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "SideNav",
  methods: {
    changeComponent: function(component) {
      this.$emit('changeComponent', component)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media screen and (min-width: 600px) {
  .brand-img{
    width: 13vw;
  }
}
@media screen and (max-width: 600px) {
  .brand-img{
    width: 40vw;
  }
}
</style>