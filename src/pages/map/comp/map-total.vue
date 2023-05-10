<template>
  <div class="total bg-white rounded-6px text-14px w-240px" v-show="showTotal">
    <!-- 标题 -->
    <div class="flex justify-end pt-5px pb-5px mr-5px" @click="close">
      <span class="font-bold mr-85px">{{ totalTitle }}</span>
      <el-icon>
        <Close />
      </el-icon>
    </div>
    <div class="py-8px px-15px">
      <template v-for="item in totalObj" :key="item.id">
        <el-row class="mb-4px" :gutter="20">
          <el-col :span="12">{{ item.name }}</el-col>
          <el-col :span="4" class="text-center">
            <div @click="aim(item)">
              <el-icon>
                <Aim />
              </el-icon>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="flex items-center cursor-pointer" @click="edit(item)"> <el-icon>
                <Edit />
              </el-icon>
              <span class="text-12px">编辑</span>
            </div>
          </el-col>
        </el-row>
      </template>
    </div>
    <div class="flex justify-end mt-5px mb-10px mr-10px">
      <el-button type="success" :icon="Plus" @click="add">
        添加
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { btnArr } from "../config/btnForm"
import { Edit, Plus } from '@element-plus/icons-vue'
const props = defineProps({
  showTotal: Boolean,
  totalObj: Object,
  title: String
})

const totalTitle =  computed(() => {
  return btnArr.filter(item => item.btnType == props.title ).map(x => x.title)[0];
})

const emit = defineEmits(['close', 'add', 'aim', 'edit']);
// 关闭
const close = () => {
  emit("close", "closeTotal")
}
// 添加按钮
const add = () => {
  emit("add")
}
// 定位按钮
const aim = (item) => {
  emit("aim", item.position)
}
// 编辑按钮 => 打开map-form页面
const edit = (item) => {
  emit("edit", item, props.title)
}
</script>

<style lang="scss" scoped></style>
