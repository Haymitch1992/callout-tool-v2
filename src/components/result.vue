<template>
  <div>
    <div class="img-item">
      <!--  -->
      <img
        class="img-demo"
        v-if="showImg"
        :src="
          'http://172.16.217.152:8000/sensors_data/res_file/' +
          store.cab_image_path +
          '?time=' +
          currentTime
        "
        alt=""
      />
    </div>
    <el-form label-width="80px">
      <el-form-item label="旋转矩阵">
        <el-input v-model="store.r_matrix" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="旋转向量">
        <el-input
          v-model="store.r_vector[0]"
          style="width: 200px; margin-right: 4px"
        >
          <template #prepend>pitch</template>
        </el-input>
        <el-input
          v-model="store.r_vector[1]"
          style="width: 200px; margin-right: 4px"
        >
          <template #prepend>roll</template>
        </el-input>
        <el-input v-model="store.r_vector[2]" style="width: 200px">
          <template #prepend>yaw</template>
        </el-input>
      </el-form-item>
      <el-form-item label="平移矩阵">
        <el-input
          v-model="store.t_matrix[0]"
          style="width: 200px; margin-right: 4px"
        ></el-input>
        <el-input
          v-model="store.t_matrix[1]"
          style="width: 200px; margin-right: 4px"
        ></el-input>
        <el-input v-model="store.t_matrix[2]" style="width: 200px"></el-input>
      </el-form-item>
    </el-form>

    <div class="line-btn">
      <el-button type="primary" @click="handleClick()">调节</el-button>
      <el-button @click="load()">导出</el-button>
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
.img-demo {
  width: 100%;
}
</style>
<script setup>
import { ref } from 'vue';
import { postAlter_extrinsic_value } from '../api/base.ts';
import { mainStore } from '../store/index';
import { ElMessage } from 'element-plus';
const showImg = ref(true);
const store = mainStore();
const textarea = ref('XXXX XXXX XXX');
// postAlter_extrinsic_value
const load = () => {
  let str = store.extrinsic_path;

  // 去除掉 str 的 static/data/
  let linkUrl = str.replace('static/data/', '');
  // 下载文件 172.16.217.152:8000/sensors_data/res_file//result/20240702-1825/extrinsic/extrinsic.txt/
  window.open(`http://172.16.217.152:8000/sensors_data/res_file/${linkUrl}`);
  window.open(
    `http://172.16.217.152:8000/sensors_data/res_file/${store.camera_txt_path}`
  );
};
const currentTime = ref('');
const handleClick = () => {
  currentTime.value = new Date().getTime();
  showImg.value = !showImg.value;
  // arr
  // 数组arr 的每一项转化成浮点数
  let arr1 = store.r_vector.map((item) => parseFloat(item));
  let arr2 = store.t_matrix.map((item) => parseFloat(item));
  let obj = {
    r_matrix: store.r_matrix,
    r_vector: arr1,
    t_matrix: arr2,
    extrinsic_path: store.extrinsic_path,
  };
  postAlter_extrinsic_value(obj).then((res) => {
    ElMessage({
      message: '调节参数成功',
      type: 'success',
    });
    console.log(res);
    store.r_vector = res.data.r_vector;
    store.t_matrix = res.data.t_matrix;
    store.t_matrix = res.data.t_matrix;
    showImg.value = !showImg.value;
  });
};
</script>
