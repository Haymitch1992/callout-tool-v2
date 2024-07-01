import {request,METHOD} from '../utils/request.js'

// 数据列表
export async function getFoldersList(loginForm:any) { 
  return request('/callout/sensors_data/data_folders_list/',METHOD.GET,loginForm)
}
// 解析数据
export async function getParesData(loginForm:any) { 
  return request('/callout/sensors_data/pares_data/',METHOD.GET,loginForm)
}
// 块文件上传
export async function POST_UPLOAD_FILE(loginForm:any) { 
  return request('/callout/sensors_data/pares_data/',METHOD.POST,loginForm)
}
// 合并上传
export async function POST_JOIN_FILE(loginForm:any) { 
  return request('/callout/sensors_data/join_file/',METHOD.POST,loginForm)
}


// 树结构配置
export async function getFiles(loginForm:any) { 
  return request('/callout/sensors_data/get_files/',METHOD.GET,loginForm)
}
// 获取点云数据
export async function getResPcd(loginForm:any) { 
  return request('/callout/sensors_data/res_pcd',METHOD.GET,loginForm)
}
// 生成内参
export async function getIntrinsic(loginForm:any) { 
  return request('/callout/sensors_data/intrinsic_value/',METHOD.GET,loginForm)
}

// 生成外参/
export async function postSelect_type(loginForm:any) { 
  return request('/callout/sensors_data/select_type/',METHOD.POST,loginForm)
}

// 查询生成状态
export async function getStatus(loginForm:any) { 
  return request('/callout/sensors_data/get_message/',METHOD.GET,loginForm)
}
