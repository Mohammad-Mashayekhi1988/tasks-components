<template>
  <div class="picker-wrapper" ref="wrapperRef">
    
    <button
      class="picker-input"
      @click="toggleOpen"
      type="button"
      aria-haspopup="dialog"
      :aria-expanded="open"
    >
      <span class="input-text">{{ displayValue }}</span>
      <i class="mdi mdi-chevron-down input-icon" aria-hidden="true"></i>
    </button>

    <!-- پاپ آور -->
    <div v-if="open" class="picker-popover" role="dialog" @click.stop>
      <!-- هدر منو -->
      <div class="popover-header">
        <button class="nav-btn" @click="prevPage" aria-label="قبلی">‹</button>

        <div class="center" >
          <div class="month-title" @click.stop="openMonthList">{{ monthNames[currentMonth] }}</div>
          <div class="year-title"  @click.stop="openYearList">{{ currentYear }}</div>
        </div>

        <button class="nav-btn" @click="nextPage" aria-label="بعدی">›</button>
      </div>

      <!-- بدنه منو-->
      <div class="popover-body">
        <!-- نمایش ماه ها -->
        <div v-if="view === 'month'" class="months-grid">
          <button
            v-for="(m, idx) in monthNames"
            :key="m"
            type="button"
            class="month-item"
            :class="{ active: currentMonth === idx }"
            @click="onMonthClick(idx)"
          >
            {{ m }}
          </button>
        </div>

        <!-- نمایش سالها -->
        <div v-if="view === 'year'" class="years-grid">
          <button
            v-for="y in yearsGrid"
            :key="y"
            type="button"
            class="year-item"
            :class="{ active: y === currentYear }"
            @click="onYearClick(y)"
          >
            {{ y }}
          </button>
        </div>

        <!-- نمایش روزها -->
        <div v-if="view === 'day'" class="day-view">
          <div class="weekdays">
            <span v-for="d in weekDays" :key="d">{{ d }}</span>
          </div>

          <div class="days-grid">
            <span
              v-for="n in leadingEmpty"
              :key="'e-' + n"
              class="day empty"
            ></span>

            <button
              v-for="day in monthDaysArray"
              :key="day.key"
              type="button"
              class="day"
              :class="{ selected: isSelected(day), today: isToday(day) }"
              @click="onDayClick(day)"
            >
              {{ day.jd }}
            </button>
          </div>
        </div>
      </div>
<!-- دکمه پاک کردن و تایید -->
      <!-- <div class="popover-footer">
        <button
          class="clear-btn"
          v-if="selected"
          @click="clearSelection"
          type="button"
        >
          پاک کردن
        </button>
        <div style="flex: 1"></div>
        <button class="ok-btn" @click="close" type="button">تایید</button>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import jalaali from "jalaali-js";


//  لیست ماه‌ها را باز میکند
function openMonthList() {
  view.value = 'month';
}
//  لیست سال ها را باز میکند
function openYearList() {
  view.value = 'year';
}

const props = defineProps({
  modelValue: { type: Object, default: null },
  startYearOffset: { type: Number, default: -10 },
  yearRangeLength: { type: Number, default: 21 },
  placeholder: { type: String, default: "تاریخ شماره گذاری /ترخیص" },
});
const emit = defineEmits(["update:modelValue"]);

const wrapperRef = ref(null);
const open = ref(false);
const view = ref("year"); // 'month' | 'year' | 'day'
const selected = ref(props.modelValue ? { ...props.modelValue } : null);

const todayG = new Date();
const jToday = jalaali.toJalaali(todayG);

const currentYear = ref(selected.value ? selected.value.jy : jToday.jy);
const currentMonth = ref(
  selected.value ? selected.value.jm - 1 : jToday.jm - 1
);

const monthNames = [
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
];
const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

const yearsGrid = computed(() => {
  const start = jToday.jy + props.startYearOffset;
  return Array.from({ length: props.yearRangeLength }, (_, i) => start + i);
});


const firstGregorianOfCurrent = computed(() => {
  const g = jalaali.toGregorian(currentYear.value, currentMonth.value + 1, 1);
  return new Date(g.gy, g.gm - 1, g.gd);
});

// تبدیل اولین روز هفته  از یکشنبه به شنبه
const leadingEmpty = computed(() => {
  const gd = firstGregorianOfCurrent.value.getDay(); 
  return (gd + 1) % 7;
});

/* تعداد روزهای ماه جاری  */
const daysInJalaliMonth = computed(() => {
 
  let nextMonth = currentMonth.value + 2;
  let nextYear = currentYear.value;
  if (nextMonth > 12) {
    nextMonth = 1;
    nextYear = currentYear.value + 1;
  }
  const nextGreg = jalaali.toGregorian(nextYear, nextMonth, 1);
  const nextDate = new Date(nextGreg.gy, nextGreg.gm - 1, nextGreg.gd);
  nextDate.setDate(nextDate.getDate() - 1);
  const lastJ = jalaali.toJalaali(nextDate);
  return lastJ.jd;
});

/* آرایهٔ روزها برای رندر */
const monthDaysArray = computed(() => {
  const days = [];
  const total = daysInJalaliMonth.value;
  for (let d = 1; d <= total; d++) {
    days.push({
      key: `${currentYear.value}-${currentMonth.value + 1}-${d}`,
      jy: currentYear.value,
      jm: currentMonth.value + 1,
      jd: d,
    });
  }
  return days;
});

