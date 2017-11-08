<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <router-link to="/site/member/center">会员中心</router-link>&gt;
                <router-link to="/site/member/orderlist">我的订单</router-link>
            </div>
        </div>
        <div class="section clearfix">
            <!--页面左边-->
            <div class="left-260">
                <div class="bg-wrap">
                    <div class="avatar-box">
                        <a class="img-box" href="/user/center/avatar.html">
                
                    <i class="iconfont icon-user-full"></i>                
                </a>
                        <h3>

                            ivanyb

                        </h3>
                        <p><b>注册会员</b></p>
                    </div>

                    <div class="center-nav">
                        <ul>
                            <li>
                                <h2>
                                    <i class="iconfont icon-order"></i>
                                    <span>订单管理</span>
                                </h2>
                                <div class="list">
                                    <p>
                                        <router-link to="/site/member/orderlist"><i class="iconfont icon-arrow-right"></i>交易订单</router-link>
                                    </p>
                                </div>
                            </li>
                            <li>
                                <h2>
                                    <i class="iconfont icon-user"></i>
                                    <span>账户管理</span>
                                </h2>
                                <div class="list">
                                    <p>
                                        <router-link to="/site/member/center"><i class="iconfont icon-arrow-right"></i>账户资料</router-link>
                                    </p>
                                    <p>
                                        <router-link to="/site/member/center"><i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置</router-link>
                                    </p>
                                    <p>
                                        <router-link to="/site/member/center"><i class="iconfont icon-arrow-right"></i>修改密码</router-link>
                                    </p>
                                    <p><a href="javascript:void(0)" @click="logout"><i class="iconfont icon-arrow-right"></i>退出登录</a></p>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
            <!--/页面左边-->

            <!--页面左边-->
            <div class="right-auto">
                <div class="bg-wrap" style="min-height:765px;">
                    <div class="sub-tit">
                        <a class="add" href="javascript:void(0)" @click="back"><i class="iconfont icon-reply"></i>返回</a>
                        <ul>
                            <li class="selected">
                                <a href="javascript:;">查看订单</a>
                            </li>
                        </ul>
                    </div>


                    <!--订单进度-->
                    <div v-if="orderinfo.status!==5" class="order-progress">
                        <ul>
                            <!--下单-->
                            <li class="first active">
                                <div class="progress">下单</div>
                                <div class="info">{{orderinfo.add_time | datefmt('YYYY-MM-DD HH:MM:ss')}}</div>
                            </li>
                            <!--/下单-->

                            <!--付款-->
                            <li v-bind="{class:orderinfo.status>=2?'active':''}">
                                <div class="progress">已付款</div>
                                <div class="info">{{orderinfo.payment_time | datefmt('YYYY-MM-DD HH:MM:ss')}}</div>
                            </li>
                            <!--/付款-->
                            <!--发货-->

                            <li v-bind="{class:orderinfo.status>=3?'active':''}">
                                <div class="progress">已经发货</div>
                                <div class="info">{{orderinfo.express_time | datefmt('YYYY-MM-DD HH:MM:ss')}}</div>
                            </li>
                            <!--/发货-->

                            <!--完成-->
                            <li v-bind="{class:orderinfo.status>=4?'last active':'last'}">
                                <div class="progress">已完成</div>
                                <div class="info">{{orderinfo.complete_time | datefmt('YYYY-MM-DD HH:MM:ss')}}</div>
                            </li>
                            <!--/完成-->
                        </ul>
                    </div>
                    <!--/订单进度-->


                    <!--订单概述-->
                    <div class="form-box accept-box form-box1">
                        <dl class="head form-group">
                            <dd>
                                订单号：{{orderinfo.order_no}}

                                <!--<a class="btn-pay" href="/payment.html?action=confirm&amp;order_no=B17092616154914">去付款</a>-->
                                <router-link class="btn-pay" v-if="(orderinfo.status<=1)"
                                 v-bind="{to:'/site/goods/payment/'+orderinfo.id}">去付款</router-link>

                                 <a class="btn-pay" href="javascript:void(0)" v-if="(orderinfo.status==3)"
                                  @click="complate(orderinfo.id)">签收</a>
                            </dd>
                        </dl>
                        <dl class="form-group">
                            <dt>订单状态：</dt>
                            <dd>
                                {{orderinfo.statusName}}
                            </dd>
                        </dl>
                         <dl class="form-group">
                            <dt>快递单号：</dt>
                            <dd>
                                {{orderinfo.express_no}}
                            </dd>
                        </dl>

                        <dl class="form-group">
                            <dt>支付方式：</dt>
                            <dd>支付宝</dd>
                        </dl>

                    </div>
                    <!--/订单概述-->

                    <!--商品列表-->
                    <div class="table-wrap">
                        <table width="100%" border="0" cellspacing="0" cellpadding="5" class="ftable">
                            <tbody>
                                <tr>
                                    <th align="left" colspan="2">商品信息</th>
                                     <th width="10%">名称</th>
                                    <th width="10%">单价
                                    </th>
                                   
                                    <th width="10%">数量</th>
                                    <th width="10%">金额</th>
                                    
                                </tr>

                                <tr v-for="item in goodslist" :key="item.id">
                                    <td width="60">                                     
                                     <img :src="item.imgurl" class="img">                           
                                    </td>
                                    <td align="left">
                                        <a target="_blank" href="/goods/show-92.html">{{item.goods_title}}</a>
                                    </td>
                                    <td align="center">
                                        <s>￥{{item.goods_price}}</s>
                                        <p>￥{{item.real_price}}</p>
                                    </td>                                   
                                    <td align="center">{{item.quantity}}</td>
                                    <td align="center">￥{{item.quantity * item.real_price }}</td>                                   
                                </tr>

                                <tr>
                                    <td colspan="7" align="right">
                                        <p>商品金额：<b class="red">￥{{orderinfo.payable_amount}}</b>&nbsp;&nbsp;+&nbsp;&nbsp;运费：<b class="red">￥{{orderinfo.express_fee}}</b>
                                          </p>
                                        <p style="font-size:22px;">应付总金额：<b class="red">￥{{orderinfo.order_amount}}</b></p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->

                    <!--收货信息-->
                    <div class="form-box accept-box">
                        <dl class="head form-group">
                            <dd>收货信息</dd>
                        </dl>
                        <dl class="form-group">
                            <dt>顾客姓名：</dt>
                            <dd>{{orderinfo.accept_name}}</dd>
                        </dl>
                        <dl class="form-group">
                            <dt>送货地址：</dt>
                            <dd>{{orderinfo.area}} {{orderinfo.address}} </dd>
                        </dl>
                        <dl class="form-group">
                            <dt>联系电话：</dt>
                            <dd>{{orderinfo.mobile}} </dd>
                        </dl>
                        <dl class="form-group">
                            <dt>电子邮箱：</dt>
                            <dd>{{orderinfo.email}} </dd>
                        </dl>
                        <dl class="form-group">
                            <dt>备注留言：</dt>
                            <dd>{{orderinfo.message}}</dd>
                        </dl>
                       

                    </div>
                    <!--/收货信息-->

                </div>
            </div>
            <!--/页面左边-->
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                orderinfo:{},
                goodslist:[]
            }
        },
        methods: {
            back(){
                this.$router.go(-1);
            },
            complate(orderid){
                 this.$http.get('/site/validate/order/complate/'+orderid)
                .then(res=>{
                    if(res.data.status ==1){
                        this.$message.error(res.data.message);
                        return;
                    }
                   this.getorderdetial();
                });

            },
            logout(){
                this.$store.dispatch(this.$store.state.global.isloginedFlag,0);
                this.$router.push({name:'login'});
            },
            getorderdetial(){
                this.$http.get('/site/validate/order/getorderdetial/'+this.$route.params.orderid)
                .then(res=>{
                    if(res.data.status ==1){
                        this.$message.error(res.data.message);
                        return;
                    }
                   this.orderinfo = res.data.message.orderinfo;
                   this.goodslist = res.data.message.goodslist;
                });
            }
        },
        created(){
            this.getorderdetial();
        }
    }

</script>

<style scoped>

</style>