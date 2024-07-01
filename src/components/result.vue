<template>
  <div>
    <div class="img-item">
      <img
      class="img-demo"
        :src="
          'http://172.16.217.152:8000/sensors_data/res_file/' +
          store.cab_image_path
        "
        alt=""
      />
    </div>
    <el-input
      v-model="store.extrinsic_value"
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
  min-height: 300px;
  margin-bottom: 10px;
  border-radius: 4px;
  color: #666;
  text-align: center;
}
.img-demo{
  width: 100%;
}
</style>
<script setup>
import { ref } from 'vue';

import { mainStore } from '../store/index';
const store = mainStore();
const textarea = ref('XXXX XXXX XXX');
</script>
