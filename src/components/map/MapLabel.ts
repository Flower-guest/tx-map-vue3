import randomString from "@/utils/randomString";
const TMap = (window as any).TMap;

class Label {
  label: any;
  map: any;
  editor: any;
  geometries: any;
  defaultLabel: any; //默认label.geometries
  position: any; //地图中心点

  constructor(map: any, label: any) {
    this.label = null;
    this.map = map;
    this.geometries = [];
    if (label) this.initLabel(label);
  }
  //初始化label
  initLabel(label) {
    this.label = new TMap.MultiLabel({
      id: "label-layer",
      map: this.map,
    });
    // 判断是否配置了默认label
    if (label) {
      for (const i in label) {
        this.update(label[i]);
      }
    } else {
      this.update(this.defaultLabel);
    }
    this.geometries = this.label.geometries;
  }
  // 添加label
  add() {
    const i = "label_" + randomString();
    this.position = this.getCenter();
    this.defaultLabel = {
      name: i,
      id: i,
      styleId: i,
      position: this.position,
    };
    // 获取地图中心位置
    // 判断是否初始化了label
    if (!this.label) {
      this.initLabel(null);
    } else {
      this.update(this.defaultLabel);
    }
    // 当有个label被点击后出现新增时被点击的label被删除，所以将数组合并去重一下避免被删
    this.arrMerge();
  }
  // 修改Label
  update(val) {
    const defaultStyles = this.label.styles.default;
    // 修改label样式
    this.setStyle(val, defaultStyles);
    // 修改定位跟label名
    this.label.updateGeometries([
      {
        ...val,
        position: new TMap.LatLng(val.position.lat, val.position.lng),
        content: val.name,
        rank: parseInt(val.rank),
      },
    ]);
    return this.label.geometries;
  }
  // 设置样式
  setStyle(val, defaultStyles) {
    const style = new TMap.LabelStyle({
      color: val.color || defaultStyles.color,
      // borderWidth: parseInt(val.borderWidth) || defaultStyles.borderWidth,
      // borderColor: val.borderColor || defaultStyles.borderColor,
      // backgroundColor: val.backgroundColor || defaultStyles.backgroundColor,
      // borderRadius: parseInt(val.borderRadius) || defaultStyles.borderRadius,
      size: parseInt(val.size) || defaultStyles.size,
    });
    this.label.styles[val.styleId] = style;
  }
  // 删除label
  remove(id) {
    if (id) {
      this.label.remove([id]);
      this.geometries = this.label.geometries;
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
    const Arr = [...this.label.geometries, ...this.geometries];
    const obj = {};
    const arrays = Arr.reduce((setArr, item) => {
      obj[item.id] ? "" : (obj[item.id] = true && setArr.push(item));
      return setArr;
    }, []);
    this.geometries = arrays;
  }
  // 清除label
  reset() {
    if (this.label) this.label.setMap(null);
    this.label = null;
    this.geometries = [];
    return this.geometries;
  }
}

export default Label;
