<template>
  <!-- Main Content -->
  <section>
    <!-- Header -->
    <div class="header py-4 py-lg-5">
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
    <div class="container mt--4 pb-5">
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
                    <span v-if="!validEmail" class="text-warning font-weight-700">Incomplete/Invalid E-mail address</span>
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
                    <span v-if="!validUsername" class="text-warning font-weight-700">Username must be atleast 6 characters long</span>
                  </small>
                </div>
                <div class="form-group">
                  <div class="input-group input-group-alternative mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="ni ni-hat-3"></i>
                      </span>
                    </div>
                    <input class="form-control" placeholder="Username" type="text" v-model="username">
                  </div>
                </div>
                <div class="text-muted">
                  <small>
                    <span v-if="passwordStrengthCalc" class="font-weight-700">Password Strength: </span>
                    <span v-if="passwordStrengthCalc" :class="[passwordStrengthClass]" class="font-weight-700">{{ passwordStrength }}</span>
                  </small>
                </div>
                <div class="form-group">
                  <div class="input-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="ni ni-lock-circle-open"></i>
                      </span>
                    </div>
                    <input class="form-control" placeholder="Password" type="password" v-model="password">
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
                          <router-link to="/terms">Terms and Conditions</router-link>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="text-center">
                  <button type="button" class="btn btn-primary mt-4" @click="register">Create account</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import register from '../store';
export default {
  name: "Register",
  components: {
  },
  data() {
    return {
      name: null,
      email: null,
      username: null,
      password: null,
      passwordStrength: null,
      passwordStrengthClass: null,
      alertMessage: null,
      invalidUsername: null,
      invalidEmail: null,
      termsChecked: false
    }
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
    },
    passwordStrengthCalc: function() {
      if (this.password) {
        this.passwordEntered = true;
        const len = this.password.length;
        if (len > 0 && len <= 3) {
          this.passwordStrengthClass = 'text-danger';
          this.passwordStrength = 'Weak';
        } else if (len >= 4 && len <= 6) {
          this.passwordStrengthClass = 'text-warning';
          this.passwordStrength = 'Medium';
        } else {
          this.passwordStrengthClass = 'text-success';
          this.passwordStrength = 'Strong';
        }
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    showAlert: function(message) {
      this.alertMessage = message;
      this.hideAlert();
    },
    validate: function() {
      if (!this.name || !this.email || !this.username || !this.password) {
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
          username: this.username,
          password: this.password
        }
        const res = await register(user);
        const message = {
          0: 'Something went wrong',
          1: 'Registration successfull',
          2: 'Username already exists',
          3: 'Email already exists'
        }
        this.showAlert(message[res]);
      }
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
</style>
