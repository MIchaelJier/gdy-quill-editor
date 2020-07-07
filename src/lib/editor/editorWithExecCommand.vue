<template>
  <div id="editor">
    <div class="editor-menu">
      <ul>
        <!-- 设置标题 -->
        <li>
          <yunSelect
            name="iconfont-header"
            commandKey="titleBlock"
            @onClick="execCommand"
          />
        </li>
        <!-- 字体加粗 -->
        <li>
          <i class="iconfont iconfont-bold" @click="execCommand('bold')"></i>
        </li>
        <!-- 字号 -->
        <li>
          <yunSelect
            name="iconfont-text-heigh"
            commandKey="fontSize"
            @onClick="execCommand"
          />
        </li>
        <!-- 字体 -->
        <li>
          <i class="iconfont iconfont-font"></i>
        </li>
        <!-- 斜体 -->
        <li>
          <i
            class="iconfont iconfont-italic"
            @click="execCommand('italic')"
          ></i>
        </li>
        <!-- 下划线 -->
        <li>
          <i
            class="iconfont iconfont-underline"
            @click="execCommand('underline')"
          ></i>
        </li>
        <!-- 删除线 -->
        <li>
          <i
            class="iconfont iconfont-strikethrough"
            @click="execCommand('strikeThrough')"
          ></i>
        </li>
      </ul>
    </div>
    <div class="editor-main">
      <div
        class="editor-inputarea"
        contenteditable="true"
        ref="input"
        @blur="focus"
        @input="print"
      ></div>
      <div class="editor-view">{{ htmlString }}</div>
    </div>
  </div>
</template>

<script>
import './assets/styles/font.css'
import yunSelect from './components/select'
export default {
  name: 'yun-editor',
  components: {
    yunSelect,
  },
  data() {
    return {
      htmlString: '',
      selectList: [],
      selectShow: false,
      x: 0,
      y: 0,
      menuInfo: {}, // config
      positionStyle: { top: '35px', left: '20px' },
    }
  },
  mounted() {
    const box = document
      .getElementsByClassName('editor-menu')[0]
      .getBoundingClientRect()
    const { bottom, top, height } = box
    this.menuInfo = { bottom, top, height }
  },
  methods: {
    execCommand(name, args = null) {
      document.execCommand(name, false, args)
    },
    focus() {
      this.$refs.input.focus()
    },
    print() {
      this.htmlString = document.querySelector('.editor-inputarea').innerHTML
    },
  },
}
</script>

<style scoped>
.select {
  height: 100px;
  width: 100px;
  background: #f1f1f1;
  position: absolute;
}
#editor {
  width: 100%;
  min-height: 300px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
}
#editor .editor-menu {
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  width: 100%;
}
#editor .editor-menu ul {
  list-style-type: none;
  padding: 0px;
  margin: 0px;
  color: #666;
}
#editor .editor-menu ul li {
  float: left;
  padding-left: 14px;
  text-align: center;
  padding: 5px 10px;
  cursor: pointer;
}
#editor .editor-menu ul li:hover {
  color: #333;
}

#editor .editor-main {
  flex: 1;
  display: flex;
}
#editor .editor-main .editor-inputarea {
  border: 1px solid #ccc;
  flex: 1;
  text-align: left;
}
#editor .editor-main .editor-view {
  border: 1px solid #ccc;
  flex: 1;
  text-align: left;
}
</style>
