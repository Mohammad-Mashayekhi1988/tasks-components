<template>
  <v-container style="direction: rtl" class="iransans">
    <v-row class="d-flex justify-center align-center iransans">
      <v-col cols="1" class="col-with-min iransans" style="direction: rtl">
        <v-select
          v-model="selectedDay"
          :items="days"
          placeholder="2"
          menu-icon=""
          variant="plain"
          :menu-props="{ contentClass: 'text-right' }"
          dir="rtl"
          style="border: 2px solid #ccc; border-radius: 10px; height: 36px"
          density="compact"
        >
          <template #prepend-inner>
            <v-icon class="left-icon" size="20">mdi-chevron-down</v-icon>
          </template>
        </v-select>
      </v-col>

      <v-col cols="1" class="col-with-min">
        <v-select
          class="my-select"
          v-model="selectedMonth"
          :items="months"
          placeholder="تیر"
          menu-icon=""
          variant="plain"
          :menu-props="{ contentClass: 'text-right' }"
          dir="rtl"
          density="compact"
          style="border: 2px solid #ccc; border-radius: 10px; height: 36px"
        >
          <template #prepend-inner>
            <v-icon class="left-icon" size="20">mdi-chevron-down</v-icon>
          </template>
        </v-select>
      </v-col>

      <v-col cols="1" class="col-with-min">
        <v-select
          v-model="selectedYear"
          :items="years"
          placeholder="1404"
          menu-icon=""
          variant="plain"
          class="text-right"
          :menu-props="{ contentClass: 'text-right' }"
          dir="rtl"
          density="compact"
          style="border: 2px solid #ccc; border-radius: 10px; height: 36px"
        >
          <template #prepend-inner>
            <v-icon class="left-icon" size="20">mdi-chevron-down</v-icon>
          </template>
        </v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const selectedDay = ref(null);
const selectedMonth = ref(null);
const selectedYear = ref(null);
const months = ref([
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
]);

const days = ref(Array.from({ length: 31 }, (_, i) => toPersianNumber(i + 1)));
const years = ref(Array.from({ length: 51 }, (_, i) => toPersianNumber(1400 + i)));

// ارسال به والد
const emit = defineEmits(["update"]);

watch([selectedDay, selectedMonth, selectedYear],
    ([days,months,years])=>{
        emit('update',{days,months,years})
    }
);
// فارسی کردن اعداد
function toPersianNumber(n) {
  const persian = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
  return n.toString().split('').map(d => persian[d] || d).join('');
}
</script>

<style scoped>
.left-icon {
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
  transform: translateY(1px);
  cursor: pointer;
}
.col-with-min {
  min-width: 150px;
}
</style>
