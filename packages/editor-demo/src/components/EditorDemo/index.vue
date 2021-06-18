<template>
  <div class="demo">
    <!-- 自定义toolbar 开始 -->
    <div
      id="toolbar"
      :class="isPhone ? 'phonetoolbar' : ''"
      v-if="isPhone"
      v-show="showtoolbar"
      @click="hiddenKeyboard"
    >
      <button class="toolbar-done" @click="submit">完成</button>
      <button
        class="ql-font"
        :class="fontShow ? 'active' : ''"
        @click="fontShow = !fontShow"
      >
        <i class="iconfont icon-ziti"></i>
        <div class="pop" v-show="fontShow">
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-header">
            <i class="iconfont icon-biaotizhengwenqiehuan"></i>
          </button>
          <button class="ql-underline"></button>
          <button class="ql-strike"></button>
          <button class="ql-grammarly-inline">
            <i class="iconfont icon-jianxianxing"></i>
          </button>
        </div>
      </button>
      <select class="ql-color"></select>
      <select class="ql-background"></select>
      <button
        class="ql-font"
        :class="layoutShow ? 'active' : ''"
        @click="layoutShow = !layoutShow"
      >
        <i class="iconfont icon-buju"></i>
        <div class="pop" v-show="layoutShow">
          <button class="ql-list" value="ordered"></button>
          <button class="ql-list" value="bullet"></button>
          <button class="ql-align" value="justify"></button>
          <button class="ql-align" value="right"></button>
          <button class="ql-align" value="center"></button>
        </div>
      </button>
      <button class="ql-image" @click="chooseImage"></button>
      <button class="ql-history-back">
        <i class="iconfont icon-7chexiao"></i>
      </button>
      <button class="ql-history-redo">
        <i class="iconfont icon-fanchexiao"></i>
      </button>
    </div>
    <!-- 自定义toolbar 结束 -->
    <gdy-editor
      class="editor"
      :style="{ height: isPhone ? `1200px` : `100%` }"
      v-model="messages"
      :isShowTips="!isPhone"
      ref="editor"
      :toolbarOptions="toolbarOptions"
      @imgHandle="imgHandle"
      @change="change"
    />
    <!-- <button @click="$refs.editor.change('fontType')">fontType</button>
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
    <button @click="insertLink()">插入link</button> -->
    <!-- <div v-html="messages" class="ql-editor other"></div> -->
  </div>
</template>

