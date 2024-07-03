<template>
  <div>
    <ul class="chose-ul">
      <li>
        <div class="left">
          <img class="img-icon" src="../assets/arithmetic3.png " />
        </div>
        <div class="right">
          <p class="title">手动角点标定</p>
          <p>
            通过人工手动选择图像和点云角点实现标定、适用于激光雷达，场景特定条件：无
          </p>
        </div>
      </li>
      <li>
        <div class="left">
          <img class="img-icon" src="../assets/arithmetic5.png " />
        </div>
        <div class="right">
          <p class="title">线匹配算法</p>
          <p>通过轨道线检测、进行线匹配从而生成外参。场景特定条件：轨道线</p>
          <el-button type="primary" @click="getResult()">执行</el-button>
        </div>
      </li>
      <li>
        <div class="left">
          <img class="img-icon" src="../assets/arithmetic6.png " />
        </div>
        <div class="right">
          <p class="title">激光雷达标定</p>
          <p>通过轨道线检测、进行线匹配从而生成外参。场景特定条件：轨道线</p>
        </div>
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
.left {
  display: inline-block;
  width: 60px;
  vertical-align: top;
  margin-right: 10px;
  margin-left: 10px;
}
.right {
  display: inline-block;
  width: 260px;
  vertical-align: top;
  line-height: 24px;
}
.img-icon {
  width: 50px;
  margin-top: 14px;
}
.chose-ul li {
  /* width: 300px; */
  /* height: 240px; */
  min-height: 180px;
  display: inline-block;
  margin: 0 20px 20px 0;
  font-size: 14px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #eee;
  border-radius: 4px;
  cursor: pointer;
  /* border: 1px solid #f5f7fa; */
  /* background-color: aliceblue; */
  vertical-align: top;
}
.title {
  color: #409eff;
  font-size: 20px;
  font-weight: bold;
}
.chose-ul li:hover {
  /* border: 1px solid #409eff; */
  background-color: aliceblue;
}
</style>

<script setup lang="ts">
import { postSelect_type, getStatus } from '../api/base.ts';
import { ref, onMounted, onUnmounted } from 'vue';
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
      store.r_matrix = res.data.r_matrix;
      store.r_vector = res.data.r_vector;
      store.t_matrix = res.data.t_matrix;
      store.extrinsic_path = res.data.extrinsic_path;
      store.camera_txt_path = res.data.camera_cab_path;

      if (res.data.code === 1001) {
        ElMessage({
          message: res.data.message,
          type: 'warning',
        });
      } else {
        emit('changeDate', '123');
      }
      loadingInstance1.close();

      // 每隔10s种 获取一下 状态
    })
    .catch((err) => {
      loadingInstance1.close();
      getStatusTask();
    });
};
var timer: any = null;
const getStatusTask = () => {
  clearInterval(timer);
  timer = setInterval(() => {
    getStatus({ method_type: 2 }).then((res: any) => {
      // 如果
      if (res.data.code === 200) {
        pageStatus.value = 2;
        store.cab_image_path = res.data.cab_image_path;
        store.r_vector = res.data.r_vector;
        store.t_matrix = res.data.t_matrix;
        store.t_matrix = res.data.t_matrix;
        store.extrinsic_path = res.data.extrinsic_path;
        store.camera_txt_path = res.data.camera_cab_path;
        clearInterval(timer);
        emit('changeDate', '123');
      } else {
        ElMessage({
          message: res.data.message,
          type: 'warning',
        });
      }
    });
  }, 1000 * 2);
};
onUnmounted(() => {
  // 2.6% 2.4%
  clearInterval(timer);
});
</script>
