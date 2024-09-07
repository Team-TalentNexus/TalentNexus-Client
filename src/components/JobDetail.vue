<template>
    <div>
        <h2>职位详情</h2>

        <!-- 显示职位基本信息 -->
        <div v-if="job">
            <p><strong>职位名称:</strong> {{ job.title }}</p>
            <p><strong>职位描述:</strong> {{ job.description }}</p>
            <p><strong>工作地点:</strong> {{ job.location }}</p>
            <p><strong>职位类型:</strong> {{ job.employmentType }}</p>
            <p><strong>薪资范围:</strong> {{ job.salaryRange }}</p>
        </div>

        <!-- 相关数据的表格 -->
        <el-table :data="relatedData" style="width: 100%">
            <el-table-column prop="title" label="相关标题"></el-table-column>
            <el-table-column prop="description" label="相关描述"></el-table-column>
            <el-table-column prop="location" label="相关地点"></el-table-column>
            <el-table-column prop="employmentType" label="相关职位类型"></el-table-column>
            <el-table-column prop="salaryRange" label="相关薪资范围"></el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <el-pagination background layout="sizes, prev, pager, next" :total="total" :page-sizes="[5, 10, 20, 50]"
            :page-size.sync="pageSize" :current-page.sync="currentPage" @size-change="handleSizeChange"
            @current-change="handlePageChange" style="margin-top: 20px;" />
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['id'],  // 从路由接收 id 参数
    data() {
        return {
            job: null,  // 当前职位详细信息
            relatedData: [],  // 相关数据
            total: 0,  // 相关数据的总条数
            pageSize: 5,  // 每页显示的条数
            currentPage: 1  // 当前页码
        };
    },
    mounted() {
        this.fetchJobDetail();
        this.fetchRelatedData();
    },
    methods: {
        fetchJobDetail() {
            // 获取职位详细信息
            axios.get(`http://localhost:8081/company/position/${this.id}`)
                .then(response => {
                    this.job = response.data;
                })
                .catch(error => {
                    console.error('Error fetching job detail:', error);
                });
        },
        fetchRelatedData() {
            // 获取与职位相关的数据
            axios.get(`http://localhost:8081/company/position/related/${this.id}?page=${this.currentPage}&size=${this.pageSize}`)
                .then(response => {
                    this.relatedData = response.data.data;
                    this.total = response.data.total;
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
        }
    }
};
</script>

<style scoped>
/* 添加样式 */
</style>