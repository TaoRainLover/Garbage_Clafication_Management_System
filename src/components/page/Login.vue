<template>
  <div class="login-wrap">
    <div class="login-box">
      <div class="left">
        <div class="content">
          <p class="title">垃圾分类后台管理系统</p>
          <img src="../../assets/img/img2.png" alt="" class="img" />
          <p class="des">
            集图像、语音、文本输入查询一体的的垃圾分类帮手，旨在帮助人们解决在垃圾分类中的痛点问题，帮助垃圾分类工作顺利进行。
          </p>
        </div>
      </div>
      <div class="ms-login">
        <div class="ms-title">欢迎登陆</div>
        <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
          <el-form-item prop="account">
            <el-input v-model="param.account" placeholder="请输入账号">
              <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="param.password" @keyup.enter.native="submitForm()">
              <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
            </el-input>
          </el-form-item>
          <p class="login-tips">Tips : 若遗忘账号或密码，请及时联系管理员！</p>
          <div class="login-btn">
            <el-button type="primary" @click="submitForm()">登 录</el-button>
          </div>
        </el-form>
        <p class="version">Version: 1.1.6</p>
      </div>
    </div>
  </div>
</template>

<script>
import { adminLogin } from '../../api/admin.js';
export default {
  data: function () {
    return {
      param: {
        account: '',
        password: ''
      },
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    };
  },
  methods: {
    async submitForm() {
      if (this.param.account == 0 || this.param.password == 0) return this.$message.error('请输入账号密码！');
      const res = await adminLogin(this.param);
      console.log(res);
      if (res.status == 1) {
        this.$message.error(res.message);
      } else {
        this.$message.success('登录成功');
        localStorage.setItem('ms_username', res.data.name);
        this.$router.push('/');
      }

      // this.$refs.login.validate((valid) => {
      //   if (valid) {
      //     this.$message.success('登录成功');
      //     localStorage.setItem('ms_username', this.param.username);
      //     this.$router.push('/');
      //   } else {
      //     this.$message.error('请输入账号和密码');
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/bg2.png);
  background-size: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-wrap .login-box {
  width: 60%;
  height: 60%;
  box-shadow: 0px 0px 10px 2px #e3e9df;
  border-radius: 12px;
  background: white;
  display: flex;
}
.login-box .left {
  width: 55%;
  height: 100%;
  background: #4bae32;
  /* position: relative; */
  border-radius: 12px 0px 0 12px;
  /* border-radius: 12px; */
}

.left .content {
  width: 100%;
  height: 100%;

  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;
  box-sizing: border-box;
  overflow: hidden;
}
.left .title {
  font-size: 28px;
  /* margin-top: 20px; */
  font-weight: bolder;
  margin-bottom: 20px;
}
.left .content .img {
  height: 50%;
  width: 50%;
  /* background: skyblue; */
}
.left .des {
  width: 70%;
  font-size: 14px;
  font-weight: bold;
}
.ms-login {
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  background: white;
  overflow: hidden;
  border-radius: 12px;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  font-weight: bolder;
  margin-top: 50px;
}
.ms-content {
  padding: 30px 70px;
}
.login-btn {
  text-align: center;
  font-size: 18px;
}
.login-btn button {
  width: 100%;
  height: 36px;
  background: #14a7ff;
  outline: none;
  font-size: 16px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
}
.version {
  font-size: 12px;
  text-align: center;
  margin-top: 24px;
}
</style>
