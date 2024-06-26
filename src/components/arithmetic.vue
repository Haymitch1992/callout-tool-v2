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
}
.chose-ul li:hover {
  border: 1px solid #409eff;
}
</style>
