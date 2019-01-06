<template>
  <div>
    <!-- Navbar -->
    <Navbar />
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
                  Login
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
                      <input class="form-control" placeholder="Username" type="text" v-model="username">
                    </div>
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
                  <div class="text-center">
                    <button type="button" class="btn btn-primary mt-4" @click="login">Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import client from '../client';
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
export default {
  name: "Login",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      username: null,
      password: null,
      alertMessage: null,
    }
  },
  methods: {
    validate: function() {
      if (!this.username || !this.password) {
        this.showAlert("Please fill all the fields :)");
        return false;
      }
      return true;
    },
    login: async function() {
      if (this.validate()) {
        const user = {
          username: this.username,
          password: this.password
        }
        const res = await client.login(user);
        const message = {
          0: 'Something went wrong :(',
          1: 'Login successfull :)',
          2: 'Incorrect credentials :('
        }
        this.showAlert(message[res]);
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
</style>
