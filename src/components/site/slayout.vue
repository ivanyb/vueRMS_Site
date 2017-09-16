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
                                    <span>知识分享，在于点滴</span>
                                    <a target="_blank" href="#"></a>
                                    <a target="_blank" href="#"></a>
                                </div>
                              
                                <div id="menu" class="right-box">
                                    <a href="/login.html">登录</a>
                                    <a href="/register.html">注册</a><strong>|</strong>                                   
                            </div> 
                            </div>
                        </div>
                        <div class="head-nav">
                            <div class="section">
                    <!--菜单-->
                    <div id="menu2" class="nav-box menuhd">
                        <ul>
                            <li class="index"><a href="#">首页</a></li>
                            <li class="news"><router-link to="/site/question/list">学员问题汇总</router-link></li>
                            <li class="photo"><router-link to="/site/point/list">重难点专区</router-link></li>           
                            <li class="video"><router-link to="/site/common/list">前端常用功能</router-link></li>
                            <li class="down"><router-link to="/site/down/list">资源下载</router-link></li>      
                            <li class="goods"><a href="#">购物商城</a></li>                 
                        </ul>
                    </div>
                    <!--搜索-->
                    <div class="search-box">
                        <div class="input-box">
                            <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech="" />
                        </div>
                        <a href="javascript:;" >
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

     $(function() {
        $("#menu2 li a").wrapInner('<span class="out"></span>');
        $("#menu2 li a").each(function() {
            $('<span class="over">' + $(this).text() + '</span>').appendTo(this);
        });

        $("#menu2 li a").hover(function() {
            $(".out", this).stop().animate({ 'top': '48px' }, 300); // move down - hide
            $(".over", this).stop().animate({ 'top': '0px' }, 300); // move down - show

        }, function() {
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
        
    }

</script>

<style scoped>
  @import '../../../statics/site/css/style.css';

.comp{
    min-height: 800px;
}

.show-leave-active,.show-enter-active  {  
  transition: all .2s linear;
}  
.show-enter, .show-leave-to { 
  opacity: 0;
}  
.show-enter-to, .show-leave {   
  opacity: 0;
}  
 
</style>