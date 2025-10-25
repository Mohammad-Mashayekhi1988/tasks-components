<template>
  <div id="field">
    <div class="pa-6">
      <FildChild
        :label="fieldProps.textLabel"
        :placeholder="fieldProps.placeholder"
        :width="fieldProps.width"
        :height="fieldProps.height"
        :type="fieldProps.type"
        :color="fieldProps.color"
        :border="fieldProps.border"
        :borderRadius="fieldProps.radius"
        @focus="onFocus"
        @blur="onBlur"
        @input="onInput"
        @keydown="onKeydown"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const fieldProps = reactive({
  textLabel: "label",
  width: "600px",
  height: 50,
  placeholder: "کد ملی",
  type: "text",
  color: "#B6AE9F",
});

function onFocus(e: FocusEvent) {
  console.log("focused");
}
function onBlur(e: FocusEvent) {
  console.log("blurred");
}

function onInput(v: any) {
  console.log("کد ملی : ", v);
}
function onKeydown(e: KeyboardEvent) {
  console.log("key", e.key);
}
</script>

<style scoped>
#field {
  display: flex;
  justify-content: center;
}
</style>
