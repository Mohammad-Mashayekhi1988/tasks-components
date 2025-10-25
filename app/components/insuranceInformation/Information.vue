<template>
  <v-row class="iransans">
    <v-col class="d-flex flex-column ga-5 align-center text-center justify-center" cols="3">
        <div class="circle">
            <v-img
            :src="iconUrl"
            :style="{ width: iconWidth, height: iconHeight }"
            alt="icon"
          class="icon"
          contain
          />
        </div>
        <v-text class="font-weight-bold">{{ insuranseText }}</v-text>
    </v-col>
    <v-col class="d-flex align-center text-center justify-center" cols="3">
        <div class="iransans">
            <h5> {{ branches }}</h5>
            <v-text class=" font-weight-bold">{{ branchesInfo }}</v-text>
        </div>
    </v-col>
    <v-col class="d-flex align-center text-center justify-center " cols="3">
        <div class="iransans">
            <h5> {{ wealth }}</h5>
            <v-text class=" font-weight-bold">{{ wealthInfo }}</v-text>
        </div>
    </v-col>
    <v-col class="d-flex align-center text-center justify-center" cols="3">
        <div class="iransans">
            <h5> {{ damage }}</h5>
            <v-text class=" font-weight-bold">{{ damageInfo }}</v-text>
        </div>
    </v-col>
  </v-row> 
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";

const props = defineProps({
  insuranseText: String,
  iconUrl: String,
  branches: String,
  wealth: String,
  damage: String,
  branchesInfo: String,
  wealthInfo: String,
  damageInfo: String,
  iconWidth: { type: String, default: "20px" },
  iconHeight: { type: String, default: "20px" },
});

</script>

<style scoped>

 h5{
  color: gray;
  margin-bottom: 15px;
 }
.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(209, 203, 203);
  border-radius: 100%;
  width: 100px;
  height: 100px;
  background-color: white;
  padding: 10px;
}
</style>