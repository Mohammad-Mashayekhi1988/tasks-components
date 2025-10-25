<template>
  <div class="container" style="width: 300px; height: 50px;">
    <DropdownDropDownChild
      v-model="chosen"
      :items="items"
      placeholder="شرکت های  بیمه "
      border="3px solid rgb(42,132,195)"
      radius="10px"

    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const chosen = ref(null);
const items = ref([
  { id: 1, label: "سرمد" },
  { id: 2, label: "دی" },
  { id: 3, label: "ایران " },
  { id: 4, label: "سامان" },
  { id: 5, label: "تعاون" },
  { id: 6, label: "پارسیان" },
  { id: 7, label: "دانا" },
  { id: 8, label: "معلم" },
  { id: 9, label: "آرمان" },
  { id: 10, label: "سینا" },
  { id: 11, label: "نوین" },
  { id: 12, label: "البرز" },
]);

watch(chosen, (val) => {
  console.log("گزینه انتخاب‌ شده:", val);
});
</script>
<style scoped>
.container {
  margin-left: 500px;
  margin-bottom: 200px;
}
</style>