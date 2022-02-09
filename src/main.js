// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import './assets/base.css'
import axios from 'axios'
import Http from './http/axios.js'

Vue.use(ElementUI);
Vue.use(Http);


Vue.config.productionTip = false
// Vue.prototype.$http = axios
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})
