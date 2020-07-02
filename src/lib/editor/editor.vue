<template>
  <div id="editor">
    <div class="editor-menu">
      <ul>
        <li><i class="iconfont iconfont-header"></i></li>
        <li><i class="iconfont iconfont-bold" @click="execCommand"></i></li>
        <li><i class="iconfont iconfont-text-heigh"></i></li>
        <li><i class="iconfont iconfont-font"></i></li>
        <li><i class="iconfont iconfont-italic"></i></li>
        <li><i class="iconfont iconfont-underline"></i></li>
        <li><i class="iconfont iconfont-strikethrough"></i></li>
      </ul>
    </div>
    <div
      class="editor-inputarea"
      contenteditable="true"
      ref="input"
      @blur="focus"
    ></div>
  </div>
</template>

<script>
import './assets/styles/font.css'
export default {
  name: 'yun-editor',
  data() {
    return {}
  },
  methods: {
    execCommand() {
      document.execCommand('bold', false, null)
    },
    focus() {
      this.$refs.input.focus()
    },
  },
}
</script>

<style scoped>
#editor {
  width: 100%;
  min-height: 300px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
#editor .editor-menu {
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  overflow: hidden;
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

#editor .editor-inputarea {
  border: 1px solid #ccc;
  flex: 1;
  text-align: left;
}
</style>
