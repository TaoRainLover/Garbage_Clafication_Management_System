<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item> <i class="el-icon-lx-people"></i> 用户管理 </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-select v-model="query.type" placeholder="搜索方式" class="handle-select mr10">
          <el-option key="1" label="OPENID" value="openid"></el-option>
          <el-option key="2" label="用户昵称" value="nickname"></el-option>
        </el-select>

        <el-input v-model="query.info" placeholder="请输入用户名或者openid" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </div>
      <el-table
        :data="userData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
        <el-table-column prop="openid" label="OPENID" align="center"></el-table-column>
        <el-table-column prop="nickName" label="用户昵称"></el-table-column>

        <el-table-column label="头像(查看大图)" align="center">
          <template slot-scope="scope">
            <el-image class="table-td-thumb" :src="scope.row.avatarUrl" :preview-src-list="[scope.row.avatarUrl]"></el-image>
          </template>
        </el-table-column>

        <el-table-column label="积分数量">
          <template slot-scope="scope">{{ scope.row.credit }}</template>
        </el-table-column>

        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 0 ? 'success' : scope.row.status === 1 ? 'danger' : ''">{{
              scope.row.status === 0 ? '正常' : scope.row.status === 1 ? '异常' : ''
            }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="reg_time" label="注册时间"></el-table-column>

        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 底部页码 -->
      <div class="pagination">
        <el-pagination
          background
          layout="total,sizes, prev, pager, next, jumper"
          :current-page="1"
          :page-size="8"
          :page-sizes="[5, 8, 20]"
          :total="20"
          @current-change="handlePageChange"
          @pre-click="handlePageChange"
          @next-click="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
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
import { getUserList, query } from '../../api/user.js';

export default {
  name: 'basetable',
  data() {
    return {
      query: {
        type: 'openid',
        info: '',
        name: '',
        pageIndex: 1,
        pageSize: 6
      },
      userData: [
        {
          id: 1,
          openid: 'sjfjhfh-safjjf',
          nickname: 'rainlover',
          credit: 100,
          avatarUrl:
            'https://thirdwx.qlogo.cn/mmopen/vi_32/jHxzkmTaV0xCHepJKiajxTSzLtnlibr3f5Ktc6PR8LqrDOl1FDdzDdflXHF6p3yW7WvsWRcpfPAPWTJqw7A0Z6xQ/132',
          status: '正常',
          regTime: '2022-4-20'
        },
        {
          id: 1,
          openid: 'sjfjhfh-safjjf',
          nickname: 'rainlover',
          credit: 100,
          avatarUrl:
            'https://thirdwx.qlogo.cn/mmopen/vi_32/mcKlbUAgeHQfVXibqichMm8wpnf7sm3KVoVnDj7k6vJGgquAAFbsy53AjymstSxhZZIBRdpibV6Nycm00RWXVqk3Q/132',
          status: '正常',
          regTime: '2022-4-20'
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
    // console.log(this.tableData);
  },
  methods: {
    // 获取 easy-mock 的模拟数据
    async getData() {
      // fetchData(this.query).then((res) => {
      //   console.log(res);
      //   this.tableData = res.list;
      //   this.pageTotal = res.pageTotal || 50;
      // });
      const userList = await getUserList(this.query);
      // console.log(userList);
      this.userData = userList.data;
    },
    // 触发搜索按钮
    handleSearch() {
      if (this.query.info == '') return this.$message.error('输入不能为空！');
      this.$set(this.query, 'pageIndex', 1);
      // this.getData();
      query(this.query).then((res) => {
        // console.log(res);
        this.userData = res.list;
      });
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      })
        .then(() => {
          this.$message.success('删除成功');
          this.userData.splice(index, 1);
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
      console.log(val);

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
