<template>
  <div
    ref="threeContainer"
    style="width: 720px; height: 400px; overflow: hidden; margin-bottom: 10px"
  ></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import * as THREE from 'three';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // 引入OrbitControls
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
const threeContainer = ref(null);

const props = defineProps({
  pcdPath: {
    type: String,
    required: true,
  },
});

// 监听 pcdPath 的变化  重新加载点云数据
watch(
  () => props.pcdPath,
  (newValue, oldValue) => {
    console.log(newValue, oldValue, '监听传递参数的变化');
    init();
  },
  { deep: true }
);

const init = () => {
  const scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0x999999)); // 添加环境光
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  threeContainer.value.appendChild(renderer.domElement);

  camera.position.z = 5;

  // 创建OrbitControls实例
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener('change', render); // 当控制器变动时，触发渲染

  const loader = new PCDLoader();
  loader.load(
    //
    ///sensors_data/res_file/20240606_100024_abc.zip/test/camcalib/2024-01-23-16-09-01/lidar_pcd_file/pcl_1705997343996109590.pcd
    // '/sensors_data/res_file/20240606_103020_abc.zip/test/indoor/2024-01-23-16-38-28/lidar_pcd_file/pcl_1705999108629319463.pcd',
    `/sensors_data/res_file/${props.pcdPath}`,
    function (points) {
      points.material.size = 0.01;
      scene.add(points);
      animate();

      const gui = new GUI();

      gui.add(points.material, 'size', 0.001, 0.01).onChange(render);
      gui.addColor(points.material, 'color').onChange(render);
      gui.open();
    }
  );

  function animate() {
    requestAnimationFrame(animate);
    controls.update(); // 仅当使用 damping 或者 autoRotate 时需要
    renderer.render(scene, camera);
  }

  function render() {
    renderer.render(scene, camera);
  }
};

onMounted(() => {
  init();
});
</script>
