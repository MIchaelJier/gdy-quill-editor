<template>
  <div class="hello">
    <gdy-editor class="editor" v-model="messages" ref="editor" isShowCode>
    </gdy-editor>
    <button @click="$refs.editor.change('fontType')">fontType</button>
    <button @click="$refs.editor.change('fontColor')">fontColor</button>
    <button @click="$refs.editor.change('fontShape')">fontShape</button>
    <button @click="$refs.editor.change('other')">other</button>
    <button
      @click="
        insertVedio(
          'http://vodm0pihssv.vod.126.net/edu-video/nos/mp4/2018/06/06/1009560242_ba3c9037aed449cc8d00ec1686d2bfb9_hd.mp4?ak=7909bff134372bffca53cdc2c17adc27a4c38c6336120510aea1ae1790819de8695eabcd5016fe30911ec99960c90e3867c8f4f9146991c87a2fd79009d5236a3059f726dc7bb86b92adbc3d5b34b132ea08614294bb42c50719db2a0dbcb5e34426afeac364f76a817da3b2623cd41e.mp4',
          'mp4test'
        )
      "
    >
      插入视频mp4
    </button>
    <button
      @click="
        insertVedio(
          'http://45695.live-vod.cdn.aodianyun.com/m3u8/0x0/guangdianyun_45695.program_live_channel_45432.1593657201/guangdianyun_45695.program_live_channel_45432.1593657201.m3u8',
          'm3u8test'
        )
      "
    >
      插入视频m3u8
    </button>
    <button @click="insertLink()">
      插入link
    </button>
    <div v-html="messages" class="ql-editor other"></div>
  </div>
</template>

<script>
import { Dplayer } from 'gdy-quill-editor'
export default {
  name: 'HelloWorld',
  data() {
    return {
      messages:
        '<p><img src="https://static-pro.guangdianyun.tv/1000/cms/20200724/557d09308f3be73222d6d2aad9550e24.png" height="96" width="96" data-align="center" style="display: block; margin: auto;"></p><p class="ql-align-center"><span style="background-color: rgb(230, 0, 0);">test</span></p><span contenteditable="false"><span class="ap ap-hugging_face">🤗</span></span>',
      toolbarOptions: {
        container: [],
      },
    }
  },
  mounted() {
    console.log(this.$refs.editor.quill)
  },
  methods: {
    insertVedio(url, id) {
      console.log('insertVedio')
      const video = {
        url,
        id,
        poster:
          'http://cdn-dvr.aodianyun.com/pic/live-vod/images/guangdianyun_41250.program_live_channel_1000209.1595559697',
      }
      this.$refs.editor.addVideoLink(video)
    },
    insertLink(url) {
      console.log('insertLink')
      this.$refs.editor.addTextLink({
        innerText: 'test',
        href: 'https://www.baidu.com',
      })
    },
  },
  watch: {
    messages(newval) {
      function HTMLDecode(text) {
        let temp = document.createElement('div')
        temp.innerHTML = text
        const output = temp.innerText || temp.textContent
        temp = null
        return JSON.parse(output)
      }
      const imgReg = /<div [^>]*data-options=['"]([^'"]+)[^>]*>/gi
      const srcReg = /data-options=[\'\"]?([^\'\"]*)[\'\"]?/i
      const arr = newval.match(imgReg)
      if (!arr) return
      for (let i = 0; i < arr.length; i++) {
        const options = arr[i].match(srcReg)
        setTimeout(() => {
          const op = HTMLDecode(options[1])
          op.container = document.querySelectorAll('#' + op.container)[1]
          const myvideo = new Dplayer(op)
          myvideo.play()
        }, 500)
      }
    },
  },
}
</script>

<style scoped>
.editor {
  width: 100%;
  height: px2rem(200);
}
.ql-toolbar {
  position: fixed;
  bottom: 0;
}
</style>
