<script lang="ts" setup>
import * as monaco from "monaco-editor";
import MonacoEditor from "../../components/monacoEditor/MonacoEditor.vue";
import nighta from "../../util/interpreter.js";
import { ref } from "vue";

const value = ref('(say "Hello World")');
const result = ref("还没有执行代码");

const editorMounted = (editor: monaco.editor.IStandaloneCodeEditor) => {
  console.log("editor实例加载完成", editor);
  console.log("nighta解释器加载完成", nighta.parse);
};
const runCode = () => {
  const exp = nighta.parse(value.value);
  const res = nighta.eval(exp);

  result.value = res;
};
</script>

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
      <div class="result">{{ result }}</div>
    </div>
  </div>
</template>

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
}
.result {
  height: 100%;
  padding: 6px;
  color: yellow;
}
</style>
