<p align="center">
    <img src="https://img.shields.io/badge/-Vue3-34495e?logo=vue.j" />
    <img src="https://img.shields.io/badge/-Vite4.3-646cff?logo=vite&logoColor=white" />
    <img src="https://img.shields.io/badge/-TypeScript-blue?logo=typescript&logoColor=white" />
    <img src="https://img.shields.io/badge/-Pinia-yellow?logo=picpay&logoColor=white" />
    <img src="https://img.shields.io/badge/-ESLint-4b32c3?logo=eslint&logoColor=white" />
    <img src="https://img.shields.io/badge/-pnpm-F69220?logo=pnpm&logoColor=white" />
    <img src="https://img.shields.io/badge/-Axios-008fc7?logo=axios.js&logoColor=white" />
</p>

一个开箱即用，基于腾讯地图开发的地图工具。


## 代码规范

- 结合 VsCode 编辑器（保存时自动执行格式化：editor.formatOnSave: true）
- 配合 commitizen，使代码提交更加规范。
- ESLint 配置（`.eslintrc.js` ）详细请看对应的配置文件。

## 目录结构

以下是系统的目录结构

```
├── src
│    ├── assets          // 静态文件
│    ├── components      // 业务通用组件
│    ├── hooks           // hooks
│    ├── pages           // 业务页面
│    ├── plugins         // ui组件等插件配置
│    ├── router          // 路由文件
│    ├── service         // api请求
│    ├── store           // 状态管理
│    ├── utils           // 工具类
│    ├── App.vue
│    ├── main.ts
├── viteConfig           // vite配置文件
├── tsconfig.json        // ts配置
└── vite.config.ts       // vite全局配置
```


# 具体功能
 * 添加marker点位
 * 添加文本（label）
 * 遮盖物
 * 画线、画多边形


```shell
# 拉取仓库代码
git clone git@github.com:Flower-guest/tx-map-vue3.git

# 进入项目文件夹
cd tx-map-vue3

# 安装项目依赖
pnpm install

# 运行
pnpm run dev
```
