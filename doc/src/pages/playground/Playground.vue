<template>
  <div class="wrapper">
    <div class="editor-container">
      <div class="header">
        <div class="name">Nighta Playground</div>
        <d-button variant="solid" @click="runCode"> 运行代码 </d-button>
      </div>
      <div class="editor">
        <MonacoEditor
          v-model="value"
          @editor-mounted="editorMounted"
        ></MonacoEditor>
      </div>
    </div>
    <div class="result-container">
      <div
        class="result"
        :style="isValid ? { color: 'yellow' } : { color: 'red' }"
      >
        <template v-if="result instanceof Array">
          <template v-for="item in result">
            <div>{{ item }}</div>
          </template>
        </template>
        <template v-else>
          {{ result }}
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import * as monaco from "monaco-editor";
import MonacoEditor from "../../components/monacoEditor/MonacoEditor.vue";
import nighta from "../../util/interpreter.js";
import { onMounted, ref } from "vue";
import safeJsonStringify from "../../util/safeJsonStringify";

const value = ref<string | Array<any>>('(say "Hello World")');
const result = ref<string | Array<any>>("还没有执行代码");
const isValid = ref(true);

const editorMounted = (/*editor: monaco.editor.IStandaloneCodeEditor*/) => {
  // console.log("editor 实例加载完成", editor);
  // console.log("nighta 解释器加载完成", nighta.parse);
};

const runCode = () => {
  try {
    //TODO: 防抖节流
    console.error();
    const exp = nighta.parse(value.value);
    nighta.eval(exp);
    isValid.value = true;
    result.value = window.codeOutputList.map(safeJsonStringify);
    localStorage.setItem("nighta-playground-code-cache", value.value as string);
  } catch (err) {
    console.error();
    isValid.value = false;
    result.value = `${err}`;
    throw err;
  }
};

onMounted(() => {
  const cacheCode = localStorage.getItem("nighta-playground-code-cache");
  if (cacheCode) {
    value.value = cacheCode;
  }
});
</script>

<style scoped>
.wrapper {
  display: flex;
  height: calc(100vh - 60px);
}
.header {
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.name {
  font-weight: 800;
}
.editor-container {
  height: 100%;
  width: 700px;
  border-right: 2px solid #333;
  display: flex;
  flex-direction: column;
}
.editor {
  width: 100%;
  height: 100%;
}
.result-container {
  flex: 1;
  min-width: 120px;
}
.result {
  height: 100%;
  padding: 6px;
}
</style>
