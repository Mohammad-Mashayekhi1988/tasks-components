<template>
  <div class="discount">
    <v-row
      class="d-flex align-center justify-space-between"
      style="direction: rtl; border: 1px dashed blue"
      no-gutters
    >
      <v-col cols="auto">
        <v-text-field
        density="compact"
          v-model="coupon"
          placeholder="کد تخفیف"
          dir="rtl"
          dense
          style="width: 180px;padding-right: 5px;"
          variant="plain"
          hide-details
        />
      </v-col>
      <v-col cols="auto"  style="height: 50px">
        <ButtonChild
          class="iransans"
          text="ثبت کد"
          color="rgb(2,175,173)"
          text-weight="900"
          text-color="#fff"
          text-size="1rem"
          borderRadius="5px"
          fullHeight
          @click="discountValue"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { defineEmits , ref } from "vue";
import ButtonChild from "../buttons/ButtonChild.vue";
const coupon=ref('')
const emit=defineEmits(['value'])
const discountValue=()=>{
      const val = (coupon.value ?? '').toString().trim()
  if (!val) return  // اگر خالیه کاری نکن

  emit('value', { code: val })
  coupon.value = ''
}

</script>

<style scoped>
.discount {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  padding: 10px;
  width: 300px;
  margin-bottom: 50px;
  border: 1px solid gray;
}
</style>
