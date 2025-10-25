<template>
  <v-container class="border border-black rounded-xl"  style="margin-bottom: 50px;direction: rtl;">
    <v-row>
        <v-col class="d-flex align-center justify-center pa-10  information" cols="8"  >
<!--
  insuranseText: String
  iconUrl: String
  branches: String
  wealth: String
  damage: String
  branchesInfo: String
  wealthInfo: String
  damageInfo: String
  iconWidth: String, default: "20px" 
  iconHeight: String, default: "20px" 
-->
            <Information
            insuranseText="دی"
            :icon-url="'/icons/Day.png'"
            icon-width="10"
            icon-height="15"
            branches="تعداد شعب"
            wealth="توانگری مالی"
            damage="پرداخت خسارت سیار"
            branchesInfo ="24"
            wealthInfo = "5 از 5"
            damageInfo ="دارد"
            />
        </v-col>
        <v-col  cols="4" >
<!--
  width: Number, default: 30 
  height: Number, default: 30 
  radius: [String, Number], default: 0 
  bg: String, default: "transparent" 
  text: String,
  number: String,
  currency: String,
  discount: [String, Number], default: "" 
-->
            <PriceParent
            text="5555555"
            number="5065981"
            discount = 7
             currency="ریال"
             
            />
        </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import PriceParent from "../price/PriceParent.vue";
/**
 * 
 * @param val 
 * توی این تابع ما خیلی کارا میکنیم
 */
import Information from "../insuranceInformation/Information.vue";
</script>

<style scoped>
.information{
  border-left: 3px solid rgb(199, 196, 196);
}
</style>