<script>
// eslint-disable-next-line no-duplicate-imports
import { Dplayer } from 'gdy-quill-editor'
import 'gdy-quill-editor/dist/main.css'
import axios from 'axios'
import qs from 'qs'
// eslint-disable-next-line no-duplicate-imports
import VConsole from 'vconsole'
import { handlers } from 'gdy-quill-editor/lib/config/handlers'
export default {
  name: 'HelloWorld',
  data() {
    return {
      messages: '',
      toolbarOptions: {},
      fontShow: false,
      layoutShow: false,
      token: '',
      env: 'TEST',
      timer: [],
      showtoolbar: true,
      vconsole: null,
    }
  },
  // components: {
  //   gdyEditor,
  // },
  computed: {
    isPhone: () =>
      /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent),
    isIOS: () => !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    isAndroid: () =>
      navigator.userAgent.indexOf('Android') > -1 ||
      navigator.userAgent.indexOf('Linux') > -1,
  },
  created() {
    // TODO before editor init
    if (this.isPhone) {
      this.isPhone && (this.vconsole = new VConsole())
      this.toolbarOptions = {
        container: '#toolbar',
        handlers,
      }
      document.addEventListener(
        'click',
        (e) => {
          const cln = e.toElement.className
          if (
            cln === 'iconfont icon-ziti' ||
            cln === 'iconfont icon-cuti' ||
            cln === 'iconfont icon--xieti' ||
            cln === 'iconfont icon-biaotizhengwenqiehuan' ||
            cln === 'iconfont icon-xiahuaxian' ||
            cln === 'iconfont icon-shanchuxian'
          ) {
            this.fontShow = true
            this.layoutShow = false
            return false
          } else if (
            cln === 'iconfont icon-youxuliebiao' ||
            cln === 'iconfont icon-wuxuliebiao' ||
            cln === 'iconfont icon-zuoduiqi' ||
            cln === 'iconfont icon-youduiqi' ||
            cln === 'iconfont icon-juzhongduiqi' ||
            cln === 'iconfont icon-buju'
          ) {
            this.layoutShow = true
            this.fontShow = false
            return false
          }
          this.fontShow = false
          this.layoutShow = false
        },
        false
      )
    }
  },
  mounted() {
    // Object.defineProperty()
    window['setUserToken'] = (token, env) => {
      this.webMethod('setUserToken')
      this.token = token
      this.env = env
      if (env !== 'TEST') {
        this.vconsole.$dom.style.display = 'none'
      } else {
        this.vconsole.$dom.style.display = 'block'
      }
    }
    window['setContent'] = (messages) => {
      this.webMethod('setContent')
      this.$refs.editor.quill.clipboard.dangerouslyPasteHTML(messages)
    }
    window['showToolbar'] = (flag) => {
      this.webMethod('showToolbar')
      this.showtoolbar = flag
    }
    window['unescape'] = (text) => {
      this.webMethod('unescape')
      return unescape(text)
    }
    window['getContent'] = () => {
      this.webMethod('getContent')
      return this.messages
    }
    this.$nextTick(() => {
      this.initEditor()
    })
    window['insertImage'] = (url) => {
      this.webMethod('insertImage')
      return this.insertImage(url)
    }
  },
  methods: {
    change() {
      console.log(1)
    },
    webMethod(name) {
      console.log(`调用了web端的${name}方法`)
    },
    webviewJsMethod(keyName, param) {
      try {
        let phoneType = ''
        if (this.isAndroid) {
          phoneType = 'android'
          // eslint-disable-next-line no-undef
          androidJs &&
            // eslint-disable-next-line no-undef
            (param ? androidJs[keyName](param) : androidJs[keyName]())
        }
        if (this.isIOS) {
          phoneType = 'ios'
          window.webkit &&
            window.webkit.messageHandlers[keyName].postMessage(param)
        }
        console.log(
          `调用了${phoneType}的 ${keyName} 方法，传递参数为：${JSON.stringify(
            param
          )}`
        )
      } catch (error) {
        console.log(error)
      }
    },
    hiddenKeyboard() {
      if (this.isIOS) {
        this.webviewJsMethod('hiddenKeyboard')
      }
    },
    submit() {
      this.webviewJsMethod('save')
    },
    chooseImage() {
      this.webviewJsMethod('upDataImg')
    },
    insertImage(url) {
      const quill = this.$refs.editor.quill
      quill.blur()
      // 获取光标当前位置
      const index =
        (quill.getSelection(true) || {}).index || quill.getLength() - 1
      quill.insertEmbed(index, 'image', url)
      quill.update()
      quill.setSelection(index + 1)
    },
    imgHandle(param) {
      const { base64, imgFile, insert } = param
      const fd = new FormData()
      fd.append('file', imgFile)
      axios
        .post(
          'https://consoleapi.guangdianyun.tv/v1/cms/article/uploadImg',
          fd,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              // 'X-Ca-Stage': this.env,
              token: this.token,
            },
          }
        )
        .then(
          (res) => {
            if (res.data.code === 200 && res.data.errorCode === 0) {
              insert(res.data.data)
            } else {
              insert(param.base64)
              this.webviewJsMethod('showToast', '图片上传失败,请重试')
            }
          },
          (response) => {
            insert(param.base64)
            this.webviewJsMethod('showToast', '请求失败')
          }
        )
    },
    initEditor() {
      if (!this.$refs.editor) {
        return
      }
      // TODO this.$refs.editor.quill.getModule('toolbar').addHandler
      const quill = this.$refs.editor.quill
      const toolbar = quill.getModule('toolbar')
      if (this.isIOS) {
        toolbar.addHandler('image', () => {})
      }
    },
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
  destroyed() {
    this.timer.forEach((item) => {
      clearTimeout(item)
    })
  },
  watch: {
    /* 视频预览 */
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
        clearTimeout(this.timer[i])
        const options = arr[i].match(srcReg)
        this.timer[i] = setTimeout(() => {
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
@import '../../style/iconfont.css';
.demo,
.editor {
  width: 100%;
  height: 100%;
  padding-bottom: 20px;
}
.ql-toolbar {
  position: fixed;
  bottom: 0;
}
>>> .ql-container.ql-snow {
  border: none;
}
.phonetoolbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #f9f9f9;
  z-index: 99;
  height: 40px;
}

.phonetoolbar button {
  position: relative;
  background: transparent;
  border: 1px solid #f9f9f9;
  cursor: pointer;
  display: inline-block;
  font-size: 18px;
  padding: 0;

  text-align: center;
}

.phonetoolbar .toolbar-done {
  float: right;
  font-size: 12px;
  width: auto;
}

>>> .phonetoolbar .ql-picker-options {
  position: fixed !important;
  top: unset !important;
  left: 0;
  width: 100% !important;
  margin-top: -80px !important;
}

.phonetoolbar button .pop {
  position: absolute;
  top: -40px;
  background: #f9f9f9;
  display: flex;
  flex-wrap: nowrap;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  overflow: hidden;
  z-index: 9;
}

.phonetoolbar button .iconfont {
  color: #444;
  /* padding: 10px; */
}

.phonetoolbar button::active .iconfont {
  color: #3fbdf0;
}

.phonetoolbar button[disabled] .iconfont {
  color: #bbb;
}

button:active,
button:focus {
  outline: none;
}
</style>
