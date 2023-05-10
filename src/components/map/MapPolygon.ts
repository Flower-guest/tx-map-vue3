import randomString from "@/utils/randomString";
const TMap = (window as any).TMap;

class Polygon {
  polygon: any;
  map: any;
  geometries: any;
  editor: any; //编辑模式
  defaultPolygon: any; //默认polygon.geometries

  constructor(map: any, polygons: any) {
    this.map = map;
    this.geometries = [];
    if (polygons) this.initPolygonData(polygons);
  }
  //初始化polygon
  initPolygonData(polygons) {
    this.polygon = new TMap.MultiPolygon({
      id: "polygon-layer",
      map: this.map,
    });
    this.movePolygon();
    // 判断是否配置了默认polygons
    if (polygons) {
      for (const i in polygons) {
        this.update(polygons[i]);
      }
    }
    this.geometries = this.polygon.geometries;
  }
  // 添加polygon
  add() {
    const i = "polygon_" + randomString();
    this.defaultPolygon = {
      name: i,
      id: i,
      styleId: i,
    };
    // // 判断是否初始化了polygon
    if (!this.polygon) {
      this.initPolygonData(null);
    } else {
      this.editor.setActionMode(2); // 切换绘画模式
    }
  }
  // 修改polygon
  update(val) {
    const defaultStyles = this.polygon.styles.default;
    this.editor && this.closeEdit(); //退出编辑模式
    // 修改polygon样式
    this.setStyle(val, defaultStyles);
    // 修改polygon
    this.polygon.updateGeometries([
      {
        ...val,
        paths: this.pathsFormat(val.paths),
        position: val.paths[0],
      },
    ]);
    return this.polygon.geometries;
  }
  // 修改样式
  setStyle(val, defaultStyles) {
    const showBorder = val.showBorder == 1 ? true : false;
    const borderDashArray = val.borderDashArray
      ? [parseInt(val.borderDashArray), parseInt(val.borderDashArray)]
      : "";
    const style = new TMap.PolygonStyle({
      color: val.color || defaultStyles.color, //面填充色
      showBorder: showBorder || defaultStyles.borderColor, //是否显示边线，默认为false
      borderColor: val.borderColor || defaultStyles.borderColor, //边线颜色
      borderWidth: parseInt(val.borderWidth) || defaultStyles.borderWidth, //边线宽度
      borderDashArray: borderDashArray || defaultStyles.borderDashArray, //边线虚线虚线展示方式，[0, 0]为实线，[10, 10]表示十个像素的实线和十个像素的空白（如此反复）组成的虚线;
    });
    this.polygon.styles[val.styleId] = style;
  }
  //polygon图形编辑器。<不需要修改>
  movePolygon() {
    this.editor = new TMap.tools.GeometryEditor({
      map: this.map, // 编辑器绑定的地图对象
      overlayList: [
        {
          id: "polygon",
          overlay: this.polygon, // 可编辑图层
        },
      ],
      actionMode: TMap.tools.constants.EDITOR_ACTION.DRAW, // 编辑器的工作模式
      snappable: true, // 开启吸附
    });
    this.editOver();
  }
  // 删除polygon
  remove(id) {
    if (id) {
      this.editor.removeOverlay(id);
      this.polygon.remove([id]);
      this.geometries = this.polygon.geometries;
    }
    return this.geometries;
  }
  // 清除polygon
  reset() {
    this.polygon && this.polygon.setMap(null);
    this.polygon = null;
    this.geometries = [];
    return this.geometries;
  }
  // polygon绘画结束后停止绘画
  editOver() {
    this.editor.on("draw_complete", (geometry) => {
      this.remove(geometry.id); //添加的时候会出现一个默认的折线，暂未找到处理方法，先删除这天再添加我定义的折线。
      this.geometries = this.update({
        ...this.defaultPolygon,
        paths: geometry.paths,
      });
      this.closeEdit();
    });
  }
  // 关闭绘画模式
  closeEdit() {
    this.editor.setActionMode(1);
    this.editor.stop();
  }
  // 将更新传过来的paths转成LatLng对象
  pathsFormat(paths) {
    const newPaths: any = [];
    paths.forEach((e: any) => {
      newPaths.push(new TMap.LatLng(e.lat, e.lng));
    });
    return newPaths;
  }
}

export default Polygon;
