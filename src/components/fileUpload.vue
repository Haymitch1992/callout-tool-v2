<template>
  <uploader
    :options="options"
    :file-status-text="statusText"
    class="uploader-example"
    ref="uploaderRef"
    @file-complete="fileComplete"
    @complete="complete"
  >
    <!-- <uploader-unsupport></uploader-unsupport>
      <uploader-drop>
        <p>Drop files here to upload or</p>
        <uploader-btn>select files</uploader-btn>
        <uploader-btn :attrs="attrs">select images</uploader-btn>
        <uploader-btn :directory="true">select folder</uploader-btn>
      </uploader-drop>
      <uploader-list></uploader-list> -->
  </uploader>
</template>

<script>
import { nextTick, ref, onMounted } from 'vue';
import { POST_UPLOAD_FILE, POST_JOIN_FILE } from '../api/base';
export default {
  setup() {
    const uploaderRef = ref(null);
    const options = {
      target: '/sensors_data/pares_data/', // '//jsonplaceholder.typicode.com/posts/',
      testChunks: true,
      chunkSize: 1024000 * 5, // 分块大小
      fileParameterName: 'file', // 上传文件时文件的参数名，默认file
      maxChunkRetries: 3, // 最大自动失败重试上传次数
    //   checkChunkUploadedByResponse: function (chunk, message) {
    //     console.log('服务器校验分片', chunk);
    //     chunk.merge = true;
    //     let objMessage = JSON.parse(message);
    //     if (objMessage.message) {
    //       chunk.merge = false;
    //       return true;
    //     }

    //     return (objMessage.chunk_id_list || []).indexOf(chunk.offset + 1) >= 0;
    //   },
    };
    const attrs = {
      accept: 'image/*',
    };
    const statusText = {
      success: 'success',
      error: 'error',
      uploading: 'uploading',
      paused: 'paused',
      waiting: 'waiting',
    };
    const complete = () => {
      console.log('complete', arguments);
    };
    const fileComplete = () => {
        console.log('file complete', arguments);
        POST_JOIN_FILE().then((res) => {
          console.log(res);
        });
    };
    onMounted(() => {
      nextTick(() => {
        window.uploader = uploaderRef.value.uploader;
      });
    });
    return {
      uploaderRef,
      options,
      attrs,
      statusText,
      complete,
      fileComplete,
    };
  },
};
</script>

<style>
.uploader-example {
  width: 880px;
  padding: 15px;
  margin: 40px auto 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.uploader-example .uploader-btn {
  margin-right: 4px;
}
.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
