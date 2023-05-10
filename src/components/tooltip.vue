<template>
  <div>
    <el-tooltip :visible="visible" content="移动至此处" placement="bottom" effect="light" trigger="click" virtual-triggering
      :virtual-ref="triggerRef" @update:visible="updateVisible" />
  </div>
</template>

<script setup lang="ts">
import type { Measurable } from 'element-plus'
defineProps({
  visible: Boolean,
});

const emit = defineEmits(["update:visible"]);

const updateVisible = () => {
  emit('update:visible', false);
};


// elment tooltip需要参数与方法
const position = ref({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
});
const triggerRef = ref({
  getBoundingClientRect() {
    return position.value
  },
} as Measurable);

// tooltip事件
const mousemoveHandler = (e) => {
  position.value = DOMRect.fromRect({
    width: 0,
    height: 0,
    x: e.clientX,
    y: e.clientY,
  })
}
onMounted(() => {
  document.addEventListener('mousemove', mousemoveHandler);
})
onUnmounted(() => {
  document.removeEventListener('mousemove', mousemoveHandler)
})
</script>

<style scoped></style>
