<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 文章管理 </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>

        <!-- 选择框 -->
        <el-select v-model="query.type" placeholder="搜索方式" class="handle-select mr10">
          <el-option key="1" label="文章ID" value="id"></el-option>
          <el-option key="2" label="文章标题" value="title"></el-option>
          <el-option key="3" label="文章内容" value="content"></el-option>
          <el-option key="4" label="文章来源" value="source"></el-option>
        </el-select>

        <el-input v-model="query.info" placeholder="请输入文章信息" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>

      <!-- 新闻表格 -->
      <el-table
        :data="newsData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>

        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>

        <el-table-column prop="title" width="200" label="文章标题"></el-table-column>

        <el-table-column label="封面(点击查看大图)" align="center">
          <template slot-scope="scope">
            <el-image class="table-td-thumb" :src="scope.row.cover_path" :preview-src-list="[scope.row.cover_path]"></el-image>
          </template>
        </el-table-column>

        <el-table-column prop="source" label="来源"></el-table-column>

        <!-- <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.state === '成功' ? 'success' : scope.row.state === '失败' ? 'danger' : ''">{{
              scope.row.state
            }}</el-tag>
          </template>
        </el-table-column> -->

        <el-table-column prop="date" label="发布时间"></el-table-column>

        <el-table-column label="浏览数量" width="60" align="center">
          <template slot-scope="scope">{{ scope.row.count_viewed }}</template>
        </el-table-column>

        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 页码部分 -->
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="60%">
      <el-form ref="form" :model="form" label-width="70px">
        <!-- <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" rows="7" v-model="form.content"></el-input>
        </el-form-item> -->
        <el-form-item label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="内容">
          <el-input type="textarea" rows="5" v-model="form.content"></el-input>
        </el-form-item>

        <el-form-item label="来源">
          <el-input v-model="form.source"></el-input>
        </el-form-item>

        <el-form-item label="网络链接">
          <el-input v-model="form.link"></el-input>
        </el-form-item>

        <el-form-item label="封面路径">
          <el-input v-model="form.cover_path"></el-input>
        </el-form-item>

        <el-form-item label="类型">
          <el-select v-model="form.type" placeholder="请选择">
            <el-option key="bbk" label="时政类" value="时政类"></el-option>
            <el-option key="xtc" label="环保类" value="环保类"></el-option>
            <el-option key="imoo" label="生活类" value="生活类"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布日期">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%"></el-time-picker>
          </el-col>
        </el-form-item>

        <!-- <el-form-item label="城市级联">
            <el-cascader :options="options" v-model="form.options"></el-cascader>
          </el-form-item> -->

        <el-form-item label="是否可见">
          <el-switch v-model="form.status"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchData } from '../../api/index';
import { getNewsList, getItem } from '../../api/news.js';
// import { close } from 'inspector';
export default {
  name: 'basetable',
  data() {
    return {
      query: {
        type: '',
        address: '',
        name: '',
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      newsData: [
        {
          id: 1,
          title: '本报文章：农作物生物质如何资源化利用？这里有三点建议',
          date: '2022-4-15',
          count_viewed: 88,
          type: '环保类',
          date1: '2022-4-15',
          date2: '14:34',
          content: '这是内容这是内容这是内容这是内容这是内容',
          is_visible: true,
          source: '中国环保报',
          link: 'https://www.cenews.com.cn/',
          cover_path: 'https://res.cenews.com.cn/data2/1/images/2022/0402/16489036408311130_375x282.jpg'
        },
        {
          id: 2,
          title: '本报文章：农作物生物质如何资源化利用？这里有三点建议',
          content: '这是内容这是内容这是内容这是内容这是内容',
          date1: '2022-4-15',
          date2: '19:30:47',
          type: '环保类',
          count_viewed: 88,
          source: '中国环保报',
          is_visible: true,
          link: 'https://www.cenews.com.cn/',
          cover_path: 'https://res.cenews.com.cn/data2/1/images/2022/0402/16489036408311130_375x282.jpg'
        }
      ],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取 easy-mock 的模拟数据
    async getData() {
      const { lists } = await getNewsList();

      // console.log(lists);
      this.newsData = lists;
    },
    // 触发搜索按钮
    async handleSearch() {
      this.$set(this.query, 'pageIndex', 1);
      // console.log(this.query);

      // this.getData();
      const { list } = await getItem(this.query);
      this.newsData = list;
      console.log(this.newsData);
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.$message.success('删除成功');
          this.tableData.splice(index, 1);
        })
        .catch(() => {});
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delAllSelection() {
      const length = this.multipleSelection.length;
      let str = '';
      this.delList = this.delList.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' ';
      }
      this.$message.error(`删除了${str}`);
      this.multipleSelection = [];
    },
    // 编辑操作
    handleEdit(index, row) {
      console.log(row);

      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      this.$set(this.tableData, this.idx, this.form);
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val);
      this.getData();
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
