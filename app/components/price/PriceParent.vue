<template>
  <main class="bg-white ma-1 iransans">
    <v-row class="pa-1 ma-1 d-flex justify-center align-center">
      <v-col cols="6" class="text-end">
        <v-card-text
          v-if="props.text"
          class="text-decoration-line-through font-weight-bold"
        >
          {{ formattedValues.text }}
        </v-card-text>
      </v-col>
      <v-col cols="6" class="text-center">
        <div v-if="props.text" class="badg font-weight-bold">
          <p>{{ discount }}%</p>
        </div>
      </v-col>
      <v-col
        cols="6"
        class="text-end pa-0 d-flex align-center font-weight-bold ml-16"
      >
        <v-card-text class="text-center pa-0 pl-2 text-end font-weight-bold">
          {{ formattedValues.number }}
        </v-card-text>
        <v-text>{{ currency }}</v-text>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
<!--
text: String
textColor: String, default: black
textSize:  String, default: 1rem
fullWidth: Boolean
textWeight:[String, Number], default: 400
height: String
color: String
borderRadius: [String, Number] 
-->
        <ButtonChild
          fullWidth
          text="انتخاب بیمه"
          color="#00ACC1"
          text-weight="100"
          text-color="#fff"
          text-size="1rem"
          height="50px"
          borderRadius="5px"
        />
      </v-col>
      <v-col cols="6">
<!-- 
  text: String
  iconColor: String, default: white
  textColor: String, default: black
  textSize:  String, default: 1rem
  fullWidth: Boolean  
  mdiIcon: String
  icon: String
  iconPosition: String, default: ""
  validator: (v: string) => ["left", "right", "top"].includes(v), 
  textWeight:[String, Number], default: 400
  height: String
  color: String
  borderRadius: [String, Number]
  fullHeight: Boolean
-->
        <ButtonChild
          fullWidth
          text="افزودن برای مقایسه"
          mdiIcon="mdi-plus-circle-outline"
          icon-color="#00ACC1"
          icon="icon"
          iconPosition="left"
          iconSize="1.5rem"
          text-weight="100"
          text-color="#00ACC1"
          text-size="1rem"
          height="100px"
          color=""
          borderRadius="10px"
          fullHeight
        />
      </v-col>
    </v-row>
  </main>
</template>

<script setup lang="ts">
import ButtonChild from "../buttons/ButtonChild.vue";

import { computed, defineProps } from "vue";

const props = defineProps({
  width: { type: Number, default: 30 },
  height: { type: Number, default: 30 },
  radius: { type: [String, Number], default: 0 },
  bg: { type: String, default: "transparent" },
  text: String,
  number: String,
  currency: String,
  discount: { type: [String, Number], default: "" },
});

// تبدیل عدد به فارسی
function toPersianNumber(num: string | number): string {
  const str = num.toString(); // ابتدا به رشته تبدیل می‌کنیم
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
}

// جداکردن سه رقم سه رقم

const formattedValues = computed(() => {
  let formattedNumber = "";
  let formattedText = "";

  // فرمت number اگر وجود داشته باشه
  if (props.number != null) {
    const num =
      typeof props.number === "string"
        ? parseFloat(props.number)
        : props.number;
    formattedNumber = toPersianNumber(num.toLocaleString());
  }

  // فرمت text اگر وجود داشته باشه
  if (props.text != null) {
    const textNum =
      typeof props.text === "string" ? parseFloat(props.text) : props.text;
    formattedText = toPersianNumber(textNum.toLocaleString());
  }

  // بازگرداندن یک آبجکت با دو فیلد
  return {
    number: formattedNumber,
    text: formattedText,
  };
});
</script>

<style lang="css">
.badg {
  max-width: 50px;
  background-color: red;
  padding: 10px;
  color: white;
  border-radius: 10px;
}
</style>
