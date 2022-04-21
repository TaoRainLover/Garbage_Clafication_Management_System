<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item> <i class="el-icon-lx-add"></i> 新闻阅读材料管理 </el-breadcrumb-item>
        <el-breadcrumb-item>添加新闻</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="内容">
            <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
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
            <el-select v-model="form.region" placeholder="请选择">
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
            <el-switch v-model="form.is_visible"></el-switch>
          </el-form-item>

          <!-- <el-form-item label="多选框">
            <el-checkbox-group v-model="form.type">
              <el-checkbox label="步步高" name="type"></el-checkbox>
              <el-checkbox label="小天才" name="type"></el-checkbox>
              <el-checkbox label="imoo" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item> -->

          <!-- <el-form-item label="单选框">
            <el-radio-group v-model="form.resource">
              <el-radio label="步步高"></el-radio>
              <el-radio label="小天才"></el-radio>
              <el-radio label="imoo"></el-radio>
            </el-radio-group>
          </el-form-item> -->

          <el-form-item>
            <el-button type="primary" @click="onSubmit">表单提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'baseform',
  data() {
    return {
      options: [
        {
          value: 'guangdong',
          label: '广东省',
          children: [
            {
              value: 'guangzhou',
              label: '广州市',
              children: [
                {
                  value: 'tianhe',
                  label: '天河区'
                },
                {
                  value: 'haizhu',
                  label: '海珠区'
                }
              ]
            },
            {
              value: 'dongguan',
              label: '东莞市',
              children: [
                {
                  value: 'changan',
                  label: '长安镇'
                },
                {
                  value: 'humen',
                  label: '虎门镇'
                }
              ]
            }
          ]
        },
        {
          value: 'hunan',
          label: '湖南省',
          children: [
            {
              value: 'changsha',
              label: '长沙市',
              children: [
                {
                  value: 'yuelu',
                  label: '岳麓区'
                }
              ]
            }
          ]
        }
      ],
      form: {
        title: '',
        content: '',
        date: '',
        source: '',
        link: '',
        cover_path: '',
        // type: ['步步高'],
        type: '环保类',
        is_visible: true
      }
    };
  },
  methods: {
    onSubmit() {
      this.$message.success('提交成功！');
    }
  }
};
</script>
