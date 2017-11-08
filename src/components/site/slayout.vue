<template>
    <div class="slayout">
        <div class="top">
            <el-row>
                <el-col :span="24">
                    <!--头部加菜单-->
                    <div id="header" class="header">
                        <div class="head-top">
                            <div class="section">
                                <div class="left-box">
                                    <span>知识分享，在于点滴，vuejs+axios+vuex+elementUI实现的单页应用程序</span>
                                    <a target="_blank" href="#"></a>
                                    <a target="_blank" href="#"></a>
                                </div>

                                <div id="menu" class="right-box">
                                    <span v-show="islogined==0">
                                        <router-link to="/site/account/login">登录</router-link><strong>|</strong>
                                        <router-link to="/site/account/register">注册</router-link><strong>|</strong>
                                    </span>
                                     <span v-show="islogined==1">
                                        <router-link to="/site/member/center">会员中心</router-link><strong>|</strong>
                                        <a @click="logout">退出</a><strong>|</strong>
                                    </span>
                                    <router-link to="/site/goods/car">
                                        <i class="iconfont icon-cart"></i>购物车(
                                        <span id="shoppingCartCount">
                                            <span v-show="buycount>0">{{buycount}}</span>
                                        <!--<span v-show="dbuycount>0">{{dbuycount}}</span>-->
                                        </span>)</router-link>
                                </div>

                            </div>
                        </div>
                        <div class="head-nav">
                            <div class="section">
                                <!--菜单-->
                                <div id="menu2" class="nav-box menuhd">
                                    <ul>
                                        <li class="index">
                                            <router-link to="/site/home/list" href="#">首页</router-link>
                                        </li>
                                        <li class="news">
                                            <router-link to="/site/question/list">学员问题汇总</router-link>
                                        </li>
                                        <li class="photo">
                                            <router-link to="/site/point/list">重难点专区</router-link>
                                        </li>
                                        <li class="video">
                                            <router-link to="/site/common/list">前端常用功能</router-link>
                                        </li>
                                        <li class="down">
                                            <router-link to="/site/down/list">资源下载</router-link>
                                        </li>
                                        <li class="goods">
                                            <router-link to="/site/goods/list">购物商城</router-link>
                                        </li>
                                    </ul>
                                </div>
                                <!--搜索-->
                                <div class="search-box">
                                    <div class="input-box">
                                        <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech=""
                                        />
                                    </div>
                                    <a href="javascript:;">
                            <i class="iconfont icon-search"></i>
                        </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>

        <div class="center">
            <el-row>
                <el-col :span="24">
                    <!--<transition name="show">
                     <router-view class="routeanimate"></router-view>
                    </transition>-->
                    <div class="comp">
                        <router-view class="routeanimate"></router-view>
                    </div>
                    <!--路由占位符-->
                    <!--<contentslidtophot title="资源下载" tablename="down"></contentslidtophot>

                    <categroupcontent v-for="item in datas" :datas="item"></categroupcontent>-->
                </el-col>
            </el-row>

        </div>

        <div class="bottom">
            <el-row>
                <el-col :span="24">
                    bottom
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
    // import '../../../statics/site/js/jquery.flexslider-min.js';
    // import '../../../statics/site/js/jqslider.js';
    // 实现菜单动画
    $(function () {
        $("#menu2 li a").wrapInner('<span class="out"></span>');
        $("#menu2 li a").each(function () {
            $('<span class="over">' + $(this).text() + '</span>').appendTo(this);
        });

        $("#menu2 li a").hover(function () {
            $(".out", this).stop().animate({ 'top': '48px' }, 300); // move down - hide
            $(".over", this).stop().animate({ 'top': '0px' }, 300); // move down - show

        }, function () {
            $(".out", this).stop().animate({ 'top': '0px' }, 300); // move up - show
            $(".over", this).stop().animate({ 'top': '-48px' }, 300); // move up - hide
        });

        // // 实现轮播图自动滚动
        // $("#slide-box").jqslider(); //初始化幻灯片
        // $("#focus-box").flexslider({
        //     directionNav: false,
        //     pauseOnAction: false
        // });
    });



    export default {
        data() {
            return {                
                dbuycount: 0
            }
        },
        computed: {
            buycount() {
                //   this.$store.getters.getCarGoodsCount;
                // console.log( this.$store.getters.getCarGoodsCount);
                let count = this.$store.getters.getCarGoodsCount;
                // let goodsObj =this.$store.state.shopcar.carGoodsObj;
                // let arr = this.$store.state.shopcar.goodslist;     

                // for(let key in goodsObj){                 
                //     count+=goodsObj[key];
                // }
                this.dbuycount = 0;
                return count;
            },
            islogined(){
                var s = this.$store.state.islogined;
                console.log('this.$store.getters.islogined='+this.$store.getters.islogined);
                var islogin = this.$store.getters.islogined;
                return  islogin?islogin:0;
            }
        },
        methods:{
            logout(){               
                 this.$store.dispatch(this.$store.state.global.isloginedFlag,0);
                 this.$router.push({name:'login'});
            }
        },
        created() {
            // console.log(this.$store.state.shopcar.storageKey);
            this.$nextTick(() => {
                var obj = JSON.parse(localStorage.getItem(this.$store.state.shopcar.storageKey)) || {};
                var count = 0;
                for (let key in obj) {
                    count += obj[key];
                }
                this.dbuycount = count;
                // console.log(this.dbuycount);

            });
        }     
    }

</script>

<style scoped>
    @import '../../../statics/site/css/style.css';

    .comp {
        min-height: 800px;
    }

    .show-leave-active,
    .show-enter-active {
        transition: all .2s linear;
    }

    .show-enter,
    .show-leave-to {
        opacity: 0;
    }

    .show-enter-to,
    .show-leave {
        opacity: 0;
    }
</style>