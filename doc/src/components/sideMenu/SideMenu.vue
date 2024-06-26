<template>
  <d-menu mode="vertical" multiple width="108px">
    <template v-for="section in props.data" :key="section.title">
      <RouterLink :to="`/main/${section.title}`">
        <d-menu-item class="menu-item">
          <div
            :style="
              activeSectionName === section.title
                ? {
                    color: '#526ECC',
                    borderLeft: '4px solid #344899',
                    paddingLeft: '16px',
                    transition: '0.1s ease-in',
                  }
                : {
                    color: '#fff',
                  }
            "
          >
            {{ section.title }}
          </div>
        </d-menu-item>
      </RouterLink>
    </template>
  </d-menu>
  <!-- <div class="side-menu-wrapper">
    <div class="text">
      {{ props.data }}
    </div>
    <template v-for="section in props.data" :key="section.title">
      <div class="text">
        {{ section.title }}
      </div>
    </template>
  </div> -->
</template>

<script setup lang="ts">
import { watch, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const activeSectionName = ref();

const props = defineProps<{
  data: Array<{ title: string; content: string }>;
}>();

const router = useRouter();

onMounted(() => {
  const path = props.data?.[0]?.title ?? "404";
  router.replace(`/main/${path}`);
});

watch(
  () => router.currentRoute.value.path,
  () => {
    const routerPath = router.currentRoute.value;
    const sectionName = routerPath.params?.section;
    activeSectionName.value = sectionName;
  }
);
</script>

<style scoped>
.side-menu-wrapper {
  width: 254px;
  height: calc(100vh - 60px);
  border-right: 2px solid #333;
  background-color: red;
}
/* .menu-item { */
/* width: 100%; */
/* } */
.text {
  width: 100%;
  height: 200px;
}
.menu-item {
}

:deep(.devui-menu-item-select),
:deep(.devui-menu-item) {
  background-color: transparent !important;
}
:deep(.devui-menu-item-select)::after {
  display: none;
}
</style>
