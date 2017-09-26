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

                    <!--交易订单-->
                    <div class="sub-tit">
                        <!--<a class="add" href="javascript:history.go(-1);"><i class="iconfont icon-reply"></i>返回</a>-->
                        <ul>
                            <li class="selected">
                                <a href="/user/order-list.html">交易订单</a>
                            </li>
                        </ul>
                    </div>

                    <div class="table-wrap">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
                            <tbody>
                                <tr>
                                    <th width="16%" align="left">订单号</th>                                   
                                    <th width="10%">姓名</th>
                                    <th width="12%">订单金额</th>
                                    <th width="11%">下单时间</th>
                                    <th width="10%">状态</th>
                                    <th width="12%">操作</th>
                                </tr>
                                <!--取得一个DataTable-->
                                <!--取得分页页码列表-->

                                <tr v-for="item in orderlist" :key="item.id">
                                    <td>{{item.order_no}}</td>                                   
                                    <td align="left">{{item.accept_name}}</td>
                                    <td align="left"><strong style="color:red;">￥{{item.order_amount}}</strong><br>
                                    {{item.paymentTitle}}</td>
                                    <td align="left">{{item.add_time | datefmt('YYYY-MM-DD HH:MM:ss')}}</td>
                                    <td align="left">
                                        {{item.statusName}}
                                    </td>
                                    <td align="left">
                                        <router-link v-bind="{to:'/site/member/orderinfo/'+item.id}">查看订单</router-link><br>
                                        <router-link v-if="(item.status<=1)" v-bind="{to:'/site/goods/payment/'+item.id}">|去付款</router-link><br>
                                        <a v-if="(item.status<=1)" href="javascript:void(0)" @click="cancelorder(item.id)">|取消</a><br>
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                        <div class="page-foot">
                            <div class="flickr right">
                                <el-pagination @size-change="handleSizeChange"
                                 @current-change="handleCurrentChange" :current-page="pageIndex"
                                 :page-sizes="[1,10, 20, 30, 50]"
                                    :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" 
                                    :total="totalCount">
                                </el-pagination>
                            </div>
                            <!--放置页码列表-->
                        </div>
                    </div>
                    <!--/交易订单-->



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
                totalCount:0,
                pageIndex:1,
                pageSize:10,
                orderlist:[]
            }
        },
        methods: {
            cancelorder(orderid){
                this.$http.get('/site/validate/order/cancelorder/'+orderid)
                .then(res=>{
                    if(res.data.status ==1){
                        this.$message.error(res.data.message);
                        return;
                    }
                   this.getorderlist();
                });
            },
             logout(){
                this.$store.dispatch(this.$store.state.global.isloginedFlag,0);
                this.$router.push({name:'login'});
            },
            getorderlist(){
                this.$http.get('/site/validate/order/userorderlist?pageIndex='+this.pageIndex+'&pageSize='+this.pageSize)
                .then(res=>{
                    if(res.data.status ==1){
                        this.$message.error(res.data.message);
                        return;
                    }
                    this.totalCount = res.data.totalcount;
                    this.orderlist = res.data.message;
                });
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getorderlist();
            },
            handleCurrentChange(val) {
                 this.pageIndex = val;
                this.getorderlist();
            }
        },
        created(){
            this.getorderlist();
        }
    }

</script>

<style scoped>

</style>