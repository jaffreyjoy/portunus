<template>
  <div>
    <Navbar/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
  name: "Home",
  methods: {
    register() {
      this.$router.push('/register')
    }
  },
  components:{
    Navbar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
