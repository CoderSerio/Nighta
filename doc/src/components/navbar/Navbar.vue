<template>
  <d-menu mode="horizontal" :default-select-keys="['/#']" class="menu-wrapper">
    <d-menu-item key="home" class="menu-item">
      <RouterLink to="/">
        <d-icon
          name="https://devui.design/components/assets/logo.svg"
          size="32px"
        ></d-icon>
      </RouterLink>
    </d-menu-item>

    <d-menu-item key="main" class="menu-item">
      <RouterLink to="/main">参考指南</RouterLink>
    </d-menu-item>

    <d-menu-item key="playground" class="menu-item">
      <RouterLink to="/playground">Playground</RouterLink>
    </d-menu-item>
  </d-menu>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
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
