<template>
    <div class="job-detail">
        <el-button @click="goBack" type="primary" class="back-button">返回</el-button>
        <h2>职位详情</h2>
        <!-- 相关数据的表格 -->
        <div class="table-container">
            <el-table :data="relatedData" style="width: 100%">
                <el-table-column prop="id" label="ID" width="100"></el-table-column>
                <el-table-column prop="resumeId" label="简历ID" width="120"></el-table-column>
                <el-table-column prop="jobSeekerName" label="求职者姓名" width="200"></el-table-column>
                <el-table-column prop="status" label="状态" width="180"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button @click="viewResume(scope.row.id,scope.row.resumeId)" type="primary">查看简历</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 分页组件 -->
        <el-pagination background layout="sizes, prev, pager, next" :total="total" :page-sizes="[5, 10, 20, 50]"
            :page-size.sync="pageSize" :current-page.sync="currentPage" @size-change="handleSizeChange"
            @current-change="handlePageChange" style="margin-top: 20px;" />
    </div>
</template>

<script>
import request from '@/utils/request';

export default {
    props: ['id'],  // 从路由接收 id 参数
    data() {
        return {
            job: null,  // 当前职位详细信息
            relatedData: [],  // 相关数据
            total: 100,  // 相关数据的总条数
            pageSize: 5,  // 每页显示的条数
            currentPage: 1,  // 当前页码
            Token: localStorage.getItem('token'),
        };
    },
    mounted() {
        this.fetchRelatedData();
    },
    methods: {
        fetchRelatedData() {
            // 获取与职位相关的数据
            request.get(`http://localhost:8081/company/apply/${this.id}`, {
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
                    this.relatedData = response.data; // 赋值给 relatedData
                })
                .catch(error => {
                    console.error('Error fetching related data:', error);
                });
        },
        handlePageChange(newPage) {
            this.currentPage = newPage;
            this.fetchRelatedData();  // 每次分页切换时，重新获取相关数据
        },
        handleSizeChange(newSize) {
            this.pageSize = newSize;
            this.currentPage = 1;  // 改变每页显示条数后，重置到第一页
            this.fetchRelatedData();
        },
        viewResume(jobApplicationId,resumeId) {
            // 处理查看简历的逻辑
            // 例如，跳转到简历详情页
            this.$router.push({ name: 'ResumeDetail', params: { job_application_id:jobApplicationId ,resume_id: resumeId } });
        },
        goBack() {
            this.$router.go(-1);  // 返回上一页
        }
    }
};
</script>

<style scoped>
.job-detail{
    padding: 20px;
    position: relative;
    /* 使返回按钮能够绝对定位 */
}
.back-button {
    position: absolute;
    top: 20px;
    left:20px;
}

.table-container {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    margin-top: 20px;
    margin-left: 50px;
}
</style>