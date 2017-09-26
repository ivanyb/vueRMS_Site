<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">会员注册</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--会员注册-->
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">会员注册</a>
                        <i>|</i>
                        <a href="/login.html">账户登录</a>
                    </div>

                    <div class="form-box full">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="用户名" prop="user_name">
                                <el-input v-model="ruleForm.user_name"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="checkPass">
                                <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="手机" prop="mobile">
                                <el-input v-model="ruleForm.mobile"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email">
                                <el-input v-model="ruleForm.email"></el-input>
                            </el-form-item>
                            <el-form-item label="">
                                <el-popover
                                ref="popover1"
                                placement="top-start"
                                title="注册用户的权利和义务"
                                width="400"
                                trigger="click"
                                content="
1、用户在注册时应按照注册提示提供准确的用户名、密码及真实的联系邮箱、手机号码、真实姓名等所要求的个人资料，并及时更新注册（报名）资料，符合及时、详尽、准确的要求，用户输入的所有个人信息将被视作用户的准确身份信息。
">
                                </el-popover>
                               <el-checkbox  v-model="agreen">我已仔细阅读并接受</el-checkbox>&nbsp;<span style="cursor:pointer;color:green;" v-popover:popover1>注册许可协议</span>
                         
                            </el-form-item>
                             
                            <el-form-item>
                                <el-button :disabled="!agreen" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                                <el-button @click="resetForm('ruleForm')">重置表单</el-button>
                            </el-form-item>
                        </el-form>

                        <!--/会员注册-->
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            var checkMobile = (rule, value, callback) => {
                var reg = /^1[34578][0-9]{9}$/;
                if (value=="" || !reg.test(value)) {
                    callback(new Error('请输入正确的手机号码'));
                } else {
                    callback();
                }
            };

            var checkEmail = (rule, value, callback) => {
                var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
                if (value=="" || !reg.test(value)) {
                    callback(new Error('请输入正确的邮箱'));
                } else {
                    callback();
                }
            };

            var checkuser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    this.$http.get('/site/account/checkuser/' + value.trim())
                        .then(res => {
                            if (res.data.status == 1) {
                                // this.$message.error(res.data.message);
                                callback(new Error('服务器通讯异常，验证失败'));
                                return;
                            }

                            // 不可用
                            if (!res.data.message) {
                                callback(new Error('用户名已存在'));
                                return;
                            }

                            callback();
                        });
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));                   
                } else {
                    if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');      
                     callback();
                    } 
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                agreen:false, //条款
                ruleForm: {
                    user_name: '',
                    password: '',
                    checkPass: '',
                    mobile:'',
                    email:''
                },
                rules: {
                    user_name: [
                        { validator: checkuser, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    mobile: [
                        { validator: checkMobile, trigger: 'blur' }
                    ],
                    email: [
                        { validator: checkEmail, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            register(){
                     this.$http.post('/site/account/register',this.ruleForm)
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
                                    this.$router.push({name:'login'});
                                }
                            });
                        });
            },
            submitForm(formName) {
               this.$refs.ruleForm.validateField('password',(errmsg1)=>{
                //    console.log('errmsg1='+errmsg1);
                     this.$refs.ruleForm.validateField('checkPass',(errmsg2)=>{
                        //   console.log('errmsg2='+errmsg2);
                         this.$refs.ruleForm.validateField('mobile',(errmsg3)=>{
                            //   console.log('errmsg3='+errmsg3);
                            this.$refs.ruleForm.validateField('email',(errmsg4)=>{
                             this.$refs.ruleForm.validateField('user_name',(errmsg5)=>{
                                //   console.log('errmsg4='+errmsg4);
                                if(errmsg1==='' && errmsg2==='' &&  errmsg3==='' &&  errmsg4==='' && errmsg5 ===''){
                                    this.register();
                                }
                             });
                         });
                      });
                    });
               });
                // this.$refs[formName].validate((valid) => {
                    
                //     if (valid) {
                //         this.register();
                //     } else {
                //         console.log('error submit!!');
                //         return false;
                //     }
                // });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }

</script>

<style scoped>

</style>