<template>
  <div :style="background">
    <div class="main-content">
      <!-- Navbar -->
      <Navbar/>
      <!-- Header -->
      <div class="header py-7 py-lg-8">
        <div class="container">
          <div class="header-body text-center mb-5">
            <div class="row justify-content-center">
              <div class="col-lg-5 col-md-6">
                <h1 class="text-dark">Welcome!</h1>
                <p
                  class="text-lead text-white"
                >Share files securely with Portunus!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Page content -->
      <div class="container mt--8 pb-5">
        <!-- Table -->
        <div class="row justify-content-center">
          <div class="col-lg-6 col-md-8">
            <div class="card bg-secondary shadow border-0">
              <div class="card-header bg-transparent">
                <h1 class="text-center">
                  Sign Up
                </h1>
              </div>
              <div class="card-body px-lg-5 py-lg-5">
                <form role="form">
                  <div class="form-group">
                    <div class="input-group input-group-alternative mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="ni ni-hat-3"></i>
                        </span>
                      </div>
                      <input class="form-control" placeholder="Name" type="text">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group input-group-alternative mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="ni ni-email-83"></i>
                        </span>
                      </div>
                      <input class="form-control" placeholder="Email" type="email">
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group input-group-alternative">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="ni ni-lock-circle-open"></i>
                        </span>
                      </div>
                      <input class="form-control" placeholder="Password" type="password">
                    </div>
                  </div>
                  <div class="text-muted font-italic">
                    <small>
                      password strength:
                      <span class="text-success font-weight-700">strong</span>
                    </small>
                  </div>
                  <div class="row my-4">
                    <div class="col-12">
                      <div class="custom-control custom-control-alternative custom-checkbox">
                        <input
                          class="custom-control-input"
                          id="customCheckRegister"
                          type="checkbox"
                        >
                        <label class="custom-control-label" for="customCheckRegister">
                          <span class="text-muted">
                            I agree with the
                            <a href="#!">Privacy Policy</a>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="text-center">
                    <button type="button" class="btn btn-primary mt-4">Create account</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer -->
    <Footer/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
export default {
  name: "Register",
  components:{
    Navbar,
    Footer
  },
  data: function() {
    return {
      background: {
        "background-image": 'linear-gradient(0deg, #3d3393 0%, #2b76b9 37%, #2cacd1 65%, #35eb93 100%)',
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
