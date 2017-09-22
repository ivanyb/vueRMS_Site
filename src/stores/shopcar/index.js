'use strict'
// 购物车状态管理

//状态
const state = {
    // 1 枚举
    //1.1 增加商品
    addGoodsFlag : 'addGoods',
    updateGoodsFlag : 'updateGoods',
    removeGoodsFlag : 'removeGoods',
    storageKey : 'storageKey',
    //2 具体值
    // 加入购物车的商品列表
    /*
    cargoods 格式：
    {
        goodsID:商品id,    
        buyCount:购买数量
    }
    */ 
	carGoodsObj : {},
    goodslist:[],
    // goodsidList:[] //在购物车中选中的商品id
}

function hashkey(obj){
    var hskey = false;
    for(let key in obj){
        hskey = true;
        break;
    }
    return hskey;
}

const mutations = {
	// 添加商品到购物车
    addGoods(state,cardataobj){
        // 如果存在当前商品，则加值
       
        if(!hashkey(state.carGoodsObj)){
            state.carGoodsObj = JSON.parse(localStorage.getItem(state.storageKey)) || {};
        }

        if(state.carGoodsObj[cardataobj.goodsID]){
           state.carGoodsObj[cardataobj.goodsID] = state.carGoodsObj[cardataobj.goodsID] +  cardataobj.buyCount;
          
     }else{
            // 如果商品在购买的商品中不存在，则加入
            state.carGoodsObj[cardataobj.goodsID] = cardataobj.buyCount;
          }
        state.goodslist.push(cardataobj);
        state.goodslist.pop();

        localStorage.setItem(state.storageKey,JSON.stringify(state.carGoodsObj));
    },

    // 修改购物车中购买的商品数量
    updateGoods(state,cardataobj){    
         if(!hashkey(state.carGoodsObj)){
            state.carGoodsObj = JSON.parse(localStorage.getItem(state.storageKey))  || {};
        }

        if(state.carGoodsObj[cardataobj.goodsID]){
            state.carGoodsObj[cardataobj.goodsID] +=  cardataobj.buyCount;

            localStorage.setItem(state.storageKey,JSON.stringify(state.carGoodsObj));
        }
       state.goodslist.push(cardataobj);
        state.goodslist.pop();
    },
    
    // 删除购物车中的商品
    removeGoods(state,cardataobj){   
         if(!hashkey(state.carGoodsObj)){
            state.carGoodsObj = JSON.parse(localStorage.getItem(state.storageKey)) || {};
        }

        if(state.carGoodsObj[cardataobj.goodsID]){
           delete state.carGoodsObj[cardataobj.goodsID];
            localStorage.setItem(state.storageKey,JSON.stringify(state.carGoodsObj));
        }
        state.goodslist.push(cardataobj);
        state.goodslist.pop();
    }
}

const actions = {
	addGoods({commit},cardataobj){
		commit(state.addGoodsFlag,cardataobj);
	},
    updateGoods({commit},cardataobj){
		commit(state.updateGoodsFlag,cardataobj);
	},
    removeGoods({commit},cardataobj){
		commit(state.removeGoodsFlag,cardataobj);
	}
}

/* 注意：在调用的时候请使用属性方式调用
正确：
 this.$store.getters.getCarGoodsCount
 错误：
  this.$store.getters.getCarGoodsCount();

 注意！注意！注意！
  getters中的方法类似于计算属性，一定要 依赖于goodslist，当goodslist发生改变才会被触发计算
 */
const getters = {
    getgoodsids:state => {
        // 类似于计算属性， 依赖于goodslist，当goodslist发生改变才会被触发计算
        var arr = state.goodslist;
        var obj = JSON.parse(localStorage.getItem(state.storageKey)) || {};
        // if(!obj)
        // {
        //    obj = JSON.parse(localStorage.getItem(state.storageKey)) || {};
        // }

        var ids = "0,";
         for(let key in obj){
           ids+=key+",";
        }

		return ids+'0';
	},
	getCarGoods:state => {
        // 类似于计算属性， 依赖于goodslist，当goodslist发生改变才会被触发计算
        var arr = state.goodslist;
         var obj = JSON.parse(localStorage.getItem(state.storageKey)) || {};
        // if(!obj)
        // {
        //    obj = JSON.parse(localStorage.getItem(state.storageKey)) || {};
        // }
		return obj;
	},
    getCarGoodsCount:state => {
        // 注意：========》类似于计算属性， 依赖于goodslist，当goodslist发生改变才会被触发计算
        var arr = state.goodslist;
        let count = 0;
        var obj = JSON.parse(localStorage.getItem(state.storageKey)) || {};
        // if(!obj)
        // {
        //    obj = JSON.parse(localStorage.getItem(state.storageKey)) || {};
        // }

        for(let key in obj){
            count+=obj[key];
        }
        return count;
    }
}

export default {
	state,mutations,actions,getters
};