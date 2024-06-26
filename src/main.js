import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import uploader from 'vue-simple-uploader'
import 'vue-simple-uploader/dist/style.css'
import App from './App.vue'


const pinia = createPinia()
const app = createApp(App)
app.use(pinia).use(ElementPlus).use(uploader);
app.mount('#app')
