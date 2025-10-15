<template>
  <div id="container">
    <div id="box-right">
      <div id="text">
        <p class="iransans">ایران</p>
      </div>
      <input
        v-model="input3"
        class="iransans"
        id="box-right-input"
        type="number"
        placeholder="50"
      />
    </div>
    <div id="box-left">
      <input
        v-model="input1"
        class="iransans"
        type="number"
        placeholder="643"
      />
      <div id="arrow">
        <label class="select-icon">
          <span  class="mdi mdi-chevron-down" aria-hidden="true"></span>
        </label>
        <select v-model="selectValue" class="iransans" id="select" size="1">
          <option>الف</option>
          <option>ب</option>
          <option>پ</option>
          <option>ت</option>
          <option>ث</option>
          <option>ج</option>
          <option>چ</option>
          <option>ح</option>
          <option>خ</option>
          <option>د</option>
          <option>ذ</option>
          <option>ر</option>
          <option>ز</option>
          <option>ژ</option>
          <option>س</option>
          <option>ش</option>
          <option>ص</option>
          <option>ض</option>
          <option>ط</option>
          <option>ظ</option>
          <option>ع</option>
          <option>غ</option>
          <option>ف</option>
          <option>ق</option>
          <option>ک</option>
          <option>گ</option>
          <option>ل</option>
          <option>م</option>
          <option>ن</option>
          <option>و</option>
          <option>ه</option>
          <option>ی</option>
        </select>
      </div>
      <input v-model="input2" class="iransans" type="number" placeholder="57" />
      <div id="flag">
        <img src="/icons/Flag.png" alt="" />
        <p class="iransans">IR</p>
        <p class="iransans">IRAN</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, reactive } from "vue";
// ارسال updateData به پدر
const emit = defineEmits(["updateData"]);
// متغیرهایی که مقدار فیلدها رو نگه میدارن
const input1 = ref("");
const input2 = ref("");
const input3 = ref("");
const selectValue = ref("ب");
// یک شئ که همه داده های فرم رو نگه میدارد
const formData = reactive({
  input1: "",
  input2: "",
  input3: "",
  selectValue: "",
});
// نظارت متغیرها
watch([input1, input2, input3, selectValue], () => {
  formData.input1 = input1.value;
  formData.input2 = input2.value;
  formData.input3 = input3.value;
  formData.selectValue = selectValue.value;
  // ارسال به پدر
  emit("updateData", { ...formData });
});
</script>

<style scoped>
#container {
  direction: rtl;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
#box-left,
#box-right {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border: 1px solid rgb(168, 165, 165);
  border-radius: 15px;
}
#box-right {
  height: 73px;
}
input {
  cursor: pointer;
  height: 50px;
  max-width: 80px;
  text-align: center;
  outline: none;
}

#select {
  width: 50px;
  max-height: 100px;
  overflow-y: auto;
  padding: 10px;
  color: gray;
  cursor: pointer;
}

#flag {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2px 4px;
  background-color: rgb(40, 40, 224);
  border-radius: 10px 0 0 10px;
  color: #fff;
}
#flag p {
  font-size: 12px;
}
#text {
  transform: rotate(-90deg);
  display: inline-block;
  border-top: 1px solid rgb(168, 165, 165);
  padding: 2px 15px;
}
#text p {
  font-size: 24px;
}
#arrow {
  display: flex;
  align-items: center;
}
.select-icon span {
  cursor: pointer;
  font-size: 24px;
  color: rgb(172, 172, 172);
}
</style>
