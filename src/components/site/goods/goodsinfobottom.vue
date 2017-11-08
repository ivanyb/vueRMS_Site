<template>
    <div class="goodsinfo">
        <!--此组件样式不需要全部导入，只需要导入Affix需要的样式即可，已经编写在style.css中-->
         <Affix>
           <div class="tabs">
            <ul>
                <li :class="lisactive[0]" @click="selectedtab(0)">图文信息</li>
                <li :class="lisactive[1]" @click="selectedtab(1)">商品评论</li>
            </ul>
           </div>
        </Affix>
        <!--内容-->
         <div id="goodsTabs" class="goods-tab bg-wrap">
        <div class="comment-box">
            <div class="tab-content">
                <!--图文信息-->
                <div :class="lisactive[0]">
                    <p v-html="content"></p>
                </div>
                <!--评论-->
                <div :class="lisactive[1]">
                    <!--提交评论-->
                    <div class="commentpost">
                    <el-form :model="commentform" ref="commentform"  :rules="rules2">
                        <el-row>                   
                        <el-col :span="24">
                        <el-form-item label="评论内容" prop="commenttxt">
                            <el-input type="textarea" v-model="commentform.commenttxt"></el-input>
                        </el-form-item>
                        </el-col>
                        </el-row>
                        <el-col :offset="22">
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('commentform')">提交</el-button>                      
                        </el-form-item>
                        </el-col>
                        </el-form>     
                </div> 
                    <!--/提交评论-->
                <!--获取评论-->
                <ul id="commentList" class="list-box">
                    <li v-for="pageitem in commentlist" :key="pageitem.id">
                        <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                        </div>
                        <div class="inner-box">
                            <div class="info">
                                <span v-text="pageitem.user_name"></span>
                                <span>{{pageitem.add_time | datefmt('YYYY-MM-DD HH:MM:ss')}}</span>
                            </div>
                            <p v-text="pageitem.content"></p>
                        </div>
                        </li>
                    </ul>
                <!--获取评论-->     
                </div>                    
            </div> 
         </div> 
         </div>  

         
         <!--页码列表-->
        <div class="page-box" style="margin:15px 0 0;">
            <div class="digg">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                :current-page="pageIndex" :page-sizes="[1,5,10,20,30,50,100]"
                    :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="totalCount">
                </el-pagination>
            </div>
        </div>
        <!--/页码列表-->
    </div>
</template>

<script>
    // 按需引入iview这套组件中的图钉组件
    // import Affix from 'iview/src/components/affix';
    
    // export default{
    //     components:{
    //         Affix
    //     }
    // }
    export default{
        props:['content','id'],
        data(){
            return {
                lisactive:['active','hidden'], //评论和图文内容tab标签标记     
                commentlist:[], //评论列表数据   
                pageIndex:1,
                pageSize:1,   
                totalCount:0,     
                commentform:{
                    commenttxt:''
                },
                 rules2: {
                    commenttxt: [
                        // { validator: validateUname, trigger: 'blur' }
                        { required: true, message: '内容不能为空', trigger: 'blur' }
                        // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ]                  
                }
            }
        },
          watch:{
            '$route':function(newval, oldval){               
                // console.log(newval);
               
                 this.id = newval.params.id;
                 this.getcommentbypage();              
            }
        },
        methods:{
             // pageSize改变时触发
            handleSizeChange(val) {
               this.pageSize =val;
               this.getcommentbypage();
            },
             // pageIndex改变时触发
            handleCurrentChange(val) {
                 this.pageIndex =val;
                this.getcommentbypage();
            },
            // 表单提交
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    // 验证通过提交评论数据
                    this.$http.post('/site/validate/comment/post/goods/'+this.id,this.commentform)
                    .then(res=>{
                        if(res.data.status==1){
                        this.$message.error(res.data.message);
                        return;
                    }

                       this.$message({type:'success',message:res.data.message});
                    // 刷新数据
                    this.getcommentbypage();

                    });
                    
                } else {
                    console.log('表单验证失败');
                    return false;
                }
                });
            },
            getcommentbypage(){
                var url = '/site/comment/getbypage/goods/'+this.id+'?pageIndex='+this.pageIndex+'&pageSize='+this.pageSize;
                console.log(url);
                this.$http.get(url)
                .then(res=>{
                     if(res.data.status==1){
                        this.$message.error(res.data.message);
                        return;
                    }
                    this.totalCount = res.data.totalcount;
                    this.commentlist = res.data.message;
                   
                });
            },
            // 切换tab标签页样式
            selectedtab(index){
                this.lisactive.forEach((item,i)=>{
                    this.lisactive[i] = 'hidden';
                    if(index ==i){
                        this.lisactive[i] = 'active'
                    }
                });
                // 触发vue更新视图
                this.lisactive.push('');
                this.lisactive.pop();
            }
        },
        created(){
            setTimeout(()=>{
             this.getcommentbypage();
            },500);
        }       
    }
</script>

<style scoped>
    /*@import '../../../../node_modules/iview/dist/styles/iview.css'; */
 
   .tabs{
       border: 1px solid rgba(0,0,0,0.1);
       height: 50px;
       background-color:white;
   }

   .tabs li{
       display: inline-block;
       line-height: 50px;
       height: 50px;      
       font-weight: bold;
       padding: 0 10px;
       cursor: pointer;
   }

   .tabs li.active{
       background-color:rgba(0,153,229,0.9);
       color: white;
   }
   .tab-content div.hidden{
    padding: 15px;
    min-height: 200px;
    display: none;
   }

   .tab-content div.active{
       padding: 15px;
       display: block;
   }
   
</style>