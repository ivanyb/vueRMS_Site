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
                                    <span>知识分享系统</span>
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
                            <li class="news"><a href="#">学员问题汇总</a></li>
                            <li class="photo"><a href="#">重难点专区</a></li>
                            <li class="goods"><a href="#">购物商城</a></li>
                            <li class="video"><a href="#">前端常用功能</a></li>
                            <li class="down"><a href="#">资源下载</a></li>                                      
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
                      <!--学员问题-->
                    <div class="section">
    <div class="main-tit">
        <h2>学员问题汇总</h2>
        <p>
            
            <a href="/news/93.html">基础班阶段</a>
            
            <a href="/news/94.html">就业班阶段</a>
            
            <a href="/news/58.html">其他</a>
            
            <a href="/news.html">更多<i>+</i></a>
        </p>
    </div>
    <div class="wrapper clearfix">
        <div class="wrap-box">
            <div class="left-455" style="margin:0;height:341px;">
                <div id="focus-box" class="focus-box">
                    <ul class="slides">
                    
                        <li class="flex-active-slide" style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 2;">
                            <a title="HTML语义化" href="/news/show-43.html">
                                <span class="note-bg"></span>
                                <span class="note-txt">HTML语义化</span>
                                <img src="/upload/201707/06/201707061639020176.jpg" draggable="false">
                            </a>
                        </li>
                    
                        <li style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;" class="">
                            <a title="利用nvm安装和在多个Node.js版本之间切换" href="/news/show-50.html">
                                <span class="note-bg"></span>
                                <span class="note-txt">利用nvm安装和在多个Node.js版本之间切换</span>
                                <img src="/upload/201709/01/201709011610392916.png" draggable="false">
                            </a>
                        </li>
                    
                        <li style="width: 100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;" class="">
                            <a title="在windows中安装Node.js环境" href="/news/show-49.html">
                                <span class="note-bg"></span>
                                <span class="note-txt">在windows中安装Node.js环境</span>
                                <img src="/upload/201709/01/201709011603056353.png" draggable="false">
                            </a>
                        </li>
                    
                    </ul>
                <ol class="flex-control-nav flex-control-paging"><li><a class="flex-active">1</a></li><li><a class="">2</a></li><li><a class="">3</a></li></ol></div>
            </div>
            <div class="left-455">
                <ul class="side-txt-list">
                
                    <li class="tit"><a href="/news/show-43.html">HTML语义化</a></li>
                    
                    <li><span>2017-06-24</span><a href="/news/show-42.html">src与href的区别</a></li>
                    
                    <li><span>2017-06-24</span><a href="/news/show-44.html">h1~h6标签、p标签默认margin清除不掉</a></li>
                    
                    <li><span>2017-09-01</span><a href="/news/show-50.html">利用nvm安装和在多个Node.js版本之间切换</a></li>
                    
                    <li><span>2017-09-14</span><a href="/news/show-62.html">冒泡排序的的分析图解</a></li>
                    
                    <li class="tit"><a href="/news/show-61.html">git提交到远程库报错（clone别人项目代码修改）</a></li>
                    
                    <li><span>2017-09-12</span><a href="/news/show-60.html">in运算符补充</a></li>
                    
                    <li><span>2017-09-12</span><a href="/news/show-59.html">隐式转换规则</a></li>
                    
                    <li><span>2017-09-12</span><a href="/news/show-58.html">box-sizing问题</a></li>
                    
                    <li><span>2017-09-11</span><a href="/news/show-57.html">14期-温晓阳-解决问题Cannot read property 'appendChild' of null</a></li>
                    
                </ul>
            </div>
            <div class="left-220">
                <ul class="side-img-list">
                
                    <li>
                        <div class="img-box">
                            <label>1</label>
                            <img src="/upload/201707/06/201707061639020176.jpg">
                        </div>
                        <div class="txt-box">
                            <a href="/news/show-43.html">HTML语义化</a>
                            <span>2017-06-24</span>
                        </div>
                    </li>
                
                    <li>
                        <div class="img-box">
                            <label>2</label>
                            <img src="/upload/201709/01/201709011610392916.png">
                        </div>
                        <div class="txt-box">
                            <a href="/news/show-50.html">利用nvm安装和在多个Node.js版本之间切换</a>
                            <span>2017-09-01</span>
                        </div>
                    </li>
                
                    <li>
                        <div class="img-box">
                            <label>3</label>
                            <img src="/admin/skin/default/logo.png">
                        </div>
                        <div class="txt-box">
                            <a href="/news/show-60.html">in运算符补充</a>
                            <span>2017-09-12</span>
                        </div>
                    </li>
                
                    <li>
                        <div class="img-box">
                            <label>4</label>
                            <img src="/admin/skin/default/logo.png">
                        </div>
                        <div class="txt-box">
                            <a href="/news/show-59.html">隐式转换规则</a>
                            <span>2017-09-12</span>
                        </div>
                    </li>
                
                </ul>
            </div>
        </div>
    </div>
</div>

<!--学员问题结束-->
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
    import '../../../statics/site/js/jquery.flexslider-min.js';
    import '../../../statics/site/js/jqslider.js';
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

        // 实现轮播图自动滚动
        $("#slide-box").jqslider(); //初始化幻灯片
        $("#focus-box").flexslider({
            directionNav: false,
            pauseOnAction: false
        });
});

    export default {
        data() {
            return {

            }
        }
    }

</script>

<style scoped>
  @import '../../../statics/site/css/style.css';
</style>