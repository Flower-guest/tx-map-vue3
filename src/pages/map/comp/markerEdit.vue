<template>
  <div>
    <el-dialog
      v-model="dialogVisible" :close-on-click-modal="false" title="marker编辑" width="30%"
      :before-close="() => dialogVisible = false">
      <el-form :model="editForm" label-width="100px" label-position="left">
        <template v-for="item in editEL" :key="item.label">
          <JsonForm :form="editForm" :item="item" />
        </template>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveEdit">
            保存
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { markerEditEL } from "../config/formConfig"
const dialogVisible = ref(false);
const editForm = ref<any>({})
const editEL = ref(markerEditEL);
// 打开弹窗
const openDiaglog = (val) => {
  dialogVisible.value = true;
  editForm.value = val ? JSON.parse(JSON.stringify(val)) : {};
}
const emit = defineEmits(['saveEdit']);
// 保存表单
const saveEdit = () => {
  dialogVisible.value = false;
  emit('saveEdit', editForm.value);
}

defineExpose({ openDiaglog });
</script>
<style scoped>
.el-select {
  width: 100% !important;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
