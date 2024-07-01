<template>
  <div>
    <ul class="chose-ul">
      <li>
        <p>手动角点标定</p>
        <p>
          通过人工手动选择图像和点云角点实现标定、适用于激光雷达，场景特定条件：无
        </p>
      </li>
      <li>
        <p>线匹配算法</p>
        <p>通过轨道线检测、进行线匹配从而生成外参。场景特定条件：轨道线</p>
        <el-button type="primary" @click="getResult()">执行</el-button>
      </li>
      <li>
        <p>激光雷达标定</p>
        <p>通过轨道线检测、进行线匹配从而生成外参。场景特定条件：轨道线</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.chose-ul {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
}
.chose-ul li {
  width: 200px;
  height: 240px;
  display: inline-block;
  margin: 0 20px 20px 0;
  font-size: 14px;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #f5f7fa;
  background-color: aliceblue;
  vertical-align: top;
}
.chose-ul li:hover {
  border: 1px solid #409eff;
}
</style>

<script setup lang="ts">
import { postSelect_type, getStatus } from '../api/base.ts';
import { ref, onMounted } from 'vue';
import { mainStore } from '../store/index';
import { ElMessage } from 'element-plus';
import { ElLoading } from 'element-plus';

// 子组件向父组件传参

const emit = defineEmits<{
  (event: 'changeDate', str: string): void;
}>();

const store = mainStore();
const pageStatus = ref(0); // 0 未执行 1 执行中 2 执行完成
const saveData = ref({});
var loadingInstance1: any = null;
const getResult = () => {
  let obj = {
    camera_cab_value: {
      ret: store.ret,
      mtx: store.mtx,
      dist: store.dist,
    },
    camera_cab_path: store.camera_cab_path,
    calibration_image_path: store.calibration_image_path,
    pcd_file_path: store.pcd_file_path,
    method_type: 2,
  };
  loadingInstance1 = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  postSelect_type(obj)
    .then((res: any) => {
      pageStatus.value = 1;

      store.cab_image_path = res.data.cab_image_path;
      store.extrinsic_value = res.data.extrinsic_value;
      emit('changeDate', '123');
      loadingInstance1.close();
      // 每隔10s种 获取一下 状态
    })
    .catch((err) => {
      getStatusTask();
    });
};
var timer: any = null;
const getStatusTask = () => {
  timer = setInterval(() => {
    getStatus({ method_type: 2 }).then((res: any) => {
      console.log(res);
      ElMessage({
        message: res.code,
        type: 'warning',
      });
      // 如果
      if (res.code === 200) {
        pageStatus.value = 2;

        store.cab_image_path = res.data.cab_image_path;
        store.extrinsic_value = res.data.extrinsic_value;
        clearInterval(timer);
        emit('changeDate', '123');
      }
    });
  }, 1000 * 2);
};
</script>
