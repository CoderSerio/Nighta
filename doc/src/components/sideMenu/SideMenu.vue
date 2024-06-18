<template>
  <d-menu
    @select="select"
    @deselect="deselect"
    @submenu-change="submenuChange"
    :default-select-keys="['item1']"
    multiple
    width="256px"
  >
    <d-menu-item key="item1"> Item1 </d-menu-item>
    <d-menu-item key="item2"> Item2 </d-menu-item>
    <d-sub-menu title="Setting" key="icon-setting">
      <template #icon>
        <i class="icon-setting"></i>
      </template>
      <d-menu-item key="setting-item">
        <span>Setting item</span>
      </d-menu-item>
    </d-sub-menu>
  </d-menu>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const select = (e) => {
      console.log(e);
    };
    const deselect = (e) => {
      console.log(e);
    };
    const submenuChange = (e) => {
      console.log(e);
    };
    return {
      select,
      deselect,
      submenuChange,
    };
  },
});
</script>
