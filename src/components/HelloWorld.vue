<template>
  <div class="hello">
    <gdy-editor class="editor" v-model="messages"></gdy-editor>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      messages: '',
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.editor {
  width: 100%;
  height: px2rem(200);
}
</style>
