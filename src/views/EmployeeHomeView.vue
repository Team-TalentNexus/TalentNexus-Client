<template>
    <el-container class="ican">
      <el-header style="display: flex;">
        <el-col :span="24" style="margin: auto;">
          <el-card shadow="always" style="text-align: center;background-color:rgb(218, 223, 229); font-family: 'Helvetica Neue';font-size: 40px;">
            招聘系统
          </el-card>
        </el-col>
      </el-header>
      <el-main>
        <div>
          <!-- 模糊搜索框 -->
          <el-input v-model="searchKeyword" placeholder="请输入关键词搜索" style="margin-bottom: 20px;"></el-input>
  
          <!-- 招聘记录数目 -->
          <div class="resources">
            共 {{ totalRecords }} 条招聘记录        
          </div>
  
          <!-- 招聘信息表格 -->
          <el-table :data="paginatedRecords" border stripe style="width: 100%">
            <el-table-column prop="firm" label="招聘企业名" align="center"></el-table-column>
            <el-table-column prop="category" label="技术栈" align="center"></el-table-column>
            <el-table-column prop="title" label="招聘岗位类型" align="center"></el-table-column>
            <el-table-column prop="information" label="招聘简要描述" align="center"></el-table-column>
            <el-table-column prop="contact" label="联系方式" align="center"></el-table-column>
            <el-table-column prop="reDate" label="发布时间" sortable :sort-method="sortByDate" align="center"></el-table-column>
          </el-table>
  
          <!-- 分页 -->
          <el-row type="flex" justify="center" style="margin-top: 20px;">
            
              <el-pagination
                v-if="totalPages > 1"
                v-model="currentPage"
                :total="totalRecords"
                :page-size="pageSize"
                layout="prev, pager, next"
                @current-change="handlePageChange">
              </el-pagination>
            
          </el-row>
        </div>
      </el-main>
    </el-container>
  </template>
  
  
  <script>
  export default {
    data() {
      return {
        records: [], // 所有招聘记录
        filteredRecords: [], // 模糊搜索后的招聘记录
        searchKeyword: '', // 模糊搜索关键词
        currentPage: 1, // 当前页码
        pageSize: 9, // 每页显示的记录条数
        paginatedRecords: [] // 当前页显示的记录
      };
    },
    computed: {
      totalRecords() {
        return this.filteredRecords.length;
      },
      totalPages() {
        return Math.ceil(this.totalRecords / this.pageSize);
      }
    },
    watch: {
      searchKeyword() {
        // 监听模糊搜索关键词变化，重新过滤数据
        this.filterRecord();
      }
    },
    methods: {
      // 根据模糊搜索关键词过滤数据
      filterRecord() {
        const keyword = this.searchKeyword.trim().toLowerCase();
        if (!keyword) {
          // 如果搜索关键词为空，则显示所有记录
          this.filteredRecords = this.records.slice();
        } else {
          // 否则根据关键词过滤记录
          this.filteredRecords = this.records.filter(record =>
            record.firm.toLowerCase().includes(keyword) ||
            record.title.toLowerCase().includes(keyword) ||
            record.information.toLowerCase().includes(keyword) ||
            record.contact.toLowerCase().includes(keyword)||record.category.toLowerCase().includes(keyword)
          );
        }
        // 根据发布时间排序，最新时间优先
        this.filteredRecords.sort((a, b) => new Date(b.reDate) - new Date(a.reDate));
        // 根据当前页码和每页显示数量分页显示数据
        this.paginateRecords();
      },
      // 分页显示数据
      paginateRecords() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        this.paginatedRecords = this.filteredRecords.slice(startIndex, startIndex + this.pageSize);
      },
      // 处理分页变化
      handlePageChange(val) {
        this.currentPage = val;
        this.paginateRecords();
      },
      // 根据日期排序方法
      sortByDate(a, b) {
        return new Date(a.reDate) - new Date(b.reDate);
      },
      init() {
        var _this = this;
  
        this.$axios({
          method: "get",
          url: "/offer/getAllOffer",
        }).then(res => {
          if (res.data.code === 200) {
            _this.records = res.data.data;
            console.log(_this.records)
            _this.filterRecord();
          }
        })
      }
    },
    mounted() {
      // 获取招聘记录数据（从后台获取数据）
      this.init();
    },
  };
  </script>
  
  <style scoped>
  .ican {
    height: 100vh;
    background-image: url("../assets/bg18.jpg");
    background-position: center;
    background-size: cover;
  }
  .user-management {
    padding: 20px;
  }
  
  .el-table .el-input {
    width: 100%;
  }
  
  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .operation-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  
  .operation-button {
    width: 100px; /* 设置按钮的固定宽度 */
    height: 30px; /* 设置按钮的固定高度 */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .resources {
    text-align: center;
    margin-top: 5px;
    font-size: 16px;
    color: #666;
  }
  </style>
  