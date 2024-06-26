<template>
  <el-upload
    class="upload-demo"
    drag
    :options="options"
    :fileStatusText="fileStatusText"
    class="uploader-example"
    :autoStart="false"
    ref="uploader"
    @file-added="onFileAdded"
    @file-success="onFileSuccess"
    style="width: 100%"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">拖拽文件到虚框内,或<em>点击上传</em></div>
    <template #tip>
      <div class="el-upload__tip">类型为.zip文件，且大小不能超过6Gb</div>
    </template>
  </el-upload>
</template>
<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue';





</script>
