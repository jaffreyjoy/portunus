<template>
  <div>
    <SideNav
      :usedSpace="usedSpace"
      :spacePercent="spacePercent"
      @changeComponent="changeComponent($event)"
    />
    <!-- Main content -->
    <div class="main-content">
      <TopBar :topBarTitle="currentComponent" @changeComponent="changeComponent($event)"/>
      <!-- Header -->
      <component :is="currentComponent" @setUsedSpace="setUsedSpace($event)"/>
    </div>
  </div>
</template>

<script>
import SideNav from "../components/SideNav.vue";
import TopBar from "../components/TopBar.vue";
import Dashboard from "../components/Dashboard.vue";
import Profile from "../components/Profile.vue";

export default {
  name: "Drive",
  components: {
    SideNav,
    TopBar,
    Dashboard,
    Profile
  },
  data() {
    return {
      currentComponent: "Dashboard",
      usedSpace: 0.001,
      totalSpace: 1,
      spacePercent: "width:10%"
    };
  },
  methods: {
    changeComponent: function(component) {
      this.currentComponent = component;
    },
    setUsedSpace: function(usedBytes) {
      this.usedSpace = (usedBytes / (this.totalSpace * 1073741824)).toFixed(4);
      this.spacePercent = `width:${(this.usedSpace / this.totalSpace) * 100}%`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo-img-cont {
  text-align: center;
}
.text-md {
  font-size: 0.95rem !important;
}
</style>
<style scoped>
#footer {
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin-bottom: 0px;
}
</style>
