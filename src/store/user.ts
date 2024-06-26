// 1.定义状态容器和状态
// 2.修改容器中的state
// 3.仓库中的actions的使用
import { defineStore } from 'pinia'

export const userStore = defineStore('userStore', {
  state: () => { 
    // 定义状态
    return {
      user_name: '',
      user_token:'d53b12c4-5e7d-4db8-bb0d-ae17e1b9963d', 

    }
  },
  getters: {
  }, // 监测状态 相当于 computed 计算属性
  actions: {
    
  } // 操作 相当于 methods 
})

