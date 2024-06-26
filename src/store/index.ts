// 1.定义状态容器和状态
// 2.修改容器中的state
// 3.仓库中的actions的使用
import { defineStore } from 'pinia'

export const mainStore = defineStore('main', {
  state: () => { 
    // 定义状态
    return {
      currentTime:'2023-03-21',
    }
  },
  getters: {

  }, // 监测状态 相当于 computed 计算属性
  actions: {

  } // 操作 相当于 methods 
})