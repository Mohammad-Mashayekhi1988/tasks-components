<template>
  <Date
  class="cont iransans"
  @update="handleUpdate"
  />
</template>

<script setup>
import Date from './Date.vue';
import { ref } from 'vue';
const selectedData=ref({})
const handleUpdate=(data)=>{
    selectedData.value =  data
    console.log(data);
}
</script>

<style scoped>
.cont{
    margin: 100px auto;
}

</style>