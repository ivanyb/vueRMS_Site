
//状态
const state = {
    // 1 枚举
    //1.1 当前选中的是哪个菜单项目，调用 this.$store.global.changeMenuActiveNo()时第一个参数填写此值
    ChangeMenuActiveNoFlag : 'changeMenuActiveNo',

    //2 具体值
    // 标记当前选中的是哪个菜单
	menuActiveNo : '1-1',

	// 登录标识
	islogined:0,
	isloginedFlag:'changeIsLogined',
	isloginStorageKey:'islogin'
}

const mutations = {
	// 改变选择菜单状态
    changeMenuActiveNo(state,no){
        state.menuActiveNo = no;
    },
	 changeIsLogined(state,no){
        state.islogined = no;
		localStorage.setItem(state.isloginStorageKey,no);
    }
}

const actions = {
	changeMenuActiveNo({commit},no){
		commit(state.ChangeMenuActiveNoFlag,no);
	},
	 changeIsLogined({commit},no){
        commit(state.isloginedFlag,no);
    }
}

const getters = {
	getMenuActiveNo(){
		return state.menuActiveNo;
	},
	islogined(){
		var status = localStorage.getItem(state.isloginStorageKey);
		 if(state.islogined !==status){
			state.islogined = status;
		 }
		return status;
	}
}

export default {
	state,mutations,actions,getters
};