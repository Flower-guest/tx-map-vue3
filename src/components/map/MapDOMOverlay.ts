import randomString from "@/utils/randomString";
const TMap = (window as any).TMap;

class CustomOverlay extends TMap.DOMOverlay {
  mayDom: HTMLImageElement | null;
  position: any;
  src: string;
  width: number;
  height: number;
  id: string;
  name: string;

  constructor(options: any) {
    super(options);
    this.mayDom = null;
    this.position = options.position;
    this.src = options.src;
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.id = options.id;
    this.name = options.name;
  }
  onInit(options: any) {
    this.position = options.position;
    this.src = options.src;
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.id = options.id;
    this.name = options.name;
    console.log(this.position);
  }
  createDOM(): HTMLElement {
    this.mayDom = document.createElement("img");
    this.mayDom.style.cssText = `z-index:-1;width:${this.width}px;height:${this.height}px;position:absolute`;
    this.mayDom.src = this.src;
    this.onClick = () => {
      // DOMOverlay继承自EventEmitter，可以使用emit触发事件
      this.emit("click");
    };
    this.mayDom.addEventListener("click", this.onClick);
    return this.mayDom;
  }
  updateDOM() {
    if (!this.map) {
      return;
    }
    const pixel = this.map.projectToContainer(this.position);
    const width = this.dom.clientWidth / 2;
    const left = `${pixel.getX() - width}px`;
    const top = `${pixel.getY() - this.dom.clientHeight}px`;
    this.dom.style.transform = `translate(${left}, ${top})`;
  }
}

class DOMOverlay {
  geometries: any; //主要的精减数据
  map: any;
  DOMOverlay: any; //自定义覆盖物对象
  constructor(map: any, DOMoverlays: any) {
    this.geometries = [];
    this.DOMOverlay = [];
    this.map = map;
    if (DOMoverlays.length != 0) this.initDOMoverlays(DOMoverlays);
  }
  // 在后台获取到覆盖物数据初始化
  initDOMoverlays(DOMoverlays) {
    if (DOMoverlays) {
      for (const i in DOMoverlays) {
        this.add(DOMoverlays[i]);
      }
    }
  }
  // 添加
  add(val: any = "") {
    const i = "overlay_" + randomString();
    const position =
      (val && new TMap.LatLng(val.position.lat, val.position.lng)) || "";
    const defaultDOM = {
      src:
        val.src ||
        "https://mapapi.qq.com/web/visualization/demo-asset/flame.gif",
      position: position || this.getCenter(),
      id: val.id || i,
      width: val.width || 50,
      height: val.height || 50,
      name: val.name || i,
    };
    this.DOMOverlay.push(new CustomOverlay({ ...defaultDOM, map: this.map }));
    this.geometries.push(defaultDOM);
  }
  // 修改
  update(val) {
    this.removeFn(val.id);
    this.add(val);
    return this.geometries;
  }
  // 删除
  remove(id) {
    this.removeFn(id);
    return this.geometries;
  }
  // 清空
  reset() {
    this.DOMOverlay.forEach((overlay) => {
      overlay.setMap(null);
    });
    this.DOMOverlay = [];
    this.geometries = [];
    return this.geometries;
  }
  // 获取地图中心位置
  getCenter() {
    return new TMap.LatLng(
      this.map.getCenter().getLat(),
      this.map.getCenter().getLng()
    );
  }
  // 删除指定id遮盖物
  removeFn(id) {
    this.DOMOverlay.filter((item, i) => {
      if (item.id == id) {
        item.setMap();
        this.DOMOverlay.splice(i, 1);
        this.geometries.splice(i, 1);
      }
    });
  }
}

export default DOMOverlay;
