export interface IAccount {
  IDIP: number;
  account: string;
  password: string;
}

export interface IMapDataInit {
  IDIP: number;
  id: string | number;
}

export interface IMapDataSave {
  IDIP: number;
  id: string | number;
  [x: string]: any;
}

export interface IUploadImg {
  file: any;
}

export interface IDataType {
  // data: T;
  [x: string]: string;
}
