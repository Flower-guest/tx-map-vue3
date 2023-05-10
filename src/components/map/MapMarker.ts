import randomString from "@/utils/randomString";
const TMap = (window as any).TMap;

class Marker {
  marker: any;
  map: any;
  position: any; //地图中心点
  geometries: any;
  editor: any; //编辑模式
  defaultMarker: any; //默认marker.geometries
  moveOverPosition: any; //指定marker移动后的属性

  constructor(map: any, markers: any) {
    this.map = map;
    this.geometries = [];
    if (markers) this.initMarkerData(markers);
  }
  //初始化marker
  initMarkerData(markers) {
    this.marker = new TMap.MultiMarker({
      id: "marker-layer",
      map: this.map,
      styles: {
        highlight: new TMap.MarkerStyle({
          src: "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/marker-pink.png",
        }),
      },
    });
    // 判断是否配置了默认markers
    if (markers) {
      for (const i in markers) {
        this.update(markers[i]);
      }
    } else {
      this.update(this.defaultMarker);
    }
    this.moveMarker();
    this.geometries = this.marker.geometries;
  }
  // 添加marker
  add() {
    this.position = this.getCenter();
    const i = "marker_" + randomString();
    this.defaultMarker = {
      name: i,
      id: i,
      styleId: i,
      position: this.position,
    };
    // 获取地图中心位置
    // 判断是否初始化了marker
    if (!this.marker) {
      this.initMarkerData(null);
    } else {
      this.update(this.defaultMarker);
    }
    // 当有个marker被点击后出现新增时被点击的marker被删除，所以将数组合并去重一下避免被删
    this.arrMerge();
  }
  // 修改marker
  update(val) {
    const defaultStyles = this.marker.styles.default;
    this.stopEdit(val.id);
    // 修改marker样式
    this.setStyle(val, defaultStyles);
    // 修改定位跟marker名
    this.marker.updateGeometries([
      {
        ...val,
        position: new TMap.LatLng(val.position.lat, val.position.lng),
        properties: { title: val.name },
      },
    ]);
    return this.marker.geometries;
  }
  setStyle(val, defaultStyles) {
    const style = new TMap.MarkerStyle({
      width: parseInt(val.width) || defaultStyles.width,
      height: parseInt(val.height) || defaultStyles.height,
      anchor: {
        x: parseInt(val.anchor_x) || defaultStyles.anchor.x,
        y: parseInt(val.anchor_y) || defaultStyles.anchor.y,
      },
      src: val.src || defaultStyles.src,
    });
    this.marker.styles[val.styleId] = style;
  }
  //移动marker<不需要修改>
  moveMarker() {
    this.editor = new TMap.tools.GeometryEditor({
      map: this.map, // 编辑器绑定的地图对象
      overlayList: [
        {
          overlay: this.marker, // 可编辑图层
          selectedStyleId: "highlight", // 被选中的marker会变为高亮样式
        },
      ],
      actionMode: TMap.tools.constants.EDITOR_ACTION.INTERACT, // 编辑器的工作模式
      selectable: true,
    });
    this.editOver();
  }
  // 删除marker
  remove(id) {
    if (id) {
      this.stopEdit(id);
      this.marker.remove([id]);
      this.geometries = this.marker.geometries;
    }
    return this.geometries;
  }
  // 获取地图中心位置
  getCenter() {
    return new TMap.LatLng(
      this.map.getCenter().getLat(),
      this.map.getCenter().getLng()
    );
  }
  // 数组对象去重合并
  arrMerge() {
    const Arr = [...this.marker.geometries, ...this.geometries];
    const obj = {};
    const arrays = Arr.reduce((setArr, item) => {
      obj[item.id] ? "" : (obj[item.id] = true && setArr.push(item));
      return setArr;
    }, []);
    this.geometries = arrays;
  }
  // 清除marker
  reset() {
    this.marker && this.marker.setMap(null);
    this.marker = null;
    this.geometries = [];
    return this.geometries;
  }
  // marker移动后获取定位
  editOver() {
    this.editor.on("adjust_complete", (geometry) => {
      this.moveOverPosition = geometry.position;
    });
  }
  //退出编辑模式
  stopEdit(id) {
    this.editor && this.editor.removeOverlay(id);
    this.editor && this.editor.stop();
  }
}

export default Marker;
