import './public-path' // 注入全局公共路径
import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import routes from './router'
import ElementUI from 'element-ui'
import './styles/index.scss'
Vue.use(ElementUI)

Vue.config.productionTip = false

// 1. 单例
let instance = null  // 实例

// 2. 渲染
function render(props = {}) {
  const { container, routerBase } = props
  const router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? routerBase : process.env.BASE_URL, // 集成乾坤路径及单项目路径
    mode: 'history',
    routes
  })

  instance = new Vue({
    router,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// 没有集成qiankun渲染
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}


// 3. 导出三个接口
export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}
