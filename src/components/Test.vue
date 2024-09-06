<template>
  <el-card>
    <el-steps :active="active" align-center finish-status="success">
      <el-step title="个人信息"></el-step>
      <el-step title="项目经历"></el-step>
      <el-step title="工作经历"></el-step>
    </el-steps>

    <!-- 个人信息 -->
    <div class="information" v-if="active === 0">
      <el-form ref="basicInformation" :model="basicInformation" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="basicInformation.title"></el-input>
        </el-form-item>
        <el-form-item label="自我简介">
          <el-input type="textarea" v-model="basicInformation.summary"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <!-- 项目经历 -->
    <div class="projectExperience" v-if="active === 1">
      <el-form :model="form" ref="dynamicForm" label-width="120px">
        <div v-for="(experience, index) in form.projectExperiences" :key="index" class="form-group">
          <el-form-item :label="'项目名称 ' + (index + 1)">
            <el-input v-model="experience.projectName"></el-input>
          </el-form-item>
          <el-form-item :label="'描述 ' + (index + 1)">
            <el-input type="textarea" v-model="experience.description"></el-input>
          </el-form-item>
          <el-form-item :label="'开始日期 ' + (index + 1)">
            <el-date-picker v-model="experience.startDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item :label="'结束日期 ' + (index + 1)">
            <el-date-picker v-model="experience.endDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item :label="'角色 ' + (index + 1)">
            <el-input v-model="experience.role"></el-input>
          </el-form-item>
          <el-form-item :label="'成就 ' + (index + 1)">
            <el-input type="textarea" v-model="experience.achievements"></el-input>
          </el-form-item>
          <el-button type="danger" @click="removeExperience(index)">删除</el-button>
          <el-divider></el-divider>
        </div>
        <el-button type="primary" @click="addExperience">添加项目经历</el-button>
      </el-form>
    </div>

    <!-- 工作经历 -->
    <div class="workExperience" v-if="active === 2">
      <el-form :model="form" ref="workExperienceForm" label-width="120px">
        <div v-for="(work, index) in form.workExperiences" :key="index" class="form-group">
          <el-form-item :label="'公司名称 ' + (index + 1)">
            <el-input v-model="work.companyName"></el-input>
          </el-form-item>
          <el-form-item :label="'职位 ' + (index + 1)">
            <el-input v-model="work.position"></el-input>
          </el-form-item>
          <el-form-item :label="'开始日期 ' + (index + 1)">
            <el-date-picker v-model="work.startDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item :label="'结束日期 ' + (index + 1)">
            <el-date-picker v-model="work.endDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item :label="'工作描述 ' + (index + 1)">
            <el-input type="textarea" v-model="work.description"></el-input>
          </el-form-item>
          <el-form-item :label="'成就 ' + (index + 1)">
            <el-input type="textarea" v-model="work.achievements"></el-input>
          </el-form-item>
          <el-button type="danger" @click="removeWorkExperience(index)">删除</el-button>
          <el-divider></el-divider>
        </div>
        <el-button type="primary" @click="addWorkExperience">添加工作经历</el-button>
      </el-form>
    </div>

    <!-- 底部按钮 -->
    <div class="deployBtn">
      <el-button style="margin-top: 12px;" @click="submitFormBasicInformation" v-if="active === 0">下一步</el-button>
      <el-button style="margin-top: 12px;" @click="next" v-if="active === 1">下一步</el-button>
      <el-button style="margin-top: 12px;" @click="submitForm" v-if="active === 2">提交</el-button>
    </div>
  </el-card>
</template>

<script>
import request from '@/utils/request';
import axios from 'axios';
export default {
  data() {
    return {
      active: 0,
      userToken: localStorage.getItem('token'),
      basicInformation: {
        title: '',
        summary: ''
      },
      form: {
        projectExperiences: [
          {
            projectName: '',
            description: '',
            startDate: '',
            endDate: '',
            role: '',
            achievements: ''
          }
        ],
        workExperiences: [
          {
            companyName: '',
            position: '',
            startDate: '',
            endDate: '',
            description: '',
            achievements: ''
          }
        ]
      }
    };
  },

  methods: {
    next() {
      if (this.active < 2) {
        this.active++;
      }
    },
    addExperience() {
      this.form.projectExperiences.push({
        projectName: '',
        description: '',
        startDate: '',
        endDate: '',
        role: '',
        achievements: ''
      });
    },
    removeExperience(index) {
      this.form.projectExperiences.splice(index, 1);
    },
    addWorkExperience() {
      this.form.workExperiences.push({
        companyName: '',
        position: '',
        startDate: '',
        endDate: '',
        description: '',
        achievements: ''
      });
    },
    removeWorkExperience(index) {
      this.form.workExperiences.splice(index, 1);
    },
    submitFormBasicInformation() {
      if (this.active < 2) {
        this.active++;
      }
      // 提交个人信息
      try {
        request.post('http://localhost:8081/seeker/resume', this.basicInformation, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.userToken}`
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$message.success('基本信息增加成功');
          } else {
            this.$message.error(res.data.message);
          }
        });
      } catch (error) {
        this.$message.error('提交基本信息时出错');
      }

    },
    async submitForm() {
      // 提交项目经历
      for (const experience of this.form.projectExperiences) {
        try {
           request.post('http://localhost:8081/seeker/project', experience, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.userToken}`
            }
          }).then(res => {
            if (res.data.code === 200) {
              this.$message.success(`项目经历 "${experience.projectName}" 提交成功`);
            } else {
              this.$message.error(`项目经历 "${experience.projectName}" 提交失败: ${res.data.message}`);
            }
          });
        } catch (error) {
          this.$message.error(`提交项目经历 "${experience.projectName}" 时出错`);
        }
      }

      // 提交工作经历
      for (const work of this.form.workExperiences) {
        try {
          request.post('http://localhost:8081/seeker/work', work, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.userToken}`
            }
          }).then(res => {
            if (res.data.code === 200) {
              this.$message.success(`工作经历 "${work.companyName}" 提交成功`);
            } else {
              console.log(res.data);
              this.$message.error(`工作经历 "${work.companyName}" 提交失败: }`);
            }
          });
        } catch (error) {
          console.log(res.data.code);
          console.log(error);
          this.$message.error(`提交工作经历 "${work.companyName}" 时出错`);
        }
      }
    }
  }
};
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}
</style>
