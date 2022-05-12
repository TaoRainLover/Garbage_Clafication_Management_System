<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 分类管理 </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除</el-button>

        <el-select v-model="query.type" placeholder="垃圾类别" class="handle-select mr10">
          <el-option key="1" label="可回收物" value="1"></el-option>
          <el-option key="2" label="有害垃圾" value="2"></el-option>
          <el-option key="3" label="厨余垃圾" value="3"></el-option>
          <el-option key="4" label="其他垃圾" value="4"></el-option>
        </el-select>

        <el-input v-model="query.name" placeholder="请输入垃圾名称" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        :data="gc_data"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>

        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>

        <el-table-column prop="name" label="名称"></el-table-column>

        <el-table-column label="类别" align="center">
          <template slot-scope="scope">
            <el-tag>
              {{ scope.row.type == 1 ? '可回收物' : scope.row.type == 2 ? '有害垃圾' : scope.row.type == 3 ? '厨余垃圾' : '其他垃圾' }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="create_time" label="创建时间"></el-table-column>

        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status == 0 ? 'success' : 'danger'">{{ scope.row.status == 0 ? '正常' : '异常' }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">更新</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :page-sizes="[6, 10, 20]"
          :total="pageTotal"
          @current-change="handlePageChange"
          @pre-click="handlePageChange"
          @next-click="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="65%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="垃圾名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="所属类别">
          <el-radio-group v-model="form.type">
            <el-radio label="可回收物" style="color: #0099ff"></el-radio>
            <el-radio label="有害垃圾" style="color: #e4311f"></el-radio>
            <el-radio label="厨余垃圾" style="color: #4bae32"></el-radio>
            <el-radio label="其他垃圾" style="color: #ff9934"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="选择器">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option key="bbk" label="步步高" value="bbk"></el-option>
            <el-option key="xtc" label="小天才" value="xtc"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="创建日期">
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

        <el-form-item label="状态">
          <!-- 选择开关 -->
          <el-col :span="2">
            <el-switch style="width: 100%" v-model="form.status"> </el-switch>
          </el-col>

          <!-- 状态tag -->
          <el-col :span="12">
            <!-- <template style="width: 100%" slot-scope="scope"> -->
            <el-tag :type="form.status ? 'success' : 'danger'">{{ form.status == true ? '正常' : '异常' }}</el-tag>
            <!-- </template> -->
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">更 新</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchData } from '../../api/index';
import { search_by_text, search_by_type } from '../../api/gc.js';
export default {
  name: 'basetable',
  data() {
    return {
      query: {
        type: '',
        name: '',
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      gc_data: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 250,
      form: {},
      idx: -1,
      id: -1
    };
  },
  created() {
    // this.getData();
    this.get_list_type({ type: 1, pageIndex: 1, pageSize: 10 });
  },
  methods: {
    // 获取 easy-mock 的模拟数据
    getData() {
      fetchData(this.query).then((res) => {
        console.log(res);
        this.tableData = res.list;
        this.pageTotal = res.pageTotal || 50;
      });
    },

    get_list_type(params) {
      search_by_type(params).then((res) => {
        console.log(res);
        if (res.status == 0) this.gc_data = res.list;
      });
    },

    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, 'pageIndex', 1);
      // this.getData();
      console.log(this.query);

      if (this.query.name == '' && this.query.type == '') {
        this.$message.error('请完成输入');
      } else if (this.query.name == '' && this.query.type != '') {
        this.get_list_type(this.query);
      } else {
        search_by_text(this.query).then((res) => {
          console.log(res);
          if (res.status == 0) {
            this.gc_data = res.list;
          } else {
            this.$message.error(res.message);
          }
        });
      }
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
