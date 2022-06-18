import {createApp} from 'vue'
import {createPinia} from 'pinia'
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App)
app.use(Antd)
app.use(createPinia())

app.mount('#app')
