import xjRequest from "..";
import { IAccount, IMapDataInit, IDataType, IMapDataSave } from "./types";
// 登录获取token
export const accountLoginRequest = (data: IAccount) => {
  return xjRequest.post<IDataType>({
    data,
  });
};
// 拉去指定地图数据
export const requestMapDataInit = (data: IMapDataInit) => {
  return xjRequest.get<IDataType>({
    url: `?IDIP=${data.IDIP}&id=${data.id}`,
  });
};
// 保存标记后的地图
export const requestMapDataSave = (data: IMapDataSave) => {
  return xjRequest.post<IDataType>({
    data,
  });
};

export const requestUploadImg = (data) => {
  return xjRequest.post<IDataType>({
    data,
  });
};
