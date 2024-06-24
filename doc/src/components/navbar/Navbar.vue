<template>
  <d-menu mode="horizontal" :default-select-keys="['/#']" class="menu-wrapper">
    <RouterLink to="/">
      <d-menu-item key="home" class="menu-item">
        <d-icon
          name="https://devui.design/components/assets/logo.svg"
          size="32px"
        ></d-icon>
      </d-menu-item>
    </RouterLink>

    <RouterLink to="/main/">
      <d-menu-item key="main" class="menu-item"> 参考指南 </d-menu-item>
    </RouterLink>

    <RouterLink to="/playground/">
      <d-menu-item key="playground" class="menu-item"> Playground </d-menu-item>
    </RouterLink>
  </d-menu>
</template>

<script setup lang="ts">
// import { useRoute, useRouter } from "vue-router";
// const router = useRouter();
// const route = useRoute();
</script>

<style scoped>
.menu-wrapper {
  display: flex;
  height: 60px;
}

.menu-item {
  display: flex;
}
</style>
