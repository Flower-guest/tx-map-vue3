<template>
  <div>
    <Tooltip :visible="visible" @update:visible="(newValue) => (visible = newValue)" />
    <!-- 标题 -->
    <div class="map_form absolute top-50px right-100px z-2000 bg-white rounded-6px text-14px w-440px" v-show="isShowForm">
      <div class="text-center pt-10px text-16px">{{ setae.formEls.title }}</div>
      <div class="py-8px px-15px">
        <!-- 操作部分 -->
        <div class="content">
          <template v-for="item in setae.formEls.formList" :key="item.type">
            <div class="mb-5px text-16px">{{ item.listName }}</div>
            <el-form :model="setae.form" label-width="100px" label-position="left">
              <template v-for="formItem in item.formItem" :key="formItem.label">
                <!-- 一行两个输入框 -->
                <div v-if="formItem.isHalf">
                  <el-row :gutter="20">
                    <template v-for="halfItem in formItem.halfItem" :key="halfItem.label">
                      <el-col :span="12">
                        <JsonForm :form="setae.form" :item="halfItem" :selectOpt="setae.selectOpt">
                          <template #selectBtn>
                            <el-button type="info" :icon="Edit" @click="footerClick('edit')">
                              编辑
                            </el-button>
                          </template>
                        </JsonForm>
                      </el-col>
                    </template>
                  </el-row>
                </div>
                <template v-else>
                  <JsonForm :form="setae.form" :item="formItem" :selectOpt="setae.selectOpt">
                    <template #selectBtn>
                      <el-button type="info" :icon="Edit" @click="footerClick('edit')">
                        编辑
                      </el-button>
                    </template>
                  </JsonForm>
                </template>
              </template>
            </el-form>
          </template>
        </div>
        <!-- 按钮部分 -->
        <div class="flex justify-end mt-10px">
          <template v-for="item in setae.btnFormArr" :key="item.type">
            <el-button :type="item.type" @click="footerClick(item.icon)">
              {{ item.text }}
            </el-button>
          </template>
        </div>
      </div>
    </div>
    <MarkerEdit ref="markerEdit" @save-edit="saveEdit" />
  </div>
</template>

<script lang="ts" setup>
import { Edit } from '@element-plus/icons-vue'
import { formEl, formFooterBtn, selectOpt } from "../config/btnForm";
import MarkerEdit from "./markerEdit.vue";

defineProps({
  isShowForm: Boolean,
});
// tooltip
const visible = ref(false);
// 通过ref获取元素对象
const markerEdit = ref<InstanceType<typeof MarkerEdit> | any>(null);
// 参数
const setae = reactive<any>({
  formEls: {},
  form: {},
  btnFormArr: {},
  selectOpt: [],
})
// 初始化表单与表单数据
const initForm = (val, btnType) => {
  setae.formEls = formEl[btnType]; //初始化表单DOM渲染
  setae.btnFormArr = formFooterBtn[btnType]; //初始化表单底部按钮
  setae.form = JSON.parse(JSON.stringify(val?.[0] ?? val)); //初始化表单字段内容
  initOption(btnType);
};
// 加载当前下拉框的值
const initOption = (btnType) => {
  if (btnType == 'marker') {
    setae.selectOpt['sort'] = selectOpt[btnType]['sort'];
    setae.selectOpt['markerType'] = selectOpt[btnType]['markerType'];
  } else if (btnType == 'polyline') {
    setae.selectOpt['lineCap'] = selectOpt[btnType]['lineCap'];
  }
  return;
}

const emit = defineEmits(['delete', 'cancel', 'save', 'rank']);
// 按钮出发事件
const footerClick = (type) => {
  switch (type) {
    case "delete": emit('delete', setae.formEls.type); break; //删除按钮
    case "cancel": emit('cancel', 'cancelForm'); break; //取消按钮
    case "rank": visible.value = !visible.value; emit('rank', setae.form, setae.formEls.type); break; //label移动事件
    case "edit": markerEdit.value.openDiaglog(setae.form.edit); break; //marker编辑事件
    default: emit('save', setae.form, setae.formEls.type); //保存按钮
  }
};
// 编辑表单保存事件
const saveEdit = (val) => {
  setae.form = { ...setae.form, edit: val }
  console.log(setae.form)
}

defineExpose({ initForm });
</script>

<style lang="scss" scoped>
.footer .el-button {
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 700;
}
</style>
