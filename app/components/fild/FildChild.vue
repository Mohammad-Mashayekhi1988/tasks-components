<template>
  <label class="d-block text-right mb-1 iransans">{{ label }}</label>
  <v-text-field
    dir="rtl"
    :placeholder="placeholder"
    :type="type"
    variant="outlined"
    shaped
    class="iransans"
    bgColor="#f4f8fb"
    :color="color"
    :style="[rootStyle]"
    :class="customClass"
    @focus="onFocus"
    @blur="onBlur"
    @keydown="onKeydown"
    @keyup="onKeyup"
    @update:modelValue="onUpdateModelValue"
    />

</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'


const props = defineProps({
  label: String, 

  modelValue: { type: [String, Number], default: '' },
  width: { type: [String, Number], default: '100%' },
  height: { type: [String, Number], default: '48px' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  color: { type: String, default: '' },
  border: { type: String, default: '' },

  borderRadius:{type:[String , Number]},

  // variant: { type: String, default: 'rounded' },
  customClass: { type: String, default: '' },
})

/** Emits */
const emit = defineEmits([
  'update:modelValue',
  'focus',
  'blur',
  'input',
  'change',
  'keydown',
  'keyup'
])


const innerValue = ref(props.modelValue)
watch(() => props.modelValue, (v) => { innerValue.value = v })
watch(innerValue, (v) => { emit('update:modelValue', v); emit('input', v) })


const rootStyle:any = computed(() => {
  // const w = typeof props.width === 'number' ? `${props.width}px` : props.width
  const w = parseInt(props.width+'')+'px'
  const h = typeof props.height === 'number' ? `${props.height}px` : props.height
  const borderRadios =  props.borderRadius ? '' : ''

  return {
    width: w,
    // height: h,
    // height: '100%',
    boxSizing: 'border-box',
    // border:'1px solid'
    // border: props.border,
  }
})

/** ارسال ایونت‌ها به والد */
function onFocus(e: FocusEvent) { emit('focus', e) }
function onBlur(e: FocusEvent) { emit('blur', e) }
function onKeydown(e: KeyboardEvent) { emit('keydown', e) }
function onKeyup(e: KeyboardEvent) { emit('keyup', e) }

function onUpdateModelValue(val: any) {
  emit('update:modelValue', val)
  emit('input', val)
}

</script>