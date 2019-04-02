<template>
  <div>
    <!-- Navbar -->
    <Navbar/>
      <!-- Page content -->
      <div class="container mt-5 pb-5">
        <!-- Table -->
        <div class="row justify-content-center">
          <div class="col-lg-6 col-md-8">
            <div class="card bg-secondary shadow border-0">
              <div class="card-header bg-transparent">
                <h1 class="text-center">Terms and Conditons</h1>
              </div>
              <div class="card-body px-lg-5 py-lg-5">
                <p
                  class="bold"
                >Read the following terms and conditions carefully before using the product.</p>
                <ul>
                  <li>This product may or may not work properly.</li>
                  <li>If the product does not work properly, we recommend you to change your brain.</li>
                </ul>
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
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "Terms",
  components: {
    Navbar,
    Footer
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
