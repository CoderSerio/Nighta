<template>
  <div ref="codeEditBox" class="codeEditBox"></div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { editorProps } from "./monacoEditorType";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import * as monaco from "monaco-editor";

export default defineComponent({
  name: "monacoEditor",
  props: editorProps,
  emits: ["update:modelValue", "change", "editor-mounted"],
  setup(props, { emit }) {
    self.MonacoEnvironment = {
      getWorker(_: string, label: string) {
        if (label === "json") {
          return new jsonWorker();
        }
        if (["css", "scss", "less"].includes(label)) {
          return new cssWorker();
        }
        if (["html", "handlebars", "razor"].includes(label)) {
          return new htmlWorker();
        }
        if (["typescript", "javascript"].includes(label)) {
          return new tsWorker();
        }
        return new EditorWorker();
      },
    };
    let editor: monaco.editor.IStandaloneCodeEditor;
    const keywords = [
      "var",
      "block",
      "set",
      "prop",
      "class",
      "new",
      "if",
      "switch",
      "while",
      "fun",
    ];

    const codeEditBox = ref();
    const init = () => {
      monaco.languages.register({ id: "nighta" });
      monaco.languages.setMonarchTokensProvider("nighta", {
        keywords,
        tokenizer: {
          root: [
            [/"([^"\\]*(\\.[^"\\]*)*)"/, "string"],
            [/\d+/, "number"],
            [/null|undefined/, "comment"],
            [/false|true/, "string"],

            [
              /[a-zA-Z_]\w*/,
              {
                cases: {
                  "@keywords": "keyword",
                  "@default": "symbol",
                },
              },
            ],
            [/[()]/, { token: "delimiter.parenthesis" }],

            // 假设 begin-end 是一种代码块的界定，这里简单处理作为示例
            // [/begin\b/, { token: "keyword.control" }, "@block.start"],
            // [/end\b/, { token: "keyword.control" }, "@pop"],

            // 新的状态用来匹配begin-end之间的内容
            // ["@block.start", "", { token: "" }, "@block.inner"],
            // ["@block.inner", /./, { token: "" }, "@block.inner"],
          ],
        },
        bracket: [["(", ")"]],
        autoClosingPairs: [{ open: "(", close: ")" }],
      });

      // monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      //   noSemanticValidation: true,
      //   noSyntaxValidation: false,
      // });
      // monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      //   target: monaco.languages.typescript.ScriptTarget.ES2020,
      //   allowNonTsExtensions: true,
      // });
      editor = monaco.editor.create(codeEditBox.value, {
        value: props.modelValue,
        language: "nighta",
        theme: props.theme,
        ...props.options,
      });
      editor.onDidChangeModelContent(() => {
        const value = editor.getValue();
        emit("update:modelValue", value);
        emit("change", value);
      });
      emit("editor-mounted", editor);
    };
    watch(
      () => props.modelValue,
      (newValue) => {
        if (editor) {
          const value = editor.getValue();
          if (newValue !== value) {
            editor.setValue(newValue);
          }
        }
      }
    );
    watch(
      () => props.options,
      (newValue) => {
        editor.updateOptions(newValue);
      },
      { deep: true }
    );
    watch(
      () => props.language,
      (newValue) => {
        monaco.editor.setModelLanguage(editor.getModel()!, newValue);
      }
    );
    onBeforeUnmount(() => {
      editor.dispose();
    });
    onMounted(() => {
      init();
    });
    return { codeEditBox };
  },
});
</script>

<style lang="scss" scoped>
.codeEditBox {
  width: v-bind(width);
  height: v-bind(height);
}
</style>
