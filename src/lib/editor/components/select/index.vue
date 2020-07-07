<template>
  <div class="yun-select">
    <div class="value-view">
      <div class="value">
        <i class="iconfont" :class="name" @click="showControl"></i>
      </div>
      <ul v-if="showList" class="list">
        <li
          v-for="item in allList.get(commandKey)"
          @click="itemClick(item.command)"
          :key="item.name"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const editorList = new Map([
  [
    'titleBlock',
    [
      { name: 'H1', command: ['formatBlock', 'H1'] },
      { name: 'H2', command: ['formatBlock', 'H2'] },
      { name: 'H3', command: ['formatBlock', 'H3'] },
      { name: 'H4', command: ['formatBlock', 'H4'] },
      { name: 'H5', command: ['formatBlock', 'H5'] },
    ],
  ],
  [
    'fontSize',
    [
      { name: 'x-small', command: ['styleWithCSS', 'font-size: 22px'] },
      { name: 'samll', command: ['fontSize', 2] },
      { name: 'normal', command: ['fontSize', 3] },
      { name: 'large', command: ['fontSize', 4] },
      { name: 'x-large', command: ['fontSize', 5] },
      { name: 'xx-large', command: ['fontSize', 6] },
      { name: 'xxx-large', command: ['fontSize', 7] },
    ],
  ],
])
export default {
  name: 'yunSelect',
  props: {
    commandKey: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showList: false,
      allList: editorList,
    }
  },
  methods: {
    itemClick(command) {
      this.$emit('onClick', command[0], command[1])
    },
    showControl() {
      this.showList = !this.showList
    },
  },
}
</script>

<style scoped>
.yun-select {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.yun-select .value-view {
  display: flex;
  flex-flow: row;
  align-items: center;
  cursor: pointer;
  position: relative;
}

.yun-select .value-view .list {
  position: absolute;
  display: block;
  list-style: none;
  left: 0;
  top: 100%;
  z-index: 1;
}

.yun-select .list li {
  min-width: 100%;
  height: 26px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  background: #f1f1f1;
  cursor: pointer;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
}

.yun-select .list li:hover {
  background: #75b325;
}
</style>
