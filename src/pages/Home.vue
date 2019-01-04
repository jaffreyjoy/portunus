<template>
  <div :style="background">
    <!-- Navbar -->
    <Navbar/>
    <!-- Main content -->
    <section class="pb-4">
      <div class="logo-img-cont pt-5 pb-8">
        <img style="height: 40vh;" src="../../public/assets/img/icons/logo/file-lock-white.png" alt="logo">
      </div>
      <p class="display-4 text-white text-center">
        A secure file sharing application with ultra-mega-secure authentication !!!!!
      </p>
    </section>
    <!-- Footer -->
    <Footer/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
export default {
  name: "Home",
  data: function() {
    return {
      background: {
        "background-image": 'linear-gradient(0deg, #3d3393 0%, #2b76b9 37%, #2cacd1 65%, #35eb93 100%)',
      }
    }
  },
  methods: {
    register() {
      this.$router.push('/register')
    }
  },
  components:{
    Navbar,
    Footer
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo-img-cont{
  text-align: center;
}
</style>
