<template>
  <div>
    <!-- Navbar -->
    <Navbar/>
    <!-- Main Content -->
    <section>
      <!-- Page content -->
      <div class="container mt-5 pb-5">
        <!-- Table -->
        <div class="row justify-content-center">
          <div class="col-lg-6 col-md-8">
            <div class="card bg-secondary shadow border-0">
              <div class="card-header bg-transparent">
                <h1 class="text-center">Login</h1>
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
                      <input
                        class="form-control"
                        placeholder="Username"
                        type="text"
                        v-model="username"
                      >
                    </div>
                  </div>
                  <div class="text-center">
                    <button type="button" class="btn btn-primary mt-4" @click="login">Continue</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Footer -->
    <Footer id="footer"/>
  </div>
</template>

<script>
import client from "../client";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "Login",
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      username: null,
      alertMessage: null,
      userIndex: null
    };
  },
  methods: {
    validate: async function() {
      if (!this.username) {
        this.showAlert("Please enter your username :)");
        return false;
      } else {
        const index = await client.getUserIndex(this.username);
        if (index == 0) {
          this.showAlert("Username not found, please register first :)");
          return false;
        } else {
          this.userIndex = index;
        }
      }
      return true;
    },
    login: async function() {
      if (await this.validate()) {
        const user = {
          username: this.username,
          index: this.userIndex
        };
        this.$router.push({
          path: "/record",
          query: {
            user,
            type: "login"
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
