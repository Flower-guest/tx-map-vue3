import { createPinia } from "pinia";
// pinia持久化
import { createPersistedState } from "pinia-plugin-persistedstate";

const pinia = createPinia();

pinia.use(createPersistedState());

export default pinia;
