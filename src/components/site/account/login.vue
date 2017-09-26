<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>

                    <div class="form-box full">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="用户名" prop="user_name">
                                <el-input placeholder="请输入用户名" v-model="ruleForm.user_name"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-row>
                                    <el-col :offset="7" :span="7">
                                        <el-button size="large" type="primary" @click="submitForm('ruleForm')">立即登录</el-button>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                ruleForm: {
                    user_name: '',
                    password: ''
                },
                rules: {
                    user_name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
              login(){
                     this.$http.post('/site/account/login',this.ruleForm)
                        .then(res=>{
                            if(res.data.status == 1){
                                this.$message.error(res.data.message);
                                return;
                            }
                            this.$message({
                                type:'success',
                                message:res.data.message,
                                duration:1000,
                                onClose:()=>{
                                    // 改变登录状态
                                    this.$store.dispatch(this.$store.state.global.isloginedFlag,1);
                                    this.$router.push({name:'membercenter'});
                                }
                            });
                        });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       this.login();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }

</script>

<style scoped>

</style>