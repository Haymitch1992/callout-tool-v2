<script setup>
import { ref } from 'vue';
import dataList from './components/dataList.vue';
import arithmetic from './components/arithmetic.vue';
import result from './components/result.vue';
import handleData from './components/handleData.vue';
const activeName = ref('first');
</script>

<template>
  <div class="title-container">
    <h1 class="title">传感器标定工具</h1>
    <span>版本号：v0.0.1</span>
  </div>
  <div class="container">
    <el-tabs v-model="activeName" class="demo-tabs" type="border-card">
      <el-tab-pane label="选择数据" name="first">
        <data-list></data-list>
      </el-tab-pane>
      <el-tab-pane label="操作数据" name="second">
        <handle-data></handle-data>
      </el-tab-pane>
      <el-tab-pane label="选择算法" name="third">
        <arithmetic @changeDate="activeName = 'fourth'"></arithmetic>
      </el-tab-pane>
      <el-tab-pane label="标定结果" name="fourth">
        <result></result>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.title-container {
  background-color: #000;
  padding: 10px 0;
}
.title-container span {
  color: #fff;
}
.title {
  line-height: 60px;
  text-align: center;
  background-color: #000;
  color: #fff;
  padding: 0;
  position: relative;
  margin: 0 auto;
  font-size: 32px;
}
.container {
  background-color: #fff;
  padding: 30px 12px 12px;
  margin: 20px auto;
  width: 1200px;
  min-height: 500px;
}
</style>
