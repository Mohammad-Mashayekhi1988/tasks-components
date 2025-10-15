<template>
  <div>
    <NuxtRouteAnnouncer />

    <ButtonParent />

    <FildParent />

    <CarParent />

    <MotorParent />

    <ModelParent />

    <CalendarParent />
  </div>
</template>

<script setup lang="ts">
import ModelParent from "./components/motor model/ModelParent.vue";
import MotorParent from "./components/motor license plate/MotorParent.vue";
import CarParent from "./components/license plate/CarParent.vue";
import FildParent from "./components/fild/FildParent.vue";
import ButtonParent from "./components/buttons/ButtonParent.vue";
import CalendarParent from "./components/calender/CalendarParent.vue";
</script>
