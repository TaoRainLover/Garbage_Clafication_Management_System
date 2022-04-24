<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item> <i class="el-icon-lx-add"></i> 垃圾分类库管理 </el-breadcrumb-item>
        <el-breadcrumb-item>新增项目</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="垃圾名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="所属类别">
            <el-radio-group v-model="form.type">
              <el-radio label="可回收物" style="color: #0099ff"></el-radio>
              <el-radio label="有害垃圾" style="color: #e4311f"></el-radio>
              <el-radio label="厨余垃圾" style="color: #4cae32"></el-radio>
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

          <!-- <el-form-item label="城市级联">
            <el-cascader :options="options" v-model="form.options"></el-cascader>
          </el-form-item> -->

          <el-form-item label="状态">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>

          <!-- <el-form-item label="多选框">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="步步高" name="type"></el-checkbox>
              <el-checkbox label="小天才" name="type"></el-checkbox>
              <el-checkbox label="imoo" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item> -->

          <!-- <el-form-item label="文本框">
            <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
          </el-form-item> -->

          <el-form-item>
            <el-button type="primary" @click="onSubmit">提 交</el-button>
            <el-button>取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { addNewItem } from '../../api/gc.js';
export default {
  name: 'baseform',
  data() {
    return {
      form: {
        name: '',
        type: '可回收物',
        region: '',
        date1: '',
        date2: '',
        delivery: true,
        // type: ['步步高'],
        resource: '小天才'
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.form.name == '' || this.form.type == '' || this.form.date1 == '' || this.form.date2 == '' || this.delivery == '') {
        return this.$message.error('请填写完整信息');
      }
      let type = 1;
      if (this.form.type == '其他垃圾') type = 4;
      else if (this.form.type == '有害垃圾') type = 2;
      else type = 3;
      const params = {
        type,
        name: this.form.name
      };
      addNewItem(params).then((res) => {
        console.log(res);
        if (res.status == 0) return this.$message.success('提交成功！');
        this.$message.error('添加失败：' + res.message);
      });
    }
  }
};
</script>
