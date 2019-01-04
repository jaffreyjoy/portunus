<template>
  <div id="app" :style="background">
      <transition name="fade">
        <router-view></router-view>
      </transition>
  </div>
</template>

<script>
export default {
  name: "app",
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0.2;
}
</style>
