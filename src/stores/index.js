import Vue from 'vue';
import vuex from 'vuex';
Vue.use(vuex);

import global from './global/index.js';
import shopcar from './shopcar/index.js';

export default new vuex.Store({
    modules:{
        global,
        shopcar
    }
});