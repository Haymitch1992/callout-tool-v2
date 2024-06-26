<template>
  <div
    ref="threeContainer"
    style="width: 1148px; height: 100vh; overflow: hidden"
  ></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; // 引入OrbitControls
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const threeContainer = ref(null);
onMounted(() => {
  let camera, scene, renderer;

  init();
  render();
  function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    threeContainer.value.appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      0.01,
      40
    );
    camera.position.set(0, 0, 1);
    scene.add(camera);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render); // use if there is no animation loop
    controls.minDistance = 0.5;
    controls.maxDistance = 10;

    //scene.add( new THREE.AxesHelper( 1 ) );

    const loader = new PCDLoader();
    loader.load('/111.pcd', function (points) {
      points.geometry.center();
      points.geometry.rotateX(Math.PI);
      // points.name = 'Zaghetto.pcd';
      scene.add(points);
      animate();
      //

      const gui = new GUI();

      gui.add(points.material, 'size', 0.001, 0.01).onChange(render);
      gui.addColor(points.material, 'color').onChange(render);
      gui.open();

      render();
    });

    window.addEventListener('resize', onWindowResize);
  }

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();
  }
  function animate() {
    requestAnimationFrame(animate);
    controls.update(); // 仅当使用 damping 或者 autoRotate 时需要
    renderer.render(scene, camera);
  }
  function render() {
    renderer.render(scene, camera);
  }
});
</script>
