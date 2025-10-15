<template>
    
    <div id="buttons">
    <!-- button-left -->
    <div style="width: auto; height: auto">
      <ButtonChild
        @onBTNCLICK="handleClick"
        color="green"
        icon="icon"
        mdiIcon="mdi-check"
        prepend="mdi-star"
        append="mdi-check"
        fullWidth
        borderRadius="10px"
      >
      </ButtonChild>
    </div>
    <!-- button-between -->

    <div style="width: 250px; height: auto">
      <ButtonChild
        text-color="#00ACC1"
        text-size="1.5rem"
        text-weight="700"
        icon-color="#00ACC1"
        height="100px"
        color=""
        icon="icon"
        mdiIcon="mdi-motorbike"
        fullWidth
        :stacked="true"
        borderRadius="10px"
        iconPosition="top"
        border="2px solid #00ACC1"
        @onBTNCLICK="handleClick"
      >
        بیمه موتور
      </ButtonChild>
    </div>
    <!-- button-between -->

    <div style="width: 250px; height: auto">
      <ButtonChild
        text-color="white"
        text-size="1.5rem"
        text-weight="700"
        icon-color="#fff"
        height="100px"
        color="#00ACC1"
        icon="icon"
        mdiIcon="mdi-car-hatchback"
        fullWidth
        :stacked="true"
        borderRadius="10px"
        iconPosition="top"
        @onBTNCLICK="handleClick"
      >
        بیمه خودرو
      </ButtonChild>
    </div>
    <!-- button-right -->
    <div style="width: auto; height: auto">
      <ButtonChild
        @onBTNCLICK="handleClick"
        color="red"
        icon="icon"
        prepend="mdi-star"
        mdiIcon="mdi-check"
        append="mdi-check"
        fullWidth
        borderRadius="20px"
        iconPosition="right"
      >
      </ButtonChild>
    </div>
  </div>
</template>

<script setup lang="ts">

import ButtonChild from "./ButtonChild.vue";
function handleClick(event: MouseEvent, data: string) {
  console.log("child message : ", data);
}
</script>

<style scoped>
#buttons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 50px;
  margin-top: 30px;
}

</style>
