<template>
  <div id="container">
    <div id="box">
      <input v-model="inputOne" id="input-one" class="iransans" type="number" placeholder="55555" />
      <input v-model="inputTwo" class="iransans" type="number" placeholder="555" />
      <div id="box-box">
        <div id="flag">
          <p class="iransans p1">IRAN</p>
          <p class="iransans p2">IR</p>
          <img src="/icons/Flag.png" alt="" />
        </div>
        <div>
            <p class="iransans">موتور سیکلت</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, reactive } from 'vue';
const emit = defineEmits(['update']);
const inputOne=ref();
const inputTwo=ref();

const formData = reactive({
  inputOne: '',
  inputTwo: '',
});

watch([inputOne, inputTwo], () => {
  formData.inputOne = inputOne.value;
  formData.inputTwo = inputTwo.value;
// ارسال به پدر
  emit('update', { ...formData });
});

</script>

<style scoped >
#container {
  margin-top: 50px;
  direction: rtl;
  width: 347px;
  margin-right: auto;
  margin-left: auto;
}
#box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  border: 1px solid rgb(168, 165, 165);
  border-radius: 15px;
  height: 75px;
}
#box input{
    max-width: 100px;
    margin-right: 0px;
    height: 100%;
    text-align: center;
}
#input-one{
    border-left: 1px solid gray;
    box-sizing: border-box;
}
#box-box {
  display: flex;
  flex-direction: column;
  background-color: rgb(40, 40, 224);
  border-radius: 10px 0 0 10px;
  color: #fff;
  padding: 10px 10px;
}
#flag {
    display: flex;
    align-items: center;
    gap: 5px;
}
#flag p {
  font-size: 12px;
}
</style>
