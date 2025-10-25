<template>
  <div
    class="dropdown-header iransans"
    @click="open = !open"
    :style="{ borderRadius: radius }"
  >
    <span>{{ selectedLabel || placeholder }}</span>
    <v-icon size="20" :class="{ rotated: open }"color="rgb(42,132,195)" >mdi-chevron-down </v-icon>
  </div>

  <!-- محتوای منو -->
  <v-expand-transition>
    <div
      v-if="open"
      class="dropdown-content iransans"
      @click.stop
      :style="{ border: border }"
    >
      <v-radio-group
        v-model="selectedValue"
        @update:model-value="onSelect"
        color="primary"
        class="radio-group"
      >
        <v-radio
          v-for="item in items"
          :key="item.id"
          :label="item.label"
          :value="item"
          class="radio-item"
        />
      </v-radio-group>
    </div>
  </v-expand-transition>
</template>

<script setup>
import { ref, computed, watch } from "vue";
// items { id: 12, label: "البرز" }
// border="3px solid rgb(42,132,195)"
// fullWidth $fulHeight
// radius="10px"
const props = defineProps({
  items: { type: Array, default: () => [] },
  modelValue: { type: Object, default: null },
  placeholder: { type: String, default: "انتخاب کنید" },
  border: { type: String, default: "1px solid rgb(238, 238, 238)" },
  radius: { type: (String, Number), default: "5px" },
});

const emit = defineEmits(["update:modelValue"]);

const open = ref(false);
const selectedValue = ref(props.modelValue);

const selectedLabel = computed(() => selectedValue.value?.label || "");

watch(
  () => props.modelValue,
  (val) => {
    selectedValue.value = val;
  }
);

function onSelect(val) {
  emit("update:modelValue", val); // آبجکت کامل {id,label}
  open.value = false; // منو بسته شود
}
</script>

<style scoped>

.dropdown-header {
    direction: rtl;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border: 1px solid #b6b3b3;
  cursor: pointer;
  height: 100%;
}
.v-icon.rotated {
  transform: rotate(180deg);
  transition: 0.2s;
}
.dropdown-content {
  margin-top: 8px;
  border: 1px solid rgb(238, 238, 238);
  border-radius: 8px;
  padding: 8px;
  background: #fff;
}
.radio-group {
  direction: rtl;
  text-align: right;
  
}
.radio-item {
  margin-bottom: 6px;
  border: 1px solid rgb(231, 224, 224);
}
</style>
