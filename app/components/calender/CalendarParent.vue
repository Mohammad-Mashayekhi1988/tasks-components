<template>
  <div class="app">
      <CalendarChild v-model="myDate"
      />

  </div>
</template>

<script setup>
import { ref } from "vue";
import CalendarChild from "./CalendarChild.vue";

const myDate = ref(null);


watch(myDate, (newVal) => {
  console.log('myDate (reactive):', newVal)
  console.log('myDate (plain):', JSON.stringify(newVal))
  
})
</script>

<style scoped>
.app {
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
}
</style>
