import randomString from "@/utils/randomString";
const TMap = (window as any).TMap;

class Polyline {
  polyline: any;
  map: any;
  geometries: any;
  editor: any; //编辑模式
  defaultPolyline: any; //默认polyline.geometries

  constructor(map: any, polylines: any) {
    this.map = map;
    this.geometries = [];
    if (polylines.length != 0) this.initPolylineData(polylines);
  }
  //初始化polyline
  initPolylineData(polylines) {
    this.polyline = new TMap.MultiPolyline({
      id: "polyline-layer",
      map: this.map,
    });
    this.movePolyline();
    // 判断是否配置了默认polylines
    if (polylines) {
      for (const i in polylines) {
        this.update(polylines[i]);
      }
    }
    this.geometries = this.polyline.geometries;
  }
  // 添加polyline
  add() {
    const i = "polyline_" + randomString();
    this.defaultPolyline = {
      name: i,
      id: i,
      styleId: i,
    };
    // // 判断是否初始化了polyline
    if (!this.polyline) {
      this.initPolylineData(null);
    } else {
      this.editor.setActionMode(2); // 切换绘画模式
    }
  }
  // 修改polyline
  update(val) {
    const defaultStyles = this.polyline.styles.default;
    this.editor && this.closeEdit(); //退出编辑模式
    // 修改polyline样式
    this.setStyle(val, defaultStyles);
    // 修改定位跟polyline名
    this.polyline.updateGeometries([
      {
        ...val,
        paths: this.pathsFormat(val.paths),
        position: val.paths[0],
      },
    ]);
    return this.polyline.geometries;
  }
  // 修改样式
  setStyle(val, defaultStyles) {
    const arrowOptions = {
      width: parseInt(val.arrowW) || 6,
      height: parseInt(val.arrowH) || 4,
      space: parseInt(val.arrowS) || 50,
    };
    const style = new TMap.PolylineStyle({
      color: val.color || defaultStyles.color, //线填充色
      width: parseInt(val.width) || defaultStyles.width, //折线宽度
      borderColor: val.borderColor || defaultStyles.borderColor, //边线颜色
      borderWidth: parseInt(val.borderWidth) || defaultStyles.borderWidth, //边线宽度
      lineCap: val.lineCap || defaultStyles.lineCap, //线端头方式，可选为butt，round，square，默认为butt。
      dashArray: [val.dashArray, val.dashArray] || defaultStyles.dashArray, //虚线展示方式，[0, 0]为实线，[10, 10]表示十个像素的实线和十个像素的空白（如此反复）组成的虚线，默认为[0, 0];
      showArrow: val.showArrow || defaultStyles.showArrow, //	是否沿线路方向显示箭头，默认为false
      arrowOptions: arrowOptions || defaultStyles.arrowInfo, //箭头显示配置，仅在showArrow为true时有效。数据格式[6,0,50,0]
      enableBloom: val.enableBloom || defaultStyles.enableBloom, //	是否对折线启用泛光效果
    });
    this.polyline.styles[val.styleId] = style;
  }
  //polyline图形编辑器。<不需要修改>
  movePolyline() {
    this.editor = new TMap.tools.GeometryEditor({
      map: this.map, // 编辑器绑定的地图对象
      overlayList: [
        {
          id: "polyline",
          overlay: this.polyline, // 可编辑图层
        },
      ],
      actionMode: TMap.tools.constants.EDITOR_ACTION.DRAW, // 编辑器的工作模式
      snappable: true, // 开启吸附
    });
    this.editOver();
  }
  // 删除polyline
  remove(id) {
    if (id) {
      this.editor.removeOverlay(id);
      this.polyline.remove([id]);
      this.geometries = this.polyline.geometries;
    }
    return this.geometries;
  }
  // 清除polyline
  reset() {
    this.polyline && this.polyline.setMap(null);
    this.polyline = null;
    this.geometries = [];
    return this.geometries;
  }
  // polyline绘画结束后停止绘画
  editOver() {
    this.editor.on("draw_complete", (geometry) => {
      this.remove(geometry.id); //添加的时候会出现一个默认的折线，暂未找到处理方法，先删除这天再添加我定义的折线。
      this.geometries = this.update({
        ...this.defaultPolyline,
        paths: geometry.paths,
      });
      this.closeEdit();
    });
  }
  // 将更新传过来的paths转成LatLng对象
  pathsFormat(paths) {
    const newPaths: any = [];
    paths.forEach((e: any) => {
      newPaths.push(new TMap.LatLng(e.lat, e.lng));
    });
    return newPaths;
  }
  // 关闭绘画模式
  closeEdit() {
    this.editor.setActionMode(1);
    this.editor.stop();
  }
}

export default Polyline;
