import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vReveal } from './composables/useReveal'
import './style.css'

const app = createApp(App)

// 全局动效指令（视差杂志版：仅 reveal；tilt 已按风格删除）
app.directive('reveal', vReveal)

app.use(router)
app.mount('#app')
