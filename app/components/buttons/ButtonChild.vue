<template>
  <v-btn
    :color="useVuetifyColor ? props.color : undefined"
    :style="finalStyle"
    :disabled="disabled"
    :block="fullWidth"
    :elevation="btnBorder ? 2 : 0"
    :class="[
      'base-btn',
      buttonPosClass,
      { 'flex-column': props.iconPosition === 'top' },
    ]"
    @click="onClick"
    :stacked="stacked"
  >
    <!-- icons -->

    <template v-if="props.iconPosition === 'left'" #prepend>
      <v-icon :icon="mdiIcon" :size="iconSize" :color="iconColor" />
    </template>

    <template v-if="props.iconPosition === 'top'">
      <v-icon :icon="mdiIcon" :size="iconSize" :color="iconColor" class="mb-2" />
    </template>

    <template v-if="props.iconPosition === 'right'" #append>
      <v-icon :icon="mdiIcon" :size="iconSize" :color="iconColor" />
    </template>

    <span
      class="btn-text"
      :style="{ color: textColor, fontSize: textSize, fontWeight: textWeight }"
    >
      <slot>{{ text }}</slot>
    </span>
  </v-btn>
</template>

<script setup lang="ts">
import { computed, useSlots } from "vue";

// height ="100px"
// fullHeight & fullWidth => 100%
// text-color ="#00ACC1" | "rgb" | "red"
// text-size ="1.5rem" | "10px"
// text-weight="700"
// border="2px solid #00ACC1"
// btnBorder -> سایه true | false
// text="بیمه موتور"
// mdiIcon="mdi-motorbike"
// borderRadius="10px" | 20 
// icon-color = "#00ACC1" | "rgb" | "red"
// iconSize="2.5rem"
// iconPosition="top" | "left" | "right"
const props = defineProps({
  iconColor: { type: String, default: "white" },
  textColor: { type: String, default: "black" },
  textSize: { type: String, default: "1rem" },
  textWeight: { type: [String, Number], default: "400" },
  border: String,
  text: String,
  color: String,
  disabled: Boolean,
  btnBorder: Boolean,
  borderRadius: [String, Number],
  icon: String,
  mdiIcon: String,
  mdiIconColor: { type: String, default: "white" },
  mdiIconsize: { type: Number, default: 24 },
  stacked: Boolean,
  fullWidth: Boolean,
  fullHeight:Boolean,
  height:String,
  width:String,
  iconSize: { type: [String, Number], default: 20 },
  iconPosition: {
    type: String,
    default: "",
    validator: (v: string) => ["left", "right", "top"].includes(v),
  },
});

const emit = defineEmits<{
  (e: "onBTNCLICK", event: MouseEvent, data: string): void;
}>();

const slots = useSlots();
// گرفتن رنگ دکمه با هر ورودی
const useVuetifyColor = computed(() => {
  if (!props.color) return true;
  return !/^#|^rgb\(|^rgba\(|^hsl\(|^hsla\(/i.test(props.color);
});




const baseStyle = computed(() => ({
  btnBorder: props.btnBorder ? "1px solid currentColor" : undefined,
  borderRadius:
    typeof props.borderRadius === "number"
      ? props.borderRadius + "px"
      : props.borderRadius,
  width: props.fullWidth ? "100%" : props.width,
  height: props.fullHeight ? "100%" : props.height,
}));
// style

const finalStyle = computed(() => {
  const s = { ...baseStyle.value } as Record<string, any>;
  if (!useVuetifyColor.value && props.color) {
    s.backgroundColor = props.color;
  }

  // border

  if (props.border) {
    s.border = props.border;
  }
  return s;
});

const buttonPosClass = computed(() => {
  return {
    "icon-top": props.iconPosition === "top",
    "icon-left": props.iconPosition === "left",
    "icon-right": props.iconPosition === "right",
  };
});

const iconNode = computed(() => {
  if (slots.icon) return { type: "slot", name: "icon" };
  if (props.icon) return { type: "text", value: props.icon };
  if (slots.append) return { type: "slot", name: "append" };
  return null;
});

function onClick(e: MouseEvent) {
  emit("onBTNCLICK", e, "دکمه کلیک شد");

}
</script>
