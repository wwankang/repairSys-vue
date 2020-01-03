<template>
  <div id="app">
    <!--<div>
      <el-button @click="send">发消息</el-button>
    </div>-->
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      path:"ws://127.0.0.1:8082/websocket/pc",
      socket:""
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init: function () {
      if(typeof(WebSocket) === "undefined"){
      }else{
        this.socket = new WebSocket(this.path)
        this.socket.onopen = this.open
        this.socket.onerror = this.error
        this.socket.onmessage = this.getMessage
      }
    },
    open: function () {
    },
    error: function () {
    },
    getMessage: function (msg) {
      console.log(msg.data)
    },
    send: function () {
      this.socket.send("hello")
    },
    close: function () {
    }
  },
  destroyed () {
    this.socket.onclose = this.close
  }
}
</script>
<style type="text/css" lang="scss">//表头错位问题
  body .el-table th.gutter{
    display: table-cell!important;
  }
  .el-table colgroup.gutter {
    display: table-cell !important;
  }
</style>
