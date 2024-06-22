<script setup lang="ts">
import sideMenu from "../../components/sideMenu/SideMenu.vue";
import sectionList from "../../documents/sectionList";
</script>

<template>
  <div class="wrapper">
    <sideMenu :data="sectionList"></sideMenu>
    <div class="router-view-wrapper">
      <KeepAlive>
        <RouterView />
      </KeepAlive>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  width: 100vw;
  /* overflow: hidden; */
  height: calc(100vh - 60px);
}
.menu {
  width: 200px;
}
.router-view-wrapper {
  flex: 1;
}
.router-view {
  flex: 1;
  height: 100%;
  width: 100%;
}
</style>
