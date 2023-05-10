import Marker from "./MapMarker";
import Label from "./MapLabel";
import DOMOverlay from "./MapDOMOverlay";
import Polyline from "./MapPolyline";
import Polygon from "./MapPolygon";

export default function createMapPlugins(map, mapDataInit) {
  const mapPlugins: any = {};
  const marker = new Marker(map, mapDataInit?.markers ?? "");
  const label = new Label(map, mapDataInit?.labels ?? "");
  const overlay = new DOMOverlay(map, mapDataInit?.doms ?? "");
  const polyline = new Polyline(map, mapDataInit?.polylines ?? "");
  const polygon = new Polygon(map, mapDataInit?.polygons ?? "");
  mapPlugins["marker"] = marker;
  mapPlugins["label"] = label;
  mapPlugins["DOMOverlay"] = overlay;
  mapPlugins["polyline"] = polyline;
  mapPlugins["polygon"] = polygon;
  return mapPlugins;
}
