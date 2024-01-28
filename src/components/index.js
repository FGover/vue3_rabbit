// 把components中的组件以插件的方式进行全局化注册

import ImageView from './ImageView/index.vue'
import SKu from './XtxSKu/index.vue'
 
export const componentPlugin = {
  install(app) {
    app.component('XtxImageView', ImageView)
    app.component('XtxSKu', SKu)
  }
}