<template>
  <div class="map_btn flex flex-col">
    <template v-for="item in btnArr" :key="item.btnType">
      <el-button type="primary" @click="handleBtnClick(item.btnType)">{{ item.btnText
      }}</el-button>
    </template>
  </div>
</template>

<script setup lang="ts">
import createMapPlugins from '@/components/map/index'
import { btnArr } from "../config/btnForm"
import throttle from "@/utils/throttle"
import { ElMessage, ElMessageBox } from 'element-plus';

let mapPlugins;
let geometries = reactive<any>({
  marker: [],
  label: [],
  DOMOverlay: [],
  polyline: [],
  polygon: [],
}); //数组对象
let id = ref<string>(); //marker|label|DOMOverlay当前点击图层元素的id
let type = ref<string>(''); //
const emit = defineEmits(["handleBtnClick", "layersClick"]);

// 地图初始化
const init = (map, mapDataInit) => {
  mapPlugins = createMapPlugins(map, mapDataInit);
  initData(mapPlugins)
  initClick(mapPlugins);
}
// 初始化地图需要使用的值
const initData = (mapPlugins) => {
  btnArr.forEach(item => {
    geometries[item.btnType] = mapPlugins[item.btnType].geometries;
  })
}
// 地图初始化时如果有对应的点击对象就添加点击事件
const initClick = (mapPlugins) => {
  btnArr.forEach(v => {
    if (v.btnType == "DOMOverlay") {
      mapPlugins[v.btnType][v.btnType] && addDOMOverlayClick(v.btnType);
    } else {
      mapPlugins[v.btnType][v.btnType] && mapPlugins[v.btnType][v.btnType].on("click", (evt) => layersClick(evt, v.btnType));
    }
  })
}
//添加事件
const addClick = throttle((btnType) => {
  if (btnType == 'DOMOverlay') {//DOMOverlay点击事件
    mapPlugins[btnType].add();
    geometries[btnType] = mapPlugins[btnType].geometries;
    addDOMOverlayClick(btnType);
  } else { //marker|label|polyline等点击事件
    // 避免新添加的按钮没有点击事件
    if (mapPlugins[btnType][btnType] != null) mapPlugins[btnType][btnType].off("click", (evt) => layersClick(evt, btnType));
    mapPlugins[btnType].add();
    mapPlugins[btnType][btnType].on("click", (evt) => layersClick(evt, btnType));
    if (btnType.indexOf('poly') != -1) {//如果是画线，需要监听绘制结束事件才去取值，否则取值永远慢一步
      drawEnd(btnType)
    } else {
      geometries[btnType] = mapPlugins[btnType].geometries;
    }
    mapPlugins[btnType][btnType].on("click", (evt) => layersClick(evt, btnType));
  }
  handleBtnClick(btnType); //将点击事件传给父组件
}, 500)
// 按钮点击事件
const handleBtnClick = (btnType) => {
  type.value = btnType;
  emit("handleBtnClick", geometries[btnType], btnType);
}
// label|marker|polyline|polyline图层点击事件
const layersClick = (evt, btnType) => {
  id.value = evt.geometry.id;
  const obj = geometries[btnType].filter(item => item.id == evt.geometry.id);
  emit("layersClick", obj, btnType);
}
// 删除指定图层元素
const layersRemove = (isShowBox = true, btnType) => {
  const obj = geometries[btnType].filter(item => item.id == id.value);
  if (isShowBox) {
    ElMessageBox.confirm(`是否删除${obj[0].name}`, "Warning", {
      confirmButtonText: "是",
      cancelButtonText: "否",
      type: "warning",
    }).then(() => {
      geometries[btnType] = mapPlugins[btnType].remove(id.value);
      ElMessage({
        type: "success",
        message: "删除成功",
      });
      id.value = "";
    });
  } else {
    mapPlugins[btnType].remove(id.value);
  }
}
// 保存修改
const layersUpdate = (val, btnType) => {
  let moveOverPosition = mapPlugins[btnType].moveOverPosition ? mapPlugins[btnType].moveOverPosition : val.position;
  let updateGeometries = { ...val, position: moveOverPosition };
  geometries[btnType] = mapPlugins[btnType].update(updateGeometries);
  // 当marker移动保存后清楚这个定位数据，避免下一个未移动的marker保存使用前一个移动的定位数据
  if (btnType == 'marker') mapPlugins[btnType].moveOverPosition = '';
  //自定义遮盖物更新之后点击事件没有了，再进行点击事件添加
  if (btnType == "DOMOverlay") addDOMOverlayClick(btnType);
}
// 清空地图
const setMap = () => {
  id.value && layersRemove(false, type.value); //marker|label点击之后清空之后被点击的标任在地图上 暂时未找到可替代方案 使用删除处理
  btnArr.forEach(v => {
    geometries[v.btnType] = mapPlugins[v.btnType].reset();
  })
}
// 保存地图所有数据
const saveData = (btnType) => {
  let obj = {}
  for (let i = 0; i < geometries[btnType].length; i++) {
    obj[geometries[btnType][i].id] = geometries[btnType][i]
  }
  return obj
}
// 自定义遮盖物点击事件
const addDOMOverlayClick = (btnType) => {
  mapPlugins[btnType][btnType].forEach((overlay) => {
    if (overlay._events?.click) {
      return;
    } else {
      overlay.on("click", () => {
        id.value = overlay.id;
        const obj = [{ //获取具体需要的字段，否则传参时会报错
          src: overlay.src,
          position: overlay.position,
          id: overlay.id,
          width: overlay.width,
          height: overlay.height,
          name: overlay.name,
        }]
        emit("layersClick", obj, btnType);
      });
    }
  });
}
// 折线|多边形等绘制结束事件监听
const drawEnd = (btnType) => {
  mapPlugins[btnType].editor.on("draw_complete", () => {
    geometries[btnType] = mapPlugins[btnType].geometries;
    handleBtnClick(btnType); //因为慢半拍只能去刷新页面强行更新数据，没想到更好的解决方法。
  });
}
defineExpose({ init, addClick, layersRemove, layersUpdate, setMap, saveData })
</script>

<style lang="scss" scoped>
.map_btn {
  .el-button+.el-button {
    margin-left: 0;
    margin-top: 10px;
  }
}
</style>
