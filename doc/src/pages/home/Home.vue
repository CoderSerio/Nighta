<script setup lang="ts">
import { ref } from "vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<template>
  <div class="wrapper">
    <d-button variant="solid"> Solid Button </d-button>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100%;
  background-color: red;
}
</style>
