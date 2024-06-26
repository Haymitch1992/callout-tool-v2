<template>
  <div>
    <div class="card-item card-item-1">
      <!-- 棋盘格数据独占一行 -->
      <!-- 标定图像 跟 点云数据 对比显示 -->
      <h2>棋盘格图像</h2>
      <el-tag>{{ chooseArr }}</el-tag>
      <ul class="choose-ul">
        <li v-for="item in chooseArr">
          <img
            v-if="item.choose && item.label.split('.').pop() === 'png'"
            class="img-item"
            :src="
              'http://172.16.217.152:8000/sensors_data/res_file/' + item.label
            "
            alt=""
          />
        </li>
      </ul>
      <h3>3*3矩阵</h3>
      <el-tag v-for="item in mtx" class="tag-item">{{ item }}</el-tag>
      <h3>参数</h3>
      <el-tag v-for="item in dist">{{ item }}</el-tag>

      <!-- <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 6 }"
        placeholder="请输入内参参数"
        v-model="argumentsValue"
      ></el-input> -->
      <div class="btn-line">
        <el-button @click="getIntrinsicData()">生成内参</el-button>
        <!-- <h2>棋盘格图形</h2>-->
        <el-button type="primary" @click="dialogVisible = true"
          >选择路径</el-button
        >
      </div>
    </div>
    <div class="card-item">
      <div class="card-left">
        <h2>标定图像</h2>

        <el-tag>{{ chooseArr3.label }}</el-tag>
        <ul class="choose-ul">
          <li>
            <img
              v-if="
                chooseArr3.choose && chooseArr3.label.split('.').pop() === 'png'
              "
              class="choose-img"
              :src="
                'http://172.16.217.152:8000/sensors_data/res_file/' +
                chooseArr3.label
              "
              alt=""
            />
          </li>
        </ul>
        <el-button type="primary" @click="dialogVisible3 = true"
          >选择路径</el-button
        >
      </div>
      <div class="card-right">
        <h2>点云数据</h2>
        <el-tag>{{ chooseArr2 }}</el-tag>
        <pcd-item
          v-if="chooseArr2.length !== 0"
          :pcdPath="chooseArr2"
        ></pcd-item>

        <el-button type="primary" @click="dialogVisible2 = true"
          >选择路径</el-button
        >
      </div>
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="棋盘格图像路径选择"
      width="500"
      :before-close="handleClose"
    >
      <template #footer>
        <div class="dialog-footer">
          <el-tree
            style="max-width: 600px"
            accordion
            :data="treeData"
            @node-click="handleNodeClick"
          />
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="dialogVisible3"
      title="标定图像路径选择"
      width="500"
      :before-close="handleClose3"
    >
      <template #footer>
        <div class="dialog-footer">
          <el-tree
            style="max-width: 600px"
            accordion
            :data="treeData"
            @node-click="handleNodeClick3"
          />
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="dialogVisible2"
      title="点云数据路径选择"
      width="500"
      :before-close="handleClose2"
    >
      <template #footer>
        <div class="dialog-footer">
          <el-tree
            style="max-width: 600px"
            accordion
            :data="treeData"
            @node-click="handleNodeClick2"
          />
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getFiles, getIntrinsic } from '../api/base';
import pcdItem from './pcdItem2.vue';
import { MixOperation } from 'three';

const chooseArr = ref([]);
const saveImagePath = ref('');
const argumentsValue = ref('');
const mtx = ref([]);
const dist = ref([]);
const chooseArr2 = ref([]);
const chooseArr3 = ref([]);
const treeData = ref();

const dialogVisible = ref(false);
const dialogVisible2 = ref(false);
const dialogVisible3 = ref(false);
const handleClose = () => {
  dialogVisible.value = false;
};
const handleClose2 = () => {
  dialogVisible2.value = false;
};
const handleClose3 = () => {
  dialogVisible3.value = false;
};
const getTreeData = () => {
  getFiles().then((res) => {
    let arr = res.data.files;
    treeData.value = convertToTreeData(arr);
    // 数据处理成 树形控件需要的格式
  });
};

const getIntrinsicData = () => {
  getIntrinsic({
    camera_cab_path: saveImagePath.value,
  }).then((res) => {
    console.log(res);
    mtx.value = res.data.mtx;
    dist.value = res.data.dist;
    argumentsValue.value = JSON.stringify(res.data);
  });
};

const calcPath = (str) => {
  var parts = str.split('/');
  var removedLast = parts.slice(0, -1);
  var result = removedLast.join('/');
  return result;
};

const handleNodeClick = (
  checkedNodes,
  checkedKeys,
  halfCheckedNodes,
  halfCheckedKeys
) => {
  console.log(checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys);

  chooseArr.value = checkedNodes.children;

  let str = chooseArr.value[0].label || '';
  // 获取当前节点的path
  saveImagePath.value = calcPath(str);
};

const handleNodeClick3 = (
  checkedNodes,
  checkedKeys,
  halfCheckedNodes,
  halfCheckedKeys
) => {
  console.log(checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys);
  chooseArr3.value = checkedNodes;
};

const handleNodeClick2 = (
  checkedNodes,
  checkedKeys,
  halfCheckedNodes,
  halfCheckedKeys
) => {
  chooseArr2.value = '';
  console.log(checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys);
  // 判断是否为pcd文件
  if (checkedNodes.label.split('.').pop() !== 'pcd') {
    return;
  } else {
    chooseArr2.value = checkedNodes.label;
    dialogVisible2.value = false;
  }
};

function convertToTreeData(arr, parentPath = '') {
  return arr.map((item) => {
    let node = {
      label: '',
      choose: false,
    };
    let currentPath = parentPath;
    if (Array.isArray(item[1])) {
      node.label = item[0];

      currentPath += item[0] + '/';
    } else {
      node.choose = true;
      node.label = currentPath + [item];
      node.str = currentPath;
    }

    if (item[1] && item[1].length > 0 && Array.isArray(item[1])) {
      node.children = convertToTreeData(item[1], currentPath);
    }
    return node;
  });
}

onMounted(() => {
  getTreeData();
});
</script>

<style scoped>
.card-item {
  min-height: 200px;
  text-align: left;
}
.card-item h2 {
  font-weight: normal;
  font-size: 16px;
  padding: 0;
  margin: 0;
}
.choose-ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.choose-ul li {
  display: inline-block;
}
.img-item {
  width: 200px;
  height: 200px;
  margin: 10px;
  border-radius: 4px;
}
h2 {
  font-size: 16px;
  font-weight: normal;
  padding: 0;
  margin: 0;
  line-height: 32px;
}
.card-left {
  display: inline-block;
  vertical-align: top;
  width: 400px;
  height: 500px;
  background-color: aliceblue;
  padding: 10px;
}
.card-right {
  display: inline-block;
  vertical-align: top;
  width: 718px;
  height: 500px;
  margin-left: 10px;
  background-color: aliceblue;
  padding: 10px;
}
.card-item-1 {
  background-color: aliceblue;
  margin: 10px 0;
  padding: 10px;
}
.choose-img {
  width: 100%;
  border-radius: 4px;
}
.btn-line {
  margin-top: 10px;
}
.tag-item {
  margin-right: 10px;
}
</style>
