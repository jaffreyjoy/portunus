<template>
  <div>
    <!-- Navbar -->
    <Navbar/>
    <!-- Main Content -->
    <section>
      <!-- Header -->
      <!-- Page content -->
      <div class="container mt--4 pb-5">
        <!-- Table -->
        <div class="row justify-content-center mt-5">
          <div class="col-lg-6 col-md-8">
            <div class="card bg-secondary shadow border-0">
              <div class="card-header bg-transparent">
                <h3 class="text-center">Please wait...</h3>
              </div>
              <div v-if="!isLogin" class="card-body" style="padding-top: 0">
                <div class="progress-wrapper">
                  <div class="progress-info">
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
                <div class="text-center mt-5">
                  <p style="margin-bottom: 0">Your registartion is under process.</p>
                  <p style="margin-bottom: 0">However, you need not stare at the screen till then.</p>
                  <p style="margin-bottom: 0">We will send you a mail once it is done !</p>
                </div>
              </div>
              <div v-else class="card-body" style="padding-top: 0">
                <div v-if="loginStatus">
                  <div class="text-center mt-5">
                    <img src="../../assets/loader.gif" alt>
                  </div>
                  <div class="text-center mt-3">
                    <p style="margin-bottom: 0">We are verifying your indentity...</p>
                  </div>
                </div>
                <div v-else>
                  <div class="text-center mt-5">
                    <div class="alert alert-danger fade show" role="alert">
                      <span class="alert-inner--text">Login Failed !!</span>
                    </div>
                    <button type="button" class="btn btn-primary mt-3" @click="tryAgain">Try Again</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Footer -->
    <Footer/>
  </div>
</template>
<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

let that = null;

export default {
  name: "Demo",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      isLogin: true,
      loginStatus: true,
      progress: 0,
      progressWidth: {
        width: "0%"
      }
    };
  },
  created() {
    this.isLogin = this.$route.query.type === "login" ? true : false;
    that = this;
  },
  methods: {
    updateProgress: function() {
      that.progress += 25;
      that.progressWidth.width = `${that.progress}%`;
    },
    updateLoginStatus: function(status) {
      if (status === true) {
        that.$router.push("/app");
      } else {
        that.loginStatus = status;
      }
    },
    tryAgain: function() {
      this.$router.push("/login");
    }
  }
};
</script>
