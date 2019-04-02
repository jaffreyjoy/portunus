<template>
  <div>
    <!-- Navbar -->
    <Navbar/>
    <!-- Page content -->
    <div class="container mt-1">
      <!-- Table -->
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
          <div class="card bg-secondary shadow border-0">
            <div class="card-header bg-transparent">
              <h1 class="text-center">Register</h1>
            </div>
            <div class="card-body px-lg-5 py-lg-5">
              <div v-if="alertMessage" class="alert alert-danger fade show" role="alert">
                <span class="alert-inner--text">{{ alertMessage }}</span>
              </div>
              <form role="form">
                <div class="form-group">
                  <div class="input-group input-group-alternative mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="ni ni-hat-3"></i>
                      </span>
                    </div>
                    <input class="form-control" placeholder="Name" type="text" v-model="name">
                  </div>
                </div>
                <div class="text-muted">
                  <small>
                    <span
                      v-if="!validEmail"
                      class="text-warning font-weight-700"
                    >Incomplete/Invalid E-mail address</span>
                  </small>
                </div>
                <div class="form-group">
                  <div class="input-group input-group-alternative mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="ni ni-email-83"></i>
                      </span>
                    </div>
                    <input class="form-control" placeholder="Email" type="email" v-model="email">
                  </div>
                </div>
                <div class="text-muted">
                  <small>
                    <span
                      v-if="!validUsername"
                      class="text-warning font-weight-700"
                    >Username must be atleast 6 characters long</span>
                  </small>
                </div>
                <div class="form-group">
                  <div class="input-group input-group-alternative mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="ni ni-hat-3"></i>
                      </span>
                    </div>
                    <input
                      class="form-control"
                      placeholder="Username"
                      type="text"
                      v-model="username"
                    >
                  </div>
                </div>
                <div class="row my-4">
                  <div class="col-12">
                    <div class="custom-control custom-control-alternative custom-checkbox">
                      <input
                        class="custom-control-input"
                        id="customCheckRegister"
                        type="checkbox"
                        v-model="termsChecked"
                      >
                      <label class="custom-control-label" for="customCheckRegister">
                        <span class="text-muted">
                          I agree with the
                          <router-link to="/terms" target="_blank">Terms and Conditions</router-link>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="text-center">
                  <button type="button" class="btn btn-primary mt-4" @click="register">Continue</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer -->
    <Footer id="footer"/>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import client from "../client";

export default {
  name: "Register",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      name: null,
      email: null,
      username: null,
      alertMessage: null,
      invalidUsername: null,
      invalidEmail: null,
      termsChecked: true
    };
  },
  created() {
    this.name = "anto";
    this.email = `${this.getRand()}@gmail.com`;
    this.username = `${this.getRand()}000000`;
  },
  computed: {
    validUsername: function() {
      if (this.username && this.username.length < 6) {
        this.invalidUsername = true;
        return false;
      } else {
        this.invalidUsername = false;
        return true;
      }
    },
    validEmail: function() {
      if (this.email) {
        var re = /\S+@\S+\.\S+/;
        const res = re.test(this.email);
        this.invalidEmail = !res;
        return res;
      } else {
        this.invalidEmail = false;
        return true;
      }
    }
  },
  methods: {
    getRand: function() {
      return Math.floor(Math.random() * 1000) + 1;
    },
    validate: function() {
      if (!this.name || !this.email || !this.username) {
        this.showAlert("Please fill all the fields :)");
        return false;
      } else if (this.invalidEmail || this.invalidUsername) {
        this.showAlert("Please fill valid entries :)");
        return false;
      } else if (!this.termsChecked) {
        this.showAlert("Please accept the Terms and Conditions :)");
        return false;
      }
      return true;
    },
    register: async function() {
      if (this.validate()) {
        const user = {
          name: this.name,
          email: this.email,
          username: this.username
        };
        client.checkExists(user).then(res => {
          if (res === 1) {
            this.$router.push({
              path: "/record",
              query: {
                user,
                type: "register"
              }
            });
          } else if (res === 2) {
            this.showAlert("Username already exists");
          } else {
            this.showAlert("Email already exists");
          }
        });
      }
    },
    showAlert: function(message) {
      this.alertMessage = message;
      this.hideAlert();
    },
    hideAlert: function() {
      setTimeout(() => {
        this.alertMessage = null;
      }, 2000);
    }
  }
};
</script>
<style scoped>
#footer {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin-bottom: 0px;
}
</style>