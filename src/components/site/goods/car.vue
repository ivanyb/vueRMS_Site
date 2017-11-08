<template>
    <div class="carlist">
        <!--面包屑导航-->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>
        <!--/面包屑导航-->

        <!--购物车列表-->
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2><i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <el-steps :space="380" :active="1" finish-status="success">
                                <el-step title="放进购物车"></el-step>
                                <el-step title="填写订单信息"></el-step>
                                <el-step title="支付/确认订单"></el-step>
                            </el-steps>                            
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--{{values}} <br>
                    {{idlist}}-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr >
                                    <th width="48" align="center">
                                       <el-switch    
                                       v-model="isSelected"
                                       @change="selectChange"                      
                                        on-text="反选"
                                        off-text="全选">
                                        </el-switch>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>  
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for="(item,index) in goodslist" :key="item.id">
                                    <td align="center">
                                       <el-switch
                                        v-model="values[index]"
                                        on-text="已选"
                                        off-text="未选"                                        
                                        >
                                        </el-switch>     
                                    </td>
                                    <td width="68">
                                        <router-link v-bind="{to:'/site/goods/info/'+item.id}">
                                        <img :src="item.img_url" class="img">
                                        </router-link>
                                    </td>
                                    <td>
                                         <router-link v-bind="{to:'/site/goods/info/'+item.id}">
                                         {{item.title}} {{item.id}}
                                         </router-link>
                                    </td>
                                    <td width="128">
                                        ￥{{item.sell_price}}
                                    </td>
                                    <td>
                                       <inputnumber :options="{goodsid:item.id,buycount:item.buycount}" v-on:val="inputNumberChange"></inputnumber>
                                    </td>
                                    <td align="center">
                                        <el-button size="small" @click="delitem(item.id)" type="error">删除</el-button>
                                    </td>
                                </tr>

                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品 <b class="red" id="totalQuantity">{{selectedCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span><b class="red" id="totalAmount">{{totalAmount}}</b>元
                                    </th>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->

                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="left-box">
                            <!--<a  href="javascript:;">全选</a>-->
                            <!--<a onclick="deleteCart('/');" href="javascript:;">清空购物车</a>-->
                        </div>
                        <div class="right-box">
                           <router-link to="/site/goods/list">
                            <button class="button" >继续购物</button>
                            </router-link>                            
                            <button class="submit" @click="setorder">下单结算</button>
                             
                        </div>
                    </div>
                    <!--购物车底部-->

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import inputnumber from '../subcom/inputnumber.vue';

    export default {
        components:{
            inputnumber
        },
        data(){
            return {
               isSelected:false,
                goodslist:[], //购物商品
                values:[], //保存商品的选中状态
                idlist:[], //保存商品id
                selectedCount:0 //选中商品数量
            }
        },
        methods:{
            // 下单结算
            setorder(){
                // 1.0 获取选中的商品id
                var ids = [];
                this.values.forEach((item,index)=>{
                    if(item){
                       ids.push(this.goodslist[index].id);
                    }
                });

                // 2.0 至少要选择一个商品
                if(ids.length <=0){
                    this.$message.error('请选择您要购买的商品');
                    return;
                }               
                
                // 3.0 导航到下单页面
                this.$router.push({name:'shopping',params:{ids:ids.join(',')}});
            },
            // 删除一条数据
            delitem(goodsid){
                // 删除goodslist数据
              var index =   this.goodslist.findIndex(val=>val.id ==goodsid );
              if(index>=0){
                   this.goodslist.splice(index,1);
                    this.values.splice(index,1);        
              }
                   
                // 删除本地存储
                this.$store.dispatch(this.$store.state.shopcar.removeGoodsFlag,{goodsID:goodsid});
            },
            // 数字组件回调
            inputNumberChange(option){
                console.log(option);
                /*
                格式：
                {
                    buycount:4
                    goodsid :92
                    type :"add"
                }
                */ 
                this.goodslist.forEach(item=>{
                    if(item.id ==option.goodsid){
                        item.buycount = option.buycount;
                    }
                })

            },
            // 全选和反选
            selectChange(isSelected){                
                this.goodslist.forEach((item,index)=>{
                        this.values[index] = isSelected;
                    });

                this.values.push(false);
                this.values.pop();
            },
            // 获取购物车中商品信息
            getgoodslist(){
                var ids = this.$store.getters.getgoodsids;
                console.log(ids);
                this.$http.get('/site/comment/getshopcargoods/'+ids)
                .then(res=>{
                    if(res.data.status == 1){
                        this.$message.error(res.data.message);
                        return;
                    }

                    // 获取加入购物车对象
                    var buyGoods = this.$store.getters.getCarGoods;

                    // 初始化每个商品的选中状态
                    res.data.message.forEach((item,index)=>{  
                        //  同步购物车当前商品购买数量
                        item.buycount = buyGoods[item.id];
                        this.values[index] = false;
                        this.idlist[index] = item.id;
                    });

                      // 赋值
                    this.goodslist = res.data.message;

                });
            }
        },
        created(){
            this.getgoodslist();
            // this.$nextTick(()=>{
            //     this.getgoodslist();
            // });            
        },
        computed:{
            totalAmount(){
                // 依赖于values的值改变而出发统计
                // 1.0 统计当前选中商品数量
                var trues = this.values.filter(item=>item==true);
                 this.selectedCount = trues.length;
                
                // 2.0 统计选中商品总价格
                var totalamount = 0;
                this.values.forEach((item,index)=>{
                    if(item){
                     var curgoods=  this.goodslist[index];
                     totalamount += (curgoods.buycount * curgoods.sell_price);
                    }
                });
                return totalamount;
            }
        }
    }

</script>

<style scoped>

</style>