<template>
  <div class="home">
    <div class="card">
        <div class="card-content jobseeker">
          <ul>
            <li><strong>沟通：</strong>在线职位及时沟通</li>
            <li><strong>任性选：</strong>各大行业职位任你选</li>
          </ul>
          <el-link href="http://localhost:8082/#/login"   type="primary">我要找工作</el-link>
        </div>
    </div>
    <div class="card">
        <div class="card-content employer">
          <ul>
            <li><strong>招聘效果好：</strong>与职场牛人在线开聊</li>
            <li><strong>更多在线牛人：</strong>入职速度快</li>
            <li><strong>人才匹配度高：</strong>获取更精准的牛人</li>
          </ul>
          <el-link href="http://localhost:8082/#/login" type="primary">我要招聘</el-link>
        </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('@/assets/bg2.png'); /* 背景图路径 */
  background-size: cover;
  background-position: center;
}

.card {
  width: 320px;
  height: 400px;
  margin: 20px;
  background-color: #fff; /* 填充色为白色 */
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-content {
  padding: 20px;
  text-align: center;
}

.card-content h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.card-content p {
  font-size: 16px;
  color: #666;
}

.card-content ul {
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
}

.card-content ul li {
  font-size: 14px;
  margin: 5px 0;
}

.jobseeker {
  color: #3498db;
}

.employer {
  color: #2ecc71;
}
</style>
