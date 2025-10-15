<template>
  <div id="motor">
    <MotorChild @update="handleMotor" />
  </div>
</template>

<script setup lang="ts">
import MotorChild from "./MotorChild.vue";

// نگهداری داده های ارسالی از فرزند
const motorData = ref({});
// هروقت دادهای emit شود اجرا میشود
const handleMotor = (data) => {
  
  motorData.value = data;
  console.log('داده دریافت شده از فرزند:', data);
  // درست کردن ترتیب نمایش خروجی
  const order = ['inputOne','inputTwo'];
  // تبدیل داده ها به استرینگ
  const dataMotor = order.map(key => data[key]).join('  ');
  console.log('پلاک موتور    :', dataMotor);
};
</script>

