<template>
  <div>
    <!-- 查询输入框 -->
    <el-input v-model="searchQuery" placeholder="输入职位名称或描述进行搜索" style="margin-bottom: 20px;" clearable></el-input>

    <!-- 表格组件 -->
    <el-table :data="filteredJobs" style="width: 100%">
      <!-- 招聘职位标题 -->
      <el-table-column prop="title" label="职位名称" width="180"></el-table-column>
      <!-- 职位描述 -->
      <el-table-column prop="description" label="职位描述" width="300"></el-table-column>
      <!-- 工作地点 -->
      <el-table-column prop="location" label="工作地点" width="180"></el-table-column>
      <!-- 职位类型 -->
      <el-table-column prop="employmentType" label="职位类型" width="180"></el-table-column>
      <!-- 薪资范围 -->
      <el-table-column prop="salaryRange" label="薪资范围" width="180"></el-table-column>
      <!-- 是否激活 -->
      <el-table-column prop="active" label="状态" width="120">
        <template v-slot="scope">
          <span>{{ scope.row.active ? '激活' : '未激活' }}</span>
        </template>
      </el-table-column>
      <!-- 创建时间 -->
      <el-table-column prop="createdAt" label="创建时间" width="180"></el-table-column>
      <!-- 更新时间 -->
      <el-table-column prop="updatedAt" label="更新时间" width="180"></el-table-column>
      <!-- 操作列，包含跳转按钮 -->
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="primary" @click="goToDetail(scope.row.id)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination background layout="sizes, prev, pager, next" :total="totalJobs" :page-sizes="[5, 10, 20, 50]"
      :page-size.sync="pageSize" :current-page.sync="currentPage" @size-change="handleSizeChange"
      @current-change="handlePageChange" style="margin-top: 20px;" />
  </div>
</template>

<script>
import request from '@/utils/request';
export default {
  data() {
    return {
      // 查询关键字
      searchQuery: '',
      // 招聘职位数据
      jobList: [],  // 初始化为空数组
      // 分页设置
      pageSize: 5,  // 每页显示的条数，默认是 5
      currentPage: 1,  // 当前页码
      totalJobs: 100,  // 总职位数，用于分页组件
      Token: localStorage.getItem('token'),
    };
  },
  mounted() {
    // 在组件加载时执行获取数据的操作
    this.fetchJobData();
  },
  computed: {
    // 通过搜索过滤后的职位数据
    filteredJobs() {
      return this.jobList.filter(job => {
        return job.title.includes(this.searchQuery) || job.description.includes(this.searchQuery);
      });
    }
  },
  methods: {
    // 获取职位数据
    fetchJobData() {
      // 发送 GET 请求获取数据，包含当前页号和每页条数
      request.get('http://localhost:8081/company/position', {
        params: {
          page: this.currentPage,
          size: this.pageSize
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.Token}`
        }
      })
        .then(response => {
          console.log(response)
          this.jobList = response.data;  // 将获取的数据赋值给 jobList
        })
        .catch(error => {
          console.error('Error fetching job data: ', error);
        });
    },
    // 跳转到职位详情页面
    methods: {
      goToDetail(id) {
        // 跳转到详情页面，并传递 id
        this.$router.push({ name: 'JobDetail', params: { id } });
      }
    },
    // 处理分页变化
    handlePageChange(newPage) {
      this.currentPage = newPage;
      this.fetchJobData();  // 当页码改变时重新获取数据
    },
    // 处理每页显示条数变化
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.currentPage = 1;  // 每次改变每页显示条数后重置页码到第一页
      this.fetchJobData();  // 当页大小改变时重新获取数据
    }
  }
};
</script>
