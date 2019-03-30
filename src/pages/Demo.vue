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
              <div class="card-body" style="padding-top: 0">
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
      progress: 0,
      progressWidth: {
        width: "0%"
      },
      message: "Registering"
    };
  },
  beforeMount() {
    that = this;
    this.updateProgress();
  },
  methods: {
    updateProgress: function() {
      try {
        that.progress += 20;
        that.progressWidth.width = `${that.progress}%`;
      } catch (e) {}
    }
  }
};
</script>
