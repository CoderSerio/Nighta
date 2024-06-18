<script setup lang="ts">
import { ref } from "vue";
const count = ref(0);

defineProps<{ msg: string }>();
</script>

<template>
  <d-button variant="solid"> Solid Button </d-button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
