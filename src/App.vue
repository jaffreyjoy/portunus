<template>
  <div id="app" :style="background">
    <!-- Navbar -->
    <Navbar/>
    <!-- Main View -->
    <transition name="bounce">
      <router-view></router-view>
    </transition>
    <!-- Footer -->
    <Footer/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
export default {
  name: "app",
    components:{
    Navbar,
    Footer
  },
  data() {
    return {
      background: {
        "background-image": 'linear-gradient(0deg, #3d3393 0%, #2b76b9 37%, #2cacd1 65%, #35eb93 100%)',
      }
    }
  }
};
</script>

<style>
  .bounce-enter-active {
    animation: bounce-in .8s;
  }
  .bounce-leave-active {
    animation: bounce-out .5s;
  }
  @keyframes bounce-in {
    0% { transform: scale(.9); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  @keyframes bounce-out {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(.9); opacity: 0; }
  }
</style>
