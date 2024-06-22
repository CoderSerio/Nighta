<script setup lang="ts">
import sectionList from "../../documents/sectionList";
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const mdRules = reactive({
  linkify: {
    fuzzyLink: false,
  },
});
const content = ref(`
# This is the title
`);
const updateContent = (section: { title: string; content: string }) => {
  content.value = `
# ${section.title}
${section.content}
`;
};

defineProps<{ msg: string }>();

watch(
  () => router.currentRoute.value.path,
  () => {
    const routerPath = router.currentRoute.value;
    const sectionName = routerPath.params?.section;
    console.log(sectionName, sectionList);
    let isMatched = false;
    for (const section of sectionList) {
      if (section.title === sectionName) {
        updateContent(section);
        isMatched = true;
        break;
      }
    }
    if (!isMatched) {
      updateContent(sectionList[0]);
    }
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <div class="editor-wrapper">
    <d-md-render
      :content="content"
      :md-rules="mdRules"
      class="md-render"
    ></d-md-render>
  </div>
</template>

<style scoped>
.editor-wrapper {
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
  padding: 12px;
}

.md-render {
  width: 100%;
}
:deep(.md-render code) {
  background: transparent !important;
}
</style>
