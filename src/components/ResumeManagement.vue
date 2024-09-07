<template>
    <div class="resume-detail">
        <el-button @click="goBack" type="primary" class="back-button">返回</el-button>
        <el-button @click="deleteResume" type="danger" class="delete-button">删除简历</el-button>
        <h2>简历详情</h2>

        <!-- 当没有简历数据时显示提示和按钮 -->
        <div v-if="resumeNotFound" class="no-resume">
            <el-button @click="createResume" type="primary">创建简历</el-button>
        </div>

        <!-- 显示简历基本信息 -->
        <el-form v-if="resume" :model="resume" label-width="120px" class="resume-form">
            <el-form-item label="姓名">
                <span>{{ resume.fullName || '无' }}</span>
            </el-form-item>
            <el-form-item label="性别">
                <span>{{ resume.gender || '无' }}</span>
            </el-form-item>
            <el-form-item label="电话">
                <span>{{ resume.phone || '无' }}</span>
            </el-form-item>
            <el-form-item label="邮箱">
                <span>{{ resume.email || '无' }}</span>
            </el-form-item>
            <el-form-item label="地址">
                <span>{{ resume.address || '无' }}</span>
            </el-form-item>
            <el-form-item label="出生日期">
                <span>{{ resume.birthDate || '无' }}</span>
            </el-form-item>
            <el-form-item label="标题">
                <span>{{ resume.title || '无' }}</span>
            </el-form-item>
            <el-form-item label="简介">
                <span>{{ resume.summary || '无' }}</span>
            </el-form-item>
            <el-form-item label="大学">
                <span>{{ resume.university || '无' }}</span>
            </el-form-item>
            <el-form-item label="专业">
                <span>{{ resume.major || '无' }}</span>
            </el-form-item>
            <el-form-item label="学位">
                <span>{{ resume.degree || '无' }}</span>
            </el-form-item>
        </el-form>

        <!-- 显示项目经历 -->
        <h3 v-if="resume && resume.projectExperiences">项目经历</h3>
        <el-table v-if="resume && resume.projectExperiences" :data="resume.projectExperiences" style="width: 100%">
            <el-table-column prop="projectName" label="项目名称"></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column prop="startDate" label="开始日期"></el-table-column>
            <el-table-column prop="endDate" label="结束日期"></el-table-column>
            <el-table-column prop="role" label="角色"></el-table-column>
            <el-table-column prop="achievements" label="成就"></el-table-column>
        </el-table>

        <!-- 显示工作经历 -->
        <h3 v-if="resume && resume.workExperiences">工作经历</h3>
        <el-table v-if="resume && resume.workExperiences" :data="resume.workExperiences" style="width: 100%">
            <el-table-column prop="companyName" label="公司名称"></el-table-column>
            <el-table-column prop="position" label="职位"></el-table-column>
            <el-table-column prop="startDate" label="开始日期"></el-table-column>
            <el-table-column prop="endDate" label="结束日期"></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column prop="achievements" label="成就"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import request from '@/utils/request';

export default {
    data() {
        return {
            resume: null,  // 存储简历信息
            Token: localStorage.getItem('token'),
            resumeNotFound: false,
        };
    },
    mounted() {
        this.fetchResumeData();
    },
    methods: {
        fetchResumeData() {
            // 获取简历数据
            request.get(`http://localhost:8081/seeker/resume`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.Token}`
                }
            }).then(response => {
                if (response.code === 200) {
                    this.resume = response.data;
                } else if (response.code === 404) {
                    this.resumeNotFound = true;
                    this.notFound();
                }
            })
                .catch(error => {
                    console.error('Error fetching resume data:', error);
                });
        },
        goBack() {
            this.$router.go(-1); // 返回上一页面
        },
        notFound() {
            const h = this.$createElement;
            this.$notify({
                title: '提示',
                message: h('i', { style: 'color: teal' }, '你还没有简历，请创建简历')
            });
        },
        createResume() {
            this.$router.push('resume_management/add_resume')
        },
        deleteResume() {
            request.delete('http://localhost:8081/seeker/resume', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.Token}`
                }
            }).then(response => {
                if (response.code === 200) {
                    this.$message.success(`简历已删除`);
                    this.$router.push('/seeker'); 
                } else {
                    this.$message.error(`简历删除失败`);
                }
            });
        }

    }
};
</script>

<style scoped>
.resume-detail {
    padding: 20px;
    position: relative;
    /* 使返回按钮能够绝对定位 */
}

h2 {
    margin-bottom: 20px;
}

h3 {
    margin-top: 30px;
    margin-bottom: 10px;
}

.resume-form {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.el-form-item {
    border-bottom: 1px solid #dcdfe6;
    padding: 10px 0;
}

.el-form-item:last-child {
    border-bottom: none;
}

.el-table {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
}

.back-button {
    position: absolute;
    top: 20px;
    left: 20px;
}
.delete-button {
    position: absolute;
    top: 20px;
    right: 20px;
}


.interview-button {
    position: absolute;
    top: 20px;
    right: 20px;
}
</style>
