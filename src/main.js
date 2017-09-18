// 1.0 导入vue核心包
import Vue from 'vue';
// Vue.config.debug = true;
// 导入axios来替代vue-resource进行ajax请求
import axios from 'axios';
// 全局请求的基本url
Vue.prototype.dataAPI = axios.defaults.baseURL = 'http://127.0.0.1:8899';
//post请求内容类型
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// withCredentials配置为true表示在ajax请求中携带cookie信息，默认是false
axios.defaults.withCredentials=true;

Vue.prototype.$http = axios;

// 导入elementui
import ElementUI from 'element-ui';
// import '../statics/theme_rms/index.css';
Vue.use(ElementUI);

// 美观的滚动条组件
import EasyScroll from 'easyscroll';
Vue.use(EasyScroll);

// 2.0 导入App.vue的vue对象
import App from './App.vue'; 

// 导入网站前台组件
import slayout from './components/site/slayout.vue';

// 导入功能组件
import questionlist from './components/site/question/list.vue';
import pointlist from './components/site/point/list.vue';
import homelist from './components/site/home/list.vue';
import downlist from './components/site/down/list.vue';
import commonlist from './components/site/common/list.vue';
import goodslist from './components/site/goods/goodslist.vue';
import goodsmore from './components/site/goods/goodsmore.vue';

// 3.0 将vue-router集成到这个项目中来
import vueRouter from 'vue-router';
// 3.0.1 将vueRouter对象绑定到Vue对象上
Vue.use(vueRouter);

import store from './stores/index.js';

// 3.0.2 定义路由规则
var router = new vueRouter({
	linkActiveClass :'',
	routes:[		
		// {name:'login',path:'/admin/login',component:login,meta:{nologin:true}},  //登录组件
		{path:'/',redirect:'/site/home/list'},
		{
			path:'/site',
			component:slayout,
			children:[
				// {name:'questionarticlelist',path:'questionarticlelist/',component:questionarticlelist, meta: { menuno:'1-1'}},  //TODO:注意 articlelist/ 后面写上 / 才生效
				{name:'questionlist',path:'question/list/',component:questionlist},
				{name:'pointlist',path:'point/list/',component:pointlist},
				{name:'homelist',path:'home/list/',component:homelist},
				{name:'downlist',path:'down/list/',component:downlist},
				{name:'commonlist',path:'common/list/',component:commonlist},
				{name:'goodslist',path:'goods/list/',component:goodslist},  //商品首页列表组件
				{name:'goodsmore',path:'goods/more/:id',component:goodsmore}  //商品更多分类搜索列表页面
			]
		}		
	]
	});

// 路由钩子,实现菜单的改变给全局变量赋值
router.beforeEach((to, from, next) => {
	next();
	// console.log('meta.menuno='+to.meta.menuno);
	if (to.meta.menuno) {
	
		//  store.dispatch(store.state.global.ChangeMenuActiveNoFlag,to.meta.menuno);
		
	}

	// 检查登录
	// if(!to.meta.nologin){//如果路由元数据中没有设置nologin:true则表示要检查登录
	// 	axios.get('/admin/account/islogin').then(res=>{		
	// 		if(res.data.code =='nologin'){				
	// 			router.push({name:'login'});				
	// 		}
	// 		if(res.data.code =='logined'){
	// 			 next();
	// 		}
	// 	});
	// }else{
	// 	next();
	// }

	
});

// 全局过滤器
import moment from 'moment';
Vue.filter('datefmt',(input,fmtstring)=>{
	return moment(input).format(fmtstring);
});

// 4.0 注册mint-ui
// 导入mint-ui的css文件
// import 'mint-ui/lib/style.min.css';
// // 导入mint-ui组件对象
// import mintui from 'mint-ui';
// 在Vue中全局使用mintui
// Vue.use(mintui);

// 5.0 注册mui的css样式
// import '../statics/mui/css/mui.css';
// import '../statics/css/site.css';

// 5.0 利用Vue对象进行解析渲染
new Vue({
	el:'#app',
	// 使用路由对象实例
	router:router,
	store,
	// render:function(create){create(App)} //es5的写法
	render:c=>c(App)  // es6的函数写法 =>：goes to
});