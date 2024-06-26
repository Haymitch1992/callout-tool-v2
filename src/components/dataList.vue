<script setup>
import { reactive, ref, onMounted } from 'vue';
import { getFoldersList, getParesData } from '../api/base';
import uploadItem from './fileUpload2.vue';
import { ElMessage } from 'element-plus';
const getInfo = () => {
  getFoldersList().then((res) => {
    console.log(res);
    tableData.value = res.data.folders_list;
  });
};

const sendParesData = (obj) => {
  //子文件夹名称
  getParesData({
    camera_cab: JSON.stringify(obj.child_directory),
    folder_name: obj.folder_name,
  }).then((res) => {
    ElMessage({
      message: '请求发送成功',
      type: 'success',
    });
  });
};

onMounted(() => {
  getInfo();
});

const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    status: '已解析',
    id: 1,
    file: 'camera_cab',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    status: '未解析',
    id: 2,
    file: 'camera_cab',
  },
]);
const pageData = reactive({
  size: 100,
  currentPage: 1,
  total: 1000,
});
const handleSizeChange = (val) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`);
};
</script>
<template>
  <div>
    <upload-item @updateFileList="getInfo()"></upload-item>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="ID" type="index" />
      <el-table-column prop="folder_name" label="文件夹名称" />
      <el-table-column prop="child_directory" label="子目录" />
      <el-table-column prop="file_status" label="状态" />
      <el-table-column prop="address" label="操作">
        <template #default="scope">
          <el-button
            link
            :disabled="scope.row.file_status === '已解析'"
            type="primary"
            size="small"
            @click="sendParesData(scope.row)"
          >
            <!-- {{ scope.row.child_directory }} -->
            解析
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="false"
      class="pagination-item"
      background
      v-model:current-page="pageData.currentPage"
      :page-size="pageData.size"
      :small="small"
      layout="total, prev, pager, next"
      :total="pageData.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped>
.pagination-item {
  padding-top: 20px;
}
</style>
