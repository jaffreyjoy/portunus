<template>
  <!-- Footer -->
  <footer class="pt-6 pb-3">
    <div class="container">
      <div class="row align-items-center justify-content-xl-between">
        <div class="col-xl-6">
          <div class="copyright text-center text-xl-left text-muted">
            &copy; 2018
            <router-link to="/">
              <span class="brand">
                PORTUNUS
              </span>
            </router-link>
          </div>
        </div>
        <div class="col-xl-6">
          <ul class="nav nav-footer justify-content-center justify-content-xl-end">
            <li class="nav-item">
              <router-link to="/register">
                <span class="nav-link-inner--text text-light">
                  Register
                </span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>