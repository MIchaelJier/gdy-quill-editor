# yuneditor
包括gdy-quill-editor 和它的🌰

## [ gdy-quill-editor ]
基于Quill的vue编辑器组件 npm@0.0.15
``` javascript
"quill": "2.0.0-dev.3"
// 文档： https://quilljs.com/
// 中文文档： http://doc.quilljs.cn/
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
``` javascript
npm install gdy-quill-editor  
// or
yarn add gdy-quill-editor 
```
``` javascript
// VUE Global registration
import Vue from 'vue'
import gdyEditor from 'gdy-quill-editor'
// Alt.: import { Quill, yunEditor, install, Dplayer } from 'gdy-quill-editor'
import 'gdy-quill-editor/dist/main.css'
Vue.use(gdyEditor)
```

### Options & Events
* 目录
``` javascript
@props
  isShowTips //是否显示title tips（鼠标悬浮弹出的提示框）
  isShowCode //是否显示html代码区（出现在编辑区下方）
  disabled //编辑器是否能编辑
  options // quill设置（参考quill文档 https://quilljs.com/docs/configuration/#options）
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
* globalOptions
``` javascript
// 1. 使用已定义的toolbar
import { fontType, fontColor, other, alltype } from 'gdy-quill-editor/lib/config/toolbar'
import { handlers } from 'gdy-quill-editor/lib/config/handlers'
toolbarOptions = {
  container: alltype,
  handlers,
}
// 2. 你也可以自定义你的toolbar
// 比如：<div id="toolbar">
toolbarOptions = {
  container: '#toolbar',
  handlers,
}
```
```json
// 你可以挑选 
const titleConfig = {
  'ql-bold': '加粗',
  'ql-color': '颜色',
  'ql-font': '字体',
  'ql-code': '插入代码',
  'ql-italic': '斜体',
  'ql-link': '添加链接',
  'ql-background': '背景颜色',
  'ql-size': '字体大小',
  'ql-strike': '删除线',
  'ql-script': '上标/下标',
  'ql-underline': '下划线',
  'ql-blockquote': '引用',
  'ql-header': '标题',
  'ql-indent': '缩进',
  'ql-list': '列表',
  'ql-align': '文本对齐',
  'ql-direction': '文本方向',
  'ql-code-block': '代码块',
  'ql-formula': '公式',
  'ql-image': '图片',
  'ql-video': '视频',
  'ql-clean': '清除字体样式',
  'ql-grammarly-inline': '插入分割线',
  'ql-shortcode': '自定义命令',
  'ql-table': '表格',
  'ql-table-insert-row': '增加行',
  'ql-table-insert-column': '增加列',
  'ql-table-delete-row': '删除行',
  'ql-table-delete-column': '删除列',
  'ql-lineHeight': '行高',
  'ql-history-back': '返回',
  'ql-history-redo': '撤销返回',
  'ql-emoji': '表情',
  'ql-dangerously-paste': '完全复制',
}
```
* video
  video在编辑视频并不会播放，会以封面图的图片展示  
  你需要在预览中初始化视频的播放：
```javascript
// 使用Dplayer初始化
import { Dplayer } from 'gdy-quill-editor'
// 参考 packages/editor-demo/src/components/EditorDemo/index 273-300
const op = HTMLDecode(options[1])
op.container = document.querySelectorAll('#' + op.container)[1]
const myvideo = new Dplayer(op)
myvideo.play()
```
* 其他
  initEditor中自定义图标和方法
```javascript
// 1. 现在toolbarOptions中的handlers添加一个自己的方法
handlers['xxx'] = function() {}
// 2. 操作dom给它添加图标和title tip
document.getElementsByClassName(className)[0].innerHTML = `图标`
document.querySelector('.ql-toolbar').querySelector('.ql-xxx').dataset.title = 'xxx'
// 3. 给它定义触发事件
quill.getModule('toolbar').addHandler('xxx', () => {})
// or.你也可以在handlers添加方法 handlers.xxx = function(){}，但要注意作用域

// 上传并添加后的图片地址
// 参考 packages/editor-demo/src/components/EditorDemo/index 194-250
```