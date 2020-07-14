<template>
  <div class="hello">
    <gdy-editor class="editor" v-model="messages" ref="editor"></gdy-editor>
    <button
      @click="
        insertVedio(
          'http://vodm0pihssv.vod.126.net/edu-video/nos/mp4/2018/06/06/1009560242_ba3c9037aed449cc8d00ec1686d2bfb9_hd.mp4?ak=7909bff134372bffca53cdc2c17adc27a4c38c6336120510aea1ae1790819de8695eabcd5016fe30911ec99960c90e3867c8f4f9146991c87a2fd79009d5236a3059f726dc7bb86b92adbc3d5b34b132ea08614294bb42c50719db2a0dbcb5e34426afeac364f76a817da3b2623cd41e.mp4'
        )
      "
    >
      插入视频mp4
    </button>
    <button
      @click="
        insertVedio(
          'http://45695.live-vod.cdn.aodianyun.com/m3u8/0x0/guangdianyun_45695.program_live_channel_45432.1593657201/guangdianyun_45695.program_live_channel_45432.1593657201.m3u8'
        )
      "
    >
      插入视频m3u8
    </button>
    <button @click="insertLink()">
      插入link
    </button>
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
  methods: {
    insertVedio(url) {
      console.log('insertVedio')
      this.$refs.editor.addVideoLink(url)
    },
    insertLink(url) {
      console.log('insertLink')
      this.$refs.editor.addTextLink({
        innerText: 'test',
        href: 'https://www.baidu.com',
      })
    },
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
