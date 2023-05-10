<template>
  <div class="w-full h-full">

    <!-- 功能按钮 -->
    <MapBtn class="map_btn absolute top-50px left-50px z-2000" ref="mapBtn" @handle-btn-click="handleBtnClick"
      @layers-click="handleLayersClick" />
    <!-- 功能按钮对应的数据列表表单 -->
    <MapTotal class="map_total absolute top-50px left-200px z-2000 max-h-300px overflow-y-auto" @close="handleBtnClick"
      @add="handleAddTotalClick" @aim="handleAimTotalClick" @edit="handleLayersClick" :show-total="state.isShowTotal"
      :total-obj="state.totalObj" :title="state.btnType" />
    <!-- 详情数据表单 -->
    <MapForm ref="mapForm" @delete="handleDeleteFormClick" @cancel="handleLayersClick" @save="handleSaveFormClick"
      @rank="layersMove" :isShowForm="state.isShowForm" />
    <!-- 地图 -->
    <div class="w-full h-full" id="container"></div>
    <div class="save_reset absolute bottom-50px right-100px z-2000">
      <el-button type="primary" @click="savePage">保存</el-button>
      <el-button type="primary" @click="resetPage">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import MapBtn from './comp/map-btn.vue';
import MapForm from './comp/map-form.vue';
import MapTotal from './comp/map-total.vue';
import { indexState, UrlParams } from "./config/types"
import { requestMapDataInit, requestMapDataSave } from "@/service/map";
import localCache from "@/utils/Cache";
import { ElMessage, ElMessageBox } from 'element-plus';

const TMap = (window as any).TMap;

const mapBtn = ref<InstanceType<typeof MapBtn> | any>(''); //ref获取MapBtn组件
const mapForm = ref<InstanceType<typeof MapForm> | any>(''); //ref获取MapForm组件

const state = reactive<indexState>({
  isShowTotal: false, //是否显示marker数量表单
  totalObj: [], //对应事件对象总览
  formObj: null, //form现在展示的对象数据
  isShowForm: false, //是否显示marker数据表单
  mapDataInit: "", //地图数据初始化
  isSavePage: false, //是否提交表单
  btnType: '', //按钮点击类型 例：marker、label等
  moveTypes: '', //图层移动的类型例：label| DOMOverlay等
})

const getUrlParams = () => {
  const params: UrlParams = useUrlSearchParams('hash'); //vueUse API
  localCache.setCache("token", params?.token ?? '');
  return params;
}

let map;
let obj: UrlParams; //截取路径参数

// 初始化Map
const initMap = async () => {
  obj = getUrlParams();
  const { id } = obj;
  const params = { IDIP: 184, id };
  state.mapDataInit = await requestMapDataInit(params);
  map = new TMap.Map('container', {
    zoom: state.mapDataInit.zoom, // 设置地图缩放
    center: new TMap.LatLng(state.mapDataInit.lat, state.mapDataInit.lng),
    renderOptions: {
      enableBloom: true, // 折线是否启用泛光效果 注：为true才会有效果
    },
  });
  // 生成个性化地图
  TMap.ImageTileLayer.createCustomLayer({
    layerId: state.mapDataInit.layer_id,
    map: map
  }).then(customLayer => {
    if (customLayer) {
      // 成功创建个性化图层
      console.log('成功创建个性化图层');
    } else {
      // 创建失败，请查看控制台错误信息
      console.log('创建个性化图层失败');
    }
  });
  // 初始化marker|label
  mapBtn.value?.init(map, state.mapDataInit)
}
// 添加按钮组件某个按钮点击事件
const handleBtnClick = (val: any, btnType: string) => {
  state.btnType = btnType;
  if (val == 'closeTotal') {
    state.isShowTotal = false;
  } else if (btnType == "DOMOverlay" || btnType.indexOf('poly') != -1) {
    // 因为数据过去视图不更新，只能模拟关闭打开来使视图更新。先这样写着。找到替代方案在处理。
    state.totalObj = val;
    state.isShowTotal = false;
    setTimeout(() => {
      state.isShowTotal = true;
    }, 0);
  } else {
    if (val != 'closeTotal' && !state.isShowTotal) state.isShowTotal = true;
    state.totalObj = val;
  }
}
// 图层点击事件例如:marker|label|DOMOverlay
const handleLayersClick = (val: any, btnType: string) => {
  if (val == 'cancelForm') {
    state.isShowForm = false;
    btnType == 'marker' && mapBtn.value.stopEdit(localStorage.getItem('layerId')); // marker取消编辑后点击无效，需要退出编辑模式
  } else {
    if (!state.isShowForm) state.isShowForm = true;
    state.formObj = JSON.parse(JSON.stringify(val));
    mapForm.value.initForm(val, btnType);
  }
}
// Total添加按钮点击事件
const handleAddTotalClick = () => {
  mapBtn.value?.addClick(state.btnType);
}
// 图层元素定位
const handleAimTotalClick = (val: any) => {
  map.easeTo({ zoom: 18, center: new TMap.LatLng(val.lat, val.lng) }, { duration: 2000 });//平滑缩放,旋转到指定级别
}
// 图层元素删除
const handleDeleteFormClick = (btnType: string) => {
  const val = mapBtn.value?.layersRemove(true, btnType);
  state.totalObj = val;
  hideAll();
}
// 点击的图层表单保存
const handleSaveFormClick = (val: any, btnType: string) => {
  mapBtn.value?.layersUpdate(val, btnType);
  hideAll();
}
// 图层移动按钮
const layersMove = (formObj: any, moveType: string) => {
  state.formObj = formObj; //修改后的form表单数据
  state.moveTypes = moveType; //移动类型
  // 给地图添加点击事件
  map.on("click", layersMoveSave);
}
// 图层移动保存事件
const layersMoveSave = (evt: any) => {
  const newLabelData = { ...state.formObj, position: evt.latLng }
  handleSaveFormClick(newLabelData, state.moveTypes);
  map.off("click", layersMoveSave); //保存后将地图点击事件清除
}
// 页面保存
const savePage = () => {
  state.isSavePage = true;
  const params2 = {
    IDIP: 185,
    id: obj.id,
    markers: mapBtn.value.saveData('marker'),
    labels: mapBtn.value.saveData('label'),
    doms: mapBtn.value.saveData('DOMOverlay'),
    polylines: mapBtn.value.saveData('polyline'),
  };
  requestMapDataSave(params2).then((res) => {
    if (res) {
      ElMessage({
        showClose: true,
        message: '表单保存成功',
        type: 'success',
      })
    }
  });
}
// 页面重置
const resetPage = () => {
  ElMessageBox.confirm(`是否重置`, "Warning", {
    confirmButtonText: "是",
    cancelButtonText: "否",
    type: "warning",
  }).then(() => {
    mapBtn.value.setMap(); //清除地图
    hideAll();
  });
}
// 表单与tatol关闭
const hideAll = () => {
  state.isShowTotal = false;
  state.isShowForm = false;
}
// 监听页面关闭事件如果没保存页面就进行页面保存弹窗提示
const handleBeforeUnload = (e) => {
  if (!state.isSavePage) {
    e = e || window.event
    if (e) {
      e.returnValue = '关闭提示'
    }
    return '关闭提示'
  }
}

onMounted(async () => {
  await initMap();
  window.addEventListener('beforeunload', handleBeforeUnload);
})
</script>

<style lang="scss" scoped></style>
