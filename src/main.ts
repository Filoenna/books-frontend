import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

//UIkit imports
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import 'uikit/dist/css/uikit.min.css';

UIkit.use(Icons);
window.UIkit = UIkit;

const app = createApp(App)

app.use(router)
app.mount('#app')
