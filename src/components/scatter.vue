<!-- 散点图 -->
<script setup lang="ts">
import { reactive, Ref, ref, onMounted, watch, getCurrentInstance } from 'vue';
import * as echarts from 'echarts';
import 'echarts-gl';

const props = defineProps({
  yObj: {
    type: Object,
    required: true,
  },
});

const echartsData = reactive({
  xValue: [],
  yValue: [],
  colorList: [],
});

watch(
  () => props.yObj,
  (newValue, oldValue) => {
    console.log(newValue, oldValue, '监听传递参数的变化');
    initEcharts();
  },
  { deep: true }
);

// 数据发生变化 重新绘制图表
const echartResize = () => {
  console.log('重新渲染图表');
};
defineExpose({
  echartResize,
});
const colorObj =
  getCurrentInstance()?.appContext.config.globalProperties.$colorObj;

const arr = ref([]);

const initEcharts = () => {
  const myEcharts = echarts.init(myChart.value);
  arr.value = [];
  var option;
  option = {
    grid3D: {},
    xAxis3D: {
      type: 'category',
    },
    yAxis3D: {},
    zAxis3D: {},
    dataset: {
      dimensions: [
        'Income',
        'Life Expectancy',
        'Population',
        'Country',
        { name: 'Year', type: 'ordinal' },
      ],
      source: [],
    },
    series: [
      {
        type: 'scatter3D',
        symbolSize: 5,
        encode: {
          x: 'Country',
          y: 'Life Expectancy',
          z: 'Income',
          tooltip: [0, 1, 2, 3, 4],
        },
      },
    ],
  };
  option && myEcharts.setOption(option);
};

const myChart: Ref<HTMLElement | any> = ref(null);
onMounted(() => {
  initEcharts();
  // echart 初始化 需要 原生 DOM 对象
});
</script>

<template>
  <div class="container">
    <div class="panel" ref="myChart" id="panel"></div>
  </div>
</template>

<style scoped>
.panel {
  width: 800px;
  height: 800px;
  display: block;
  margin: 0 auto;
  text-align: center;
}
</style>
