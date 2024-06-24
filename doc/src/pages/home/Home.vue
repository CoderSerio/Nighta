<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const linkTo = (path: string) => {
  router.push(path);
};
</script>

<template>
  <div class="wrapper">
    <div class="text-wrapper">
      <div class="info">
        <div class="title">Nighta</div>
        <div class="description">一夜之间诞生的脚本语言</div>
      </div>
      <d-button variant="solid" @click="linkTo('/main')"> 从这里开始 </d-button>
    </div>

    <div class="image-wrapper">
      <img src="/nighta.png" alt="Nighta 一夜之间诞生的脚本语言" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-around;
}

.image-wrapper {
  width: 720px;
  height: 720px;
  background-color: #eeeeee;
  border-radius: 20%;
  transform: skewX(-10deg);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-wrapper > img {
  height: 720px;
  width: 720px;
}

.text-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 4rem;
}

.title {
  font-size: 6rem;
}

.description {
  font-size: 2rem;
}
</style>
