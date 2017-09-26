<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/user/center/index.html">会员中心</a>
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
                                    <p><router-link to="/site/member/orderlist"><i class="iconfont icon-arrow-right"></i>交易订单</router-link></p>
                                </div>
                            </li>
                            <li>
                                <h2>
                                    <i class="iconfont icon-user"></i>
                                    <span>账户管理</span>
                                </h2>
                                <div class="list">                                
                                    <p><router-link to="/site/member/center"><i class="iconfont icon-arrow-right"></i>账户资料</router-link></p>
                                    <p><router-link to="/site/member/center"><i clrouter-linkss="iconfont icon-router-linkrrow-right"></i>头像设置</router-link></p>
                                    <p><router-link to="/site/member/center"><i class="iconfont icon-arrow-right"></i>修改密码</router-link></p>
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


                    <!--会员中心-->
                    <div class="sub-tit">
                        <!--<a class="add" href="javascript:history.go(-1);"><i class="iconfont icon-reply"></i>返回</a>-->
                        <ul>
                            <li class="selected">
                                <a href="javascript:;">个人中心</a>
                            </li>
                        </ul>
                    </div>

                    <div class="center-head clearfix">
                        <div class="img-box">

                            <i class="iconfont icon-user-full"></i>

                        </div>
                        <div class="list-box">
                            <h3>欢迎您~ ivanyb</h3>
                            <ul>
                                <li>组别：注册会员</li>
                                <li>手机：13987654321</li>
                               
                                <li>Email:ivanyb1@qq.com</li>
                                                               
                            </ul>
                        </div>
                    </div>
                    <div class="center-info clearfix">
                        <!--<ul>
                            <li>本次登录IP：127.0.0.1</li>
                            <li>上次登录IP：127.0.0.1</li>
                            <li>注册时间：2017/9/12 17:11:39</li>
                            <li>上次登录时间：2017/9/23 17:34:41</li>
                        </ul>-->
                    </div>

                    <div class="center-tit">
                        <span><a href="/user/order-list.html">更多..</a></span>
                        <h3><i class="iconfont icon-order"></i>我的订单</h3>
                    </div>
                    <div class="center-info clearfix">
                        <ul>
                            <li>已完成订单：0个</li>
                            <li>待完成订单：2个</li>
                        </ul>
                    </div>
                    <!--会员中心-->
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
            }
        },
        methods: {
            logout(){
                this.$store.dispatch(this.$store.state.global.isloginedFlag,0);
                this.$router.push({name:'login'});
            }
        }
    }

</script>

<style scoped>

</style>