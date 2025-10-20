<template>
  <div class="container">
    <div
      class="circle"
      :style="{ backgroundColor: bgColor , border:border}"
    >
      <p class="circle-p" :style="{color: textColor }">{{text}}</p>
    </div>
    <p class="iransans">{{ title }}</p>
</div>
</template>

<script setup lang="ts">
const props = defineProps({
  bgColor: String,
  width: Number,
  height: Number,
  textColor: String,
  text:String,
  title:String,
  border:String
});
</script>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 200px;
    height: 200px;
    margin-left: 500px;
    position: absolute;
    top: 200px;
    left: -400px;
}
.circle {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  width: 50px;
  height: 50px;
  /* background-color: red; */
  border-radius: 100%;
}
</style>