/* helper checks */
function isSelected(dayObj) {
  if (!dayObj || !selected.value) return false;
  return (
    dayObj.jy === selected.value.jy &&
    dayObj.jm === selected.value.jm &&
    dayObj.jd === selected.value.jd
  );
}
function isToday(dayObj) {
  if (!dayObj) return false;
  return (
    dayObj.jy === jToday.jy &&
    dayObj.jm === jToday.jm &&
    dayObj.jd === jToday.jd
  );
}

// بازوبسته کردن منوی انتخاب
function toggleOpen() {
  open.value = !open.value;
  if (open.value && !view.value) view.value = "month";
}
// بستن با دکمه تایید
// function close() {
//   open.value = false;
// }

// بازکردن منوی روز در صورت کلیک روی ماه
function onMonthClick(idx) {
  currentMonth.value = idx;
  view.value = "day";
}

/* وقتی روی سال کلیک شد، به month view برگرد */
function onYearClick(y) {
  currentYear.value = y;
  view.value = "month";
}

/* وقتی روی روز کلیک شد، انتخاب نهایی انجام میشه */
function onDayClick(day) {
  selected.value = { jy: day.jy, jm: day.jm, jd: day.jd };
  emit("update:modelValue", { ...selected.value });
  open.value = false; // پاپ‌آور بسته می‌شود
}

// صفحه‌بندی هدر (prev/next)
function prevPage() {
  if (view.value === "year") {
    currentYear.value =
      currentYear.value - Math.ceil(props.yearRangeLength / 2);
  } else {
    currentYear.value--;
  }
}
function nextPage() {
  if (view.value === "year") {
    currentYear.value =
      currentYear.value + Math.ceil(props.yearRangeLength / 2);
  } else {
    currentYear.value++;
  }
}
// پاک کردن با دکمه
// function clearSelection() {
//   selected.value = null;
//   emit("update:modelValue", null);
// }

// نمایش تاریخ انتخاب شده در هدر
const displayValue = computed(() => {
  if (selected.value) {
    const pad = (n) => String(n).padStart(2, "0");
    return `${selected.value.jy} / ${pad(selected.value.jm)} / ${pad(
      selected.value.jd
    )}`;
  }

  return props.placeholder;
});

/* بستن با کلیک خارج از کامپوننت*/
function onDocClick(e) {
  if (!wrapperRef.value) return;
  if (!wrapperRef.value.contains(e.target)) {
    open.value = false;
  }
}
onMounted(() => document.addEventListener("click", onDocClick));
onBeforeUnmount(() => document.removeEventListener("click", onDocClick));

/* ردیابی تغییرات بیرونی modelValue */
watch(
  () => props.modelValue,
  (nv) => {
    if (nv) {
      selected.value = { ...nv };
      currentYear.value = nv.jy;
      currentMonth.value = nv.jm - 1;
    } else {
      selected.value = null;
    }
  }
);
</script>

<style scoped>
.picker-wrapper {
  position: relative;
  display: inline-block;
  direction: rtl;
  font-family: Vazirmatn, system-ui, sans-serif;
  width: 360px;
  max-width: 92vw;
}
.picker-input {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 10px;
  border: 2px solid rgb(116, 169,173);
  background: #fff;
  cursor: pointer;
  color: #222;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
}
.input-text {
  flex: 1;
  text-align: right;
  direction: ltr;
  color: #333;
}
.input-icon {
  font-size: 18px;
  color: rgb(100, 100, 100);
}

.picker-popover {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: calc(100% + 12px);
  width: 360px;
  background: #fff;
  border-radius: 10px;
  border: 2px solid rgb(116, 169,173);;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  z-index: 999;
  padding: 8px;
}
.popover-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgb(228, 248, 247);
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
}
.nav-btn {
  background: transparent;
  border: none;
  font-size: 20px;
  padding: 6px 10px;
  cursor: pointer;
}
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  user-select: none;
}
.month-title {
  font-weight: 600;
  color: #0b8b86;
}
.year-title {
  color: #073e3d;
  font-weight: 700;
}

.popover-body {
  padding: 6px 2px;
}

/* months */
.months-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 6px 12px;
}
.month-item {
  padding: 10px;
  border-radius: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #6b6b6b;
  transition: transform 0.08s, background 0.12s, color 0.12s;
}
.month-item:hover {
  transform: translateY(-4px);
  background: #f3fbfa;
  color: #0b8b86;
}
.month-item.active {
  background: #0bb0a6;
  color: #fff;
  font-weight: 700;
  box-shadow: 0 6px 14px rgba(11, 176, 166, 0.14);
}

/* years */
.years-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 6px 12px;
}
.year-item {
  padding: 10px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  color: #8b8b8b;
  background: transparent;
}
.year-item:hover {
  background: #f3fbfa;
  color: #0b8b86;
  transform: translateY(-3px);
}
.year-item.active {
  background: #0bb0a6;
  color: #fff;
  font-weight: 700;
  box-shadow: 0 6px 14px rgba(11, 176, 166, 0.14);
}

/* day view */
.day-view {
  padding: 6px 10px;
}
.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  color: #666;
  font-weight: 600;
  margin-bottom: 6px;
}
.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
}
.day {
  min-height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.12s, transform 0.08s;
}
.day:hover {
  background: #f0f8ff;
  transform: translateY(-2px);
}
.day.empty {
  background: transparent;
  cursor: default;
}
.day.selected {
  background: rgb(8, 172, 171);
  color: #fff;
  font-weight: 600;
  box-shadow: 0 4px 10px rgba(13, 110, 253, 0.12);
}
.day.today {
  border: 1px solid #0d6efd;
  border-radius: 8px;
}

/* footer */
.popover-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 6px 8px;
}
.clear-btn {
  background: #fff;
  border: 1px solid #e0e0e0;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}
.ok-btn {
  background: #0bb0a6;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
