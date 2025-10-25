<template>
  <label class="d-block text-right mb-1 iransans">{{ label }}</label>
  <v-text-field
    dir="rtl"
    :placeholder="placeholder"
    :type="type"
    variant="outlined"
   
    :rounded="50"
    class="iransans"
    bg-color="#f4f8fb"
    :color="color"
    :class="customClass"
    :style="[rootStyle]"
    @focus="onFocus"
    @blur="onBlur"
    @keydown="onKeydown"
    @keyup="onKeyup"
    @update:modelValue="onUpdateModelValue"
  >
  </v-text-field>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

  // width & height :  600 | "600px"

const props = defineProps({
  label: String,

  modelValue: { type: [String, Number], default: "" },
  width: { type: [String, Number], default: "100%" },
  height: { type: [String, Number], default: "48px" },
  placeholder: { type: String, default: "" },
  type: { type: String, default: "text" },
  color: { type: String, default: "" },
  border: { type: String, default: "" },

  borderRadius: { type: [String, Number] },
  customClass: { type: String, default: "" },
});

const emit = defineEmits([
  "update:modelValue",
  "focus",
  "blur",
  "input",
  "change",
  "keydown",
  "keyup",
]);

const innerValue = ref(props.modelValue);
watch(
  () => props.modelValue,
  (v) => {
    innerValue.value = v;
  }
);
watch(innerValue, (v) => {
  emit("update:modelValue", v);
  emit("input", v);
});

const rootStyle: any = computed(() => {
  const w = parseInt(props.width + "") + "px";
  const h =
    typeof props.height === "number" ? `${props.height}px` : props.height;
  const radius =
    typeof props.borderRadius === "number"
      ? `${props.borderRadius}px`
      : props.borderRadius;

  return {
    width: w,
    height: h,
    boxSizing: "border-box",
    borderRadius: radius,
    border: props.border || "1px solid transparent",
  };
});

/** ارسال ایونت‌ها به والد */
function onFocus(e: FocusEvent) {
  emit("focus", e);
}
function onBlur(e: FocusEvent) {
  emit("blur", e);
}
function onKeydown(e: KeyboardEvent) {
  emit("keydown", e);
}
function onKeyup(e: KeyboardEvent) {
  emit("keyup", e);
}

function onUpdateModelValue(val: any) {
  emit("update:modelValue", val);
  emit("input", val);
}
</script>