<template>
  <div id="plate">
    <CarChild @updateData="handleData" />
  </div>
</template>

<script setup lang="ts">
import CarChild from "./CarChild.vue";
const receivedData = ref({});
const handleData = (data) => {
  receivedData.value = data;
  console.log("داده دریافت شده از فرزند:", data);
  // درست کردن ترتیب نمایش خروجی
  const order = ["input3", "input1", "selectValue", "input2"];
  // تبدیل داده ها به استرینگ
  const dataString = order.map((key) => data[key]).join("  ");
  console.log("پلاک خودرو    :", dataString);
};
</script>
