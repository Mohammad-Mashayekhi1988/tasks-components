<template>
  <div class="dropdown-container iransans" ref="containerRef">
    <div
      class="dropdown-toggle"
      @click="toggleSecond"
      :style="{ width: width, height: height }"
    >
      <span :class="selectedItem ? 'selected' : 'placeholder'">
        {{ selectedItem?.value || items[0]?.value }}
      </span>

      <label class="select-icon">
        <span class="mdi mdi-chevron-down" aria-hidden="true"></span>

        <!-- ضربدر فقط وقتی چیزی انتخاب شده نمایش بده -->
        <span
          v-if="selectedItem"
          class="mdi mdi-close select-clear"
          @click.stop="clearSelection"
          aria-hidden="true"
        >
        </span>
      </label>
    </div>

    <div v-if="showSecond" class="dropdown-menu" :style="{ width: width }">
      <div
        v-for="item in items"
        :key="item.key"
        class="dropdown-item"
        :class="{ active: selectedItem?.key === item.key }"
        @click="selectItem(item)"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  items: { type: Array, default: () => [] },
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "انتخاب کنید" },
  width: { type: String, default: "100%" },
  height: { type: String, default: "40px" },
});

const selectedItem = ref(props.modelValue);
const emit = defineEmits(["update:selected"]);

const selectItem = (item) => {
  selectedItem.value = item;
  emit("update:selected", item);
  showSecond.value = false;
};

const showSecond = ref(false);
const containerRef = ref(null);

const toggleSecond = () => {
  showSecond.value = !showSecond.value;
};

// تابع برای بررسی کلیک خارج از div
const handleClickOutside = (event) => {
  if (containerRef.value && !containerRef.value.contains(event.target)) {
    showSecond.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

// ضربدر
const clearSelection = () => {
  selectedItem.value = "";
};
</script>

<style scoped>
.dropdown-container {
  display: flex;
  justify-content: center;
  direction: rtl;
  margin: 40px auto;
  width: 100%;
  position: relative;
  margin-bottom: 200px;
}
.dropdown-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  cursor: pointer;
  border: 2px solid rgb(172, 172, 172);
  border-radius: 10px;
  padding: 10px;
}
.dropdown-menu {
  width: 100%;
  height: auto;
  margin-top: 70px;
  position: absolute;
  border: 2px solid rgb(90, 158, 161);
  border-radius: 10px;
  cursor: pointer;
  padding: 10px;
}
.dropdown-item {
  padding: 8px 12px;
}
.dropdown-item:hover {
  background-color: rgb(229, 247, 249);
  border-radius: 10px;
}
.select-icon span {
  cursor: pointer;
  font-size: 24px;
  color: rgb(172, 172, 172);
}

.placeholder {
  color: rgb(172, 172, 172);
}

.selected {
  color: #000;
}
</style>
