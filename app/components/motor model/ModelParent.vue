<template>
  <div id="motor-model">
    <!-- style="width: 500px; height: 500px;" -->
    <ModelChild
      :items="items"
      v-model:selected="selectedItem"
      :placeholder="items[0]?.value"
      width="500px"
      height="60px"
    />
  </div>
</template>

<script setup lang="ts">
import ModelChild from "./ModelChild.vue";
import { ref } from "vue";

const rawItems = ref([
  "موتور تک سیلندر",
  "موتور دوسیلندر به بالا",
  "موتورسکلت سه چرخ",
  "موتور سیکلت برقی",
]);

// تبدیل به آرایه ابجکت با key و value
const items = ref(
  rawItems.value.map((val, index) => ({
    key: `id :${index + 1}`,
    value: val,
  }))
);

const selectedItem = ref(null);

watch(selectedItem, (val) => {
  if (val) console.log({ [val.key]: val.value });
});
</script>
