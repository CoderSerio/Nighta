<script setup lang="ts">
import Navbar from "./components/navbar/Navbar.vue";
</script>

<template>
  <Navbar></Navbar>
  <main class="router-view-wrapper">
    <RouterView />
  </main>
</template>

<style scoped>
.router-view-wrapper {
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
