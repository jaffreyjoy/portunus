<template>
  <div id="app" :style="background">
    <!-- Main View -->
    <transition name="bounce">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      background: {
        "background-image":
          "linear-gradient(0deg, #3d3393 0%, #2b76b9 37%, #2cacd1 65%, #35eb93 100%)",
        height: "100vh"
      }
    };
  }
};
</script>

<style>
.bounce-enter-active {
  animation: bounce-in 0.8s;
}
.bounce-leave-active {
  animation: bounce-out 0.5s;
}
@keyframes bounce-in {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes bounce-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.9);
    opacity: 0;
  }
}
</style>
