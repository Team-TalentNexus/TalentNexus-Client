<template>
    <div class="job-list">
        <!-- 添加搜索框 -->
        <el-input v-model="searchQuery" placeholder="请输入职位名称或公司名称" style="width: 300px; margin-bottom: 20px;">
        </el-input>

        <!-- 表格显示职位列表 -->
        <el-table :data="filteredJobList" style="width: 100%">
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="companyName" label="公司名称" width="180"></el-table-column>
            <el-table-column prop="title" label="职位名称" width="180"></el-table-column>
            <el-table-column prop="description" label="职位描述"></el-table-column>
            <el-table-column prop="location" label="地点" width="150"></el-table-column>
            <el-table-column prop="employmentType" label="雇佣类型" width="120"></el-table-column>
            <el-table-column prop="salaryRange" label="薪资范围" width="120"></el-table-column>
            <el-table-column prop="active" label="是否激活" width="120">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.active ? 'success' : 'danger'">
                        {{ scope.row.active ? '激活' : '未激活' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template v-slot="scope">
                    <el-button type="primary" @click="applyInterview(scope.row.id)">申请</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination-container">
            <el-pagination background layout="sizes, prev, pager, next" :page-size="pageSize"
                :current-page="currentPage" :total="totalItems" :page-sizes="[5, 10, 20, 50]"
                @current-change="handlePageChange" @size-change="handleSizeChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import request from '@/utils/request';

export default {
    data() {
        return {
            searchQuery: '', // 添加 searchQuery
            jobList: [],
            currentPage: 1,
            pageSize: 5,
            totalItems: 100,
            Token: localStorage.getItem('token') , // 获取 token
        };
    },
    mounted() {
        // 在组件加载时执行获取数据的操作
        this.fetchJobData();
    },
    computed: {
        // 通过搜索过滤后的职位数据
        filteredJobList() {
            return this.jobList.filter(job => {
                return job.title.includes(this.searchQuery) || job.description.includes(this.searchQuery);
            });
        }
    },
    methods: {
        // 获取职位数据
        fetchJobData() {
            request.get('http://localhost:8081/seeker/position', {
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

                    this.jobList = response.data;  // 将响应数据赋值给 jobList
                })
                .catch(error => {
                    console.error('Error fetching job data: ', error);
                });
        },
        // 跳转到职位详情页面
        goToDetail(id) {
            this.$router.push({ name: 'JobDetail', params: { id } });
        },
        // 处理分页变化
        handlePageChange(newPage) {
            this.currentPage = newPage;
            this.fetchJobData();  // 当页码改变时重新获取数据
        },
        // 处理每页显示条数变化
        handleSizeChange(newSize) {
            this.pageSize = newSize;
            this.currentPage = 1;  // 改变每页显示条数后，重置页码到第一页
            this.fetchJobData();  // 当页大小改变时重新获取数据
        },
        applyInterview(job_position_id){
            request.post(`http://localhost:8081/seeker/apply/${job_position_id}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.Token}`
                }
            }).then(response=>{
                if(response.code === 200){
                    this.$message.success(`面试请求提交成功`);
                    this.fetchJobData();
                }else{
                    this.$message.error('面试申请提交失败')
                }
            })
        }

    }
};
</script>

<style scoped>
.pagination-container {
    text-align: center;
    margin-top: 20px;
}
</style>