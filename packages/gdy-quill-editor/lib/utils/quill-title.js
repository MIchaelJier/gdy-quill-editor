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
export const detaTitle = () => {
  const data_title = document
    .querySelector('.ql-toolbar')
    .querySelectorAll('[data-title]')
  for (let i = 0; i < data_title.length; i++) {
    data_title[i].setAttribute(
      'data-title',
      data_title[i].getAttribute('title')
    )
    data_title[i].removeAttribute('title')
  }
}
export const addQuillTitle = () => {
  const oToolBar = document.querySelector('.ql-toolbar')
  const aButton = oToolBar.querySelectorAll('button')
  const aSelect = oToolBar.querySelectorAll('select')
  aButton.forEach((item) => {
    if (item.className === 'ql-script') {
      item.value === 'sub'
        ? (item.dataset.title = '下标')
        : (item.dataset.title = '上标')
    } else if (item.className === 'ql-indent') {
      item.value === '+1'
        ? (item.dataset.title = '向右缩进')
        : (item.dataset.title = '向左缩进')
    } else {
      item.dataset.title = titleConfig[item.classList[0]]
    }
  })
  aSelect.forEach((item) => {
    // item.parentNode.title = titleConfig[item.classList[0]]
    item.previousSibling.dataset.title = titleConfig[item.classList[0]]
  })
  // detaTitle()
}
