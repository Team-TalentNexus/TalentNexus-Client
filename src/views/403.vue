<template>
    <div class="forbidden">
      <h1>403 Forbidden</h1>
      <p>抱歉，您没有访问该页面的权限。</p>
      <router-link to="/">返回首页</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Forbidden',
  }
  </script>
  
  <style scoped>
  .forbidden {
    text-align: center;
    margin-top: 50px;
  }
  
  .forbidden h1 {
    font-size: 3em;
    color: #FF0000;
  }
  
  .forbidden p {
    font-size: 1.5em;
    margin: 20px 0;
  }
  
  .forbidden a {
    color: #42b983;
    text-decoration: none;
    font-size: 1.2em;
  }
  </style>
  