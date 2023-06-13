<template>
  <div>
    <el-form-item :label="item.label">
      <!-- 输入框 -->
      <template v-if="item.type == 'input'">
        <el-input v-model="form[item.field]" />
      </template>
      <!-- 下拉框+按钮 -->
      <template v-else-if="item.isSelectBtn">
        <el-select v-model="form[item.field]" class="s_o" placeholder="请选择">
          <el-option v-for="optI in selectOpt[item.field]" :key="optI.id" :label="optI.value" :value="optI.id" />
        </el-select>
        <slot name="selectBtn"></slot>
      </template>
      <!-- 下拉框 -->
      <template v-else-if="item.type == 'select'">
        <el-select v-model="form[item.field]" placeholder="请选择">
          <el-option v-for="optI in selectOpt[item.field]" :key="optI.id" :label="optI.value" :value="optI.id" />
        </el-select>
      </template>
      <!-- 上传 -->
      <template v-else-if="item.type == 'upload'">
        <el-upload
          accept="image/png, image/jpeg" :limit="1" ref="uploadRef" class="avatar-uploader"
          :on-change="handleChange" :http-request="uploadFile" :show-file-list="false">
          <template v-if="form[item.field]">
            <img :src="form[item.field]" class="w-80px" />
          </template>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </template>
      <!-- 单选框 -->
      <template v-else-if="item.type == 'radio'">
        <el-radio-group v-model="form[item.field]">
          <template v-for="radioItem in item.radio" :key="radioItem.value">
            <el-radio :label="radioItem.value" size="large">{{ radioItem.label }}</el-radio>
          </template>
        </el-radio-group>
      </template>
      <!-- 颜色选择器 -->
      <template v-else>
        <el-color-picker v-model="form[item.field]" show-alpha />
      </template>
    </el-form-item>
  </div>
</template>

<script setup lang="ts">
import { requestUploadImg } from "@/service/map";
import type { UploadProps, UploadInstance, UploadRequestOptions, UploadRequestHandler } from 'element-plus'
import { ElLoading } from "element-plus";

interface Props {
  form?: any,
  item?: any,
  selectOpt?: any,
}
const props = defineProps<Props>()
const form = toRef(props, 'form');
const item = toRef(props, 'item');

watch(
  () => props.form,
  () => { initRadioVal() }
)

const initRadioVal = () => {
  if (!form.value[item.value.field] && item.value.type == 'radio') form.value[item.value.field] = item.value.radio[0].value;
}
initRadioVal();

// 通过ref获取元素对象
const uploadRef = ref<UploadInstance | any>(null);

// 清空上传图片列表
const handleChange: UploadProps['onChange'] = () => {
  uploadRef.value.clearFiles()
}
// 文件上传
const uploadFile: UploadRequestHandler = async (options: UploadRequestOptions) => {
  const loading = ElLoading.service({
    lock: true,
    text: "正在加载中....",
    background: "rgba(0, 0, 0, 0.5)",
  });
  const formData = new FormData();
  formData.append('file', options.file);
  formData.append('IDIP', '186');
  try {
    const response = await requestUploadImg(formData);
    form.value[item.value.field] = response.fullurl;
    loading?.close();
  } catch (err) {
    console.log(err)
  }
}

</script>

<style lang="less" scoped>
.el-form-item {
  margin-bottom: 6px;
}

.el-select {
  width: 100%;
}

.el-radio.el-radio--large {
  height: 0;
}

.el-radio--large:nth-child(odd) {
  margin-right: 15px;
}

::v-deep .el-form-item__label {
  align-items: center !important;
  line-height: normal !important;
}

.s_o {
  width: 74% !important;
}
</style>
