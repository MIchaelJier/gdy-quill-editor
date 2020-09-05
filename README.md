# yuneditor

## gdy-quill-editor
基于Quill的vue编辑器组件 npm@0.0.14
``` javascript
"quill": "2.0.0-dev.3"
```

### Start
``` javascript
// yarn
lerna bootstrap
// if you want run demo
yarn servedemo
```

### Screenshot
![avatar](/screenshot/Snipaste_2020-08-02_13-21-52.png)  

### Download
```
npm install / yarn add gdy-quill-editor 
```
``` javascript
// VUE Global registration
import Vue from 'vue'
import gdyEditor from 'gdy-quill-editor'
import 'gdy-quill-editor/dist/main.css'
Vue.use(gdyEditor)
```

### Options & Events
``` javascript
@props
  isShowTips //是否显示tips
  isShowCode //是否显示html代码区
  disabled //编辑器是否能编辑
  options // quill设置
  globalOptions // 全局quill设置（优先级大于options，Obj二级直接覆盖）
  toolbarOptions // 菜单栏设置（优先级大于globalOptions）
@emit
  blur 
  focus
  input
  change
  ready
@inner methods
  addVideoLink // 添加一个自定义视频
  // {
  //   url,
  //   id,
  //   poster,
  //   height，
  //   width
  // } 
  addTextLink // 添加一个自定义超链接
  // {
  //  innerText,
  //  dataValue:,
  //  href,
  // }
```
