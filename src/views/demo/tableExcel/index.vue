<template>
  <div>
    <el-button @click="exportExcel">表格导出EXCEL</el-button>
    <el-table :data="tableData" class="myTable" style="margin-top: 30px;">
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="性别" prop="sex"></el-table-column>
      <el-table-column label="职业" prop="job"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import FileSaver from 'file-saver';
import XLSX from 'xlsx';
import * as apis from '@/views/demo/apis/';
export default {
  data () {
    return {
      tableData: [
        {
          name: 'Tom',
          age: 24,
          sex: '男',
          job: '前端开发'
        },
        {
          name: 'Jerry',
          age: 25,
          sex: '男',
          job: '后端开发'
        }
      ]
    };
  },
  created () {
    apis.tencentApi()
      .then(resData => {
        console.log(resData, 'resData');
      })
      .catch(err => {
        console.log(err, 'err');
      });
  },
  methods: {
    exportExcel () {
      var wb = XLSX.utils.table_to_book(document.querySelector('.myTable'));

      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });

      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '表格导出EXCEL.xlsx');
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout);
      }

      return wbout;
    }
  }
};
</script>
