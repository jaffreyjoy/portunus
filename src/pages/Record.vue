<template>
  <div>
    <!-- Navbar -->
    <Navbar/>
    <!-- Page content -->
    <div class="container py-5 mt--4 pb-5">
      <!-- Table -->
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
          <div class="card bg-secondary shadow border-0">
            <div class="card-header bg-transparent">
              <h1 class="text-center">EEG Recording</h1>
            </div>
            <div class="card-body px-lg-5 py-lg-3">
              <div v-if="started">
                <center>
                  <p>Please Wait, Recording...</p>
                  <br>
                  <h2>{{ `${("0"+minute).slice(-2)} : ${("0"+second).slice(-2)}` }}</h2>
                  <br>
                  <img src="../../assets/825.gif" alt>
                </center>
              </div>
              <div v-else>
                <p
                  class="bold"
                >Read the following instructions carefully before you start recording.</p>
                <ul>
                  <li>Put the headset in pairing mode.</li>
                  <li>See to that the headset sensor is properly touching your forehead.</li>
                  <li>Close your eyes.</li>
                  <li>Stay calm.</li>
                  <li>Do not make any sudden movements.</li>
                  <li>Open your eyes when you hear the beep sound.</li>
                </ul>
                <center>
                  <button
                    type="button"
                    class="btn btn-primary mt-4"
                    @click="startRecord"
                  >Start Recording</button>
                </center>
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
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import record from "../record";
import config from "../../portunus.config.json";

let that = null;

export default {
  name: "Record",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      beep: new Audio(require("../../assets/beep.mp3")),
      started: false,
      timer: null,
      minute: null,
      second: null
    };
  },
  created() {
    that = this;
    if (this.$route.query.type === "login") {
      this.minute = config.timer.login.minute;
      this.second = config.timer.login.second;
    } else {
      this.minute = config.timer.register.minute;
      this.second = config.timer.register.second;
    }
  },
  methods: {
    startRecord() {
      this.started = true;
      this.startTimer();
      record(this.$route.query, this.getMilliseconds(this.minute, this.second));
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.second--;
        if (this.second == -1) {
          this.minute--;
          this.second = 59;
        }
        if (this.minute == -1) {
          this.beep.play();
          this.minute = this.second = 0;
          clearInterval(this.timer);
          this.$router.push("/demo");
        }
      }, 1000);
    },
    postRegisterAction(status) {
      if (status == 1) {
        that.$router.push("/app");
      }
    },
    getMilliseconds(minute, second) {
      return minute * 60 * 1000 + second * 1000;
    }
  }
};
</script>