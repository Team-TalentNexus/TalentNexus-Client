<template>
    <div class="resume-detail">
        <el-button @click="goBack" type="primary" class="back-button">返回</el-button>
        <el-button @click="showInterviewDialog" type="primary" class="interview-button">面试邀请</el-button>
        <h2>简历详情</h2>

        <!-- 显示简历基本信息 -->
        <el-form :model="resume" label-width="120px" class="resume-form">
            <el-form-item label="姓名">
                <span>{{ resume.fullName }}</span>
            </el-form-item>
            <el-form-item label="性别">
                <span>{{ resume.gender }}</span>
            </el-form-item>
            <el-form-item label="电话">
                <span>{{ resume.phone }}</span>
            </el-form-item>
            <el-form-item label="邮箱">
                <span>{{ resume.email }}</span>
            </el-form-item>
            <el-form-item label="地址">
                <span>{{ resume.address }}</span>
            </el-form-item>
            <el-form-item label="出生日期">
                <span>{{ resume.birthDate }}</span>
            </el-form-item>
            <el-form-item label="标题">
                <span>{{ resume.title }}</span>
            </el-form-item>
            <el-form-item label="简介">
                <span>{{ resume.summary }}</span>
            </el-form-item>
            <el-form-item label="大学">
                <span>{{ resume.university }}</span>
            </el-form-item>
            <el-form-item label="专业">
                <span>{{ resume.major }}</span>
            </el-form-item>
            <el-form-item label="学位">
                <span>{{ resume.degree }}</span>
            </el-form-item>
        </el-form>

        <!-- 显示项目经历 -->
        <h3>项目经历</h3>
        <el-table v-if="resume.projectExperiences" :data="resume.projectExperiences" style="width: 100%">
            <el-table-column prop="projectName" label="项目名称"></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column prop="startDate" label="开始日期"></el-table-column>
            <el-table-column prop="endDate" label="结束日期"></el-table-column>
            <el-table-column prop="role" label="角色"></el-table-column>
            <el-table-column prop="achievements" label="成就"></el-table-column>
        </el-table>

        <!-- 显示工作经历 -->
        <h3>工作经历</h3>
        <el-table v-if="resume.workExperiences" :data="resume.workExperiences" style="width: 100%">
            <el-table-column prop="companyName" label="公司名称"></el-table-column>
            <el-table-column prop="position" label="职位"></el-table-column>
            <el-table-column prop="startDate" label="开始日期"></el-table-column>
            <el-table-column prop="endDate" label="结束日期"></el-table-column>
            <el-table-column prop="description" label="描述"></el-table-column>
            <el-table-column prop="achievements" label="成就"></el-table-column>
        </el-table>

        <!-- 面试邀请对话框 -->
        <el-dialog title="面试邀请" :visible.sync="dialogVisible" width="500px">
            <el-form :model="interviewForm" label-width="120px">
                <el-form-item label="求职者 ID">
                    <el-input v-model="interviewForm.jobSeekerId" type="number" disabled></el-input>
                </el-form-item>
                <el-form-item label="公司 ID">
                    <el-input v-model="interviewForm.companyId" type="number" disabled></el-input>
                </el-form-item>
                <el-form-item label="申请 ID">
                    <el-input v-model="interviewForm.jobApplicationId" type="number" disabled></el-input>
                </el-form-item>
                <el-form-item label="会议链接">
                    <el-input v-model="interviewForm.interviewLink"></el-input>
                </el-form-item>
                <el-form-item label="面试开始时间">
                    <el-date-picker v-model="interviewForm.startTime" type="datetime" placeholder="选择面试时间"
                        format="yyyy-MM-ddTHH:mm:ss" value-format="yyyy-MM-ddTHH:mm:ss"></el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmInterview">确认</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import request from '@/utils/request';

export default {
    data() {
        return {
            resume: null,  // 存储简历信息
            Token: localStorage.getItem('token'),
            dialogVisible: false, // 控制对话框显示
            interviewForm: {
                jobSeekerId: null, // 根据实际简历数据设置
                companyId: 1,  // 示例公司ID
                jobApplicationId: null, // 根据实际数据设置
                interviewLink: '',
                startTime: '' // 面试开始日期
            }
        };
    },
    mounted() {
        this.fetchResumeData();
    },
    methods: {
        fetchResumeData() {
            // 获取简历数据
            const resumeId = this.$route.params.resume_id;
            request.get(`http://localhost:8081/company/resume/${resumeId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.Token}`
                }
            })
                .then(response => {
                    this.resume = response.data;
                    this.interviewForm.jobSeekerId = response.data.jobSeekerId;
                })
                .catch(error => {
                    console.error('Error fetching resume data:', error);
                });
        },
        goBack() {
            this.$router.go(-1); // 返回上一页面
        },
        showInterviewDialog() {
            this.dialogVisible = true;
            this.interviewForm.jobApplicationId = this.$route.params.job_application_id;
            request.get('http://localhost:8081/company/api/info', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.Token}`
                }
            }).then(response => {
                this.interviewForm.companyId = response.data.id;
            })
                .catch(error => {
                    console.error('Error fetching resume data:', error);
                });
        },
        confirmInterview() {
            try {
                console.log(this.interviewForm)
                request.post('http://localhost:8081/company/interview/create', this.interviewForm, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.Token}`
                    }
                }).then(response => {
                    if (response.code === 200) {
                        this.$message.success('面试邀请发送成功');
                        this.dialogVisible = false;
                    } else {
                        this.$message.error(respons.message);
                    }
                })
            } catch (error) {
                this.$message.error('面试邀请发送时出错');
            }
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

.interview-button {
    position: absolute;
    top: 20px;
    right: 20px;
}
</style>
