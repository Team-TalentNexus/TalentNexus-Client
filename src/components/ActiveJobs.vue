<template>
  <div>
    <!-- 表格组件 -->
    <el-table :data="jobList" style="width: 100%">
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
      <!-- 操作列，包含跳转按钮 -->
      <el-table-column label="操作">
        <template v-slot="scope">
          <el-button type="primary" @click="goToDetail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 招聘职位数据示例
      jobList: [
        {
          title: "软件工程师",
          description: "负责开发和维护公司的核心系统",
          location: "北京",
          employmentType: "全职",
          salaryRange: "20k-30k"
        },
        {
          title: "产品经理",
          description: "负责产品需求分析和管理",
          location: "上海",
          employmentType: "全职",
          salaryRange: "25k-35k"
        },
        // 更多职位数据...
      ]
    };
  },
  methods: {
    goToDetail(row) {
      // 跳转到职位详情页面
      this.$router.push(`/jobs/detail/${row.title}`);
    }
  }
};
</script>
