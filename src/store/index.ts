// 1.定义状态容器和状态
// 2.修改容器中的state
// 3.仓库中的actions的使用
import { defineStore } from 'pinia'

export const mainStore = defineStore('main', {
  state: () => { 
    // 定义状态
    return {
      // 内参
      ret: '',
      mtx: '',
      dist:'',
      // 棋盘格路径
      camera_cab_path: '',
      // 标定图像路径
      calibration_image_path: '',
      // 点云路径
      pcd_file_path: '',
      cab_image_path: '',
      extrinsic_value:''
      
    }
  },
  getters: {

  }, // 监测状态 相当于 computed 计算属性
  actions: {

  } // 操作 相当于 methods 
})