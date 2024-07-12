<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const openLink = () => {
  window.open("https://github.com/CoderSerio/Nighta");
};

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
      <div class="button-wrapper">
        <d-button variant="solid" @click="linkTo('/main')" class="button">
          开始体验
        </d-button>
        <d-button @click="openLink()" class="button"> GitHub </d-button>
      </div>
    </div>

    <div class="image-wrapper">
      <img src="/nighta.png" alt="Nighta 一夜之间诞生的脚本语言" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background-color: #252b3a;
  height: calc(100vh - 60px);
}
@media screen and (min-width: 1024px) {
  .wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
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

  .title {
    font-size: 8rem;
    margin-bottom: 1rem;
    font-weight: 800;
    transform: skewX(-10deg);
  }
}

@media screen and (max-width: 1024px) {
  .wrapper {
    display: flex;
    flex-direction: column-reverse;
    justify-content: center;
  }
  .image-wrapper {
    height: 240px;
    border-radius: 20%;
    transform: skewX(-10deg);
    overflow: hidden;
    display: flex;
    justify-content: center;
    /* display: none; */
  }

  .image-wrapper > img {
    height: 100%;
    border-radius: 50%;
    background-color: #eeeeee;
  }

  .button {
    margin: 0 80px;
    height: 64px;
    font-size: 22px;
    letter-spacing: 4px;
    transform: skewX(-10deg);
  }

  .title {
    font-size: 6rem;
    margin-bottom: 1rem;
    font-weight: 800;
  }
}

.text-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  gap: 3rem;
}

.description {
  font-size: 2rem;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  align-items: space-between;
  gap: 1em;
  .button {
    width: 40%;
  }
}
</style>
