<template>
  <div>
    <div class="img-item">示例图片</div>
    <el-input
      v-model="textarea"
      :rows="6"
      type="textarea"
      placeholder="Please input"
    ></el-input>
    <div class="line-btn">
      <el-button type="primary">调节</el-button>
      <el-button>导出</el-button>
    </div>
  </div>
</template>

<style scoped>
.line-btn {
  padding-top: 10px;
  text-align: left;
}
.img-item {
  background: #f5f7fa;
  height: 300px;
  margin-bottom: 10px;
  border-radius: 4px;
  color: #666;
  text-align: center;
  line-height: 300px;
}
</style>
<script setup>
import { ref } from 'vue';
const textarea = ref('XXXX XXXX XXX');
</script>
