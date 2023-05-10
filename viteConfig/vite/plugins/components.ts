/**
 * @name AutoRegistryComponents
 * @description  自动引入ui组件和自己分装的组件
 */
import Components from "unplugin-vue-components/vite"; //自动导入组件
import {
  ElementPlusResolver, // ElementPlus
  VueUseComponentsResolver, //VueUse
} from "unplugin-vue-components/resolvers";

const AutoRegistryComponents = () => {
  return Components({
    dirs: ["src/components"],
    dts: "types/components.d.ts",
    extensions: ["vue"],
    resolvers: [
      ElementPlusResolver(),
      VueUseComponentsResolver(),
    ],
  });
};

export default AutoRegistryComponents;
