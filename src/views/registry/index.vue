<template>
  <div class="login-container" style=" background-image: url(/img/bg.jpg);">

    <el-form ref="registryForm" :model="registryForm" :rules="registryRules" class="login-form" auto-complete="on"
             label-position="left">

      <div class="title-container">
        <h3 class="title">注册</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          v-model="registryForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :type="pwdType"
          v-model="registryForm.password"
          placeholder="密码"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleRegistry"/>
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;"
                 @click.native.prevent="handleRegistry">注册
      </el-button>


      <el-link  @click.prevent="login">已有账号？立即登录</el-link>
    </el-form>
  </div>





</template>

<script src="./registry.js"></script>
<style rel="stylesheet/scss" lang="scss" src="./registry.scss" ></style>
