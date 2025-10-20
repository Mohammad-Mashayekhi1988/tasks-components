<template>
  <div>
    <NuxtRouteAnnouncer />

    <ButtonParent />

    <FildParent />

    <CarParent />

    <MotorParent />

    <ModelParent />

    <CalendarParent />

    <DropDownParent />

    <StepsParent />

    <InsuranseFild />

    <DateParent/>

    <Text/>
  </div>
</template>

<script setup lang="ts">
import Text from "./components/text/Text.vue";
import DateParent from "./components/date/DateParent.vue";
import InsuranseFild from "./components/insuranseFild/InsuranseFild.vue";
import StepsParent from "./components/steps/StepsParent.vue";
import DropDownParent from "./components/dropdown/DropdownParent.vue";
import ModelParent from "./components/motor model/ModelParent.vue";
import MotorParent from "./components/motor license plate/MotorParent.vue";
import CarParent from "./components/license plate/CarParent.vue";
import FildParent from "./components/fild/FildParent.vue";
import ButtonParent from "./components/buttons/ButtonParent.vue";
import CalendarParent from "./components/calender/CalendarParent.vue";
</script>
