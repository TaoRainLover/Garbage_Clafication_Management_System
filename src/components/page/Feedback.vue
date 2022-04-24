<template>
  <div class="">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-messagefill"></i> 用户反馈</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <el-tabs v-model="message">
        <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
          <el-table :data="unread" :show-header="false" style="width: 100%">
            <el-table-column>
              <template slot-scope="scope">
                <span class="message-title" @click="showDetail(scope.row)">【{{ scope.row.title }}】{{ scope.row.des }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="date" width="180"></el-table-column>

            <el-table-column width="120">
              <template slot-scope="scope">
                <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="handle-row">
            <el-button type="primary">全部标为已读</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="`已读消息(${read.length})`" name="second">
          <template v-if="message === 'second'">
            <el-table :data="read" :show-header="false" style="width: 100%">
              <el-table-column>
                <template slot-scope="scope">
                  <span class="message-title">【{{ scope.row.title }}】{{ scope.row.des }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="date" width="150"></el-table-column>
              <el-table-column width="120">
                <template slot-scope="scope">
                  <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="handle-row">
              <el-button type="danger">删除全部</el-button>
            </div>
          </template>
        </el-tab-pane>

        <el-tab-pane :label="`回收站(${recycle.length})`" name="third">
          <template v-if="message === 'third'">
            <el-table :data="recycle" :show-header="false" style="width: 100%">
              <el-table-column>
                <template slot-scope="scope">
                  <span class="message-title">【{{ scope.row.title }}】{{ scope.row.des }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="date" width="150"></el-table-column>
              <el-table-column width="120">
                <template slot-scope="scope">
                  <el-button @click="handleRestore(scope.$index)">还原</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="handle-row">
              <el-button type="danger">清空回收站</el-button>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 反馈内容弹出框 -->
    <el-dialog title="详情" align="center" :visible.sync="editVisible" width="60%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="类型:">
          <el-radio-group v-model="form.type">
            <el-radio label="系统问题"></el-radio>
            <el-radio label="意见反馈"></el-radio>
            <el-radio label="账号问题"></el-radio>
            <el-radio label="其他"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标题:">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="问题描述:">
          <el-input type="textarea" rows="10" v-model="form.des"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="saveEdit">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList, getReadList, getDeletedList } from '../../api/feedback.js';
export default {
  name: 'tabs',
  data() {
    return {
      editVisible: false,
      message: 'first',
      showHeader: false,
      unread: [],
      read: [],
      recycle: [],
      form: {
        title: '该系统将于今晚凌晨2点到5点进行升级维护',
        content: '这是内容这是内容这是内容这是内容这是内容这是内容这是内容',
        type: '系统问题'
      }
    };
  },
  methods: {
    handleRead(index) {
      const item = this.unread.splice(index, 1);
      console.log(item);
      this.read = item.concat(this.read);
    },
    handleDel(index) {
      const item = this.read.splice(index, 1);
      this.recycle = item.concat(this.recycle);
    },
    handleRestore(index) {
      const item = this.recycle.splice(index, 1);
      this.read = item.concat(this.read);
    },

    // 文章详情
    showDetail(detail) {
      this.editVisible = true;
      // console.log(detail);
      this.form = detail;
    },

    //
    saveEdit() {},

    // 获取未读消息列表
    async getLists() {
      const { list } = await getList();
      this.unread = list;
    },

    // 获取已读消息列表
    async getReadLists() {
      const { list } = await getReadList();
      this.read = list;
    },

    // 获取删除消息列表
    async getDeletedLists() {
      const { list } = await getDeletedList();
      this.recycle = list;
    }
  },
  computed: {
    unreadNum() {
      return this.unread.length;
    }
  },
  created() {
    this.getLists();
    this.getReadLists();
    this.getDeletedLists();
  }
};
</script>

<style>
.message-title {
  cursor: pointer;
}
.handle-row {
  margin-top: 30px;
}
</style>
