<template>
  <div class="planWeek">
    <el-table
      :data="tableData"
      @cell-mouse-enter="hoverCall"
      border
      ref="multipleTable"
      style="width: 100%;"
      id="tabelStyle_planWeek"
    >
      <el-table-column type="index" fixed="left" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="name" label="名字" width="150" align="center"></el-table-column>
      <el-table-column :render-header="renderHeaderClick" align="center">
        <el-table-column
          v-for="(item,index) in dataLength"
          :key="index"
          :render-header="renderHeader"
          align="center"
        >
          <template slot-scope="scope">
            <div
              @click="getCellClick(scope.row,index)"
              @mousedown="select(scope.row,$event)"
              @mouseup="update($event)"
              style="height100%;width:100%;user-select: none;-webkit-user-select: none;line-height:none;"
              :id="popopClass(scope.row.id,index)"
              :class="{
            'color409EFF':scope.row.dateData[index].status==='0',
            'colorD7CDfD':scope.row.dateData[index].status==='√',
            'color9CCBFC':scope.row.dateData[index].status==='A',
            'colorFDD2C4':scope.row.dateData[index].status==='B'}"
            >{{scope.row.dateData[index].status}}</div>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <div>{{clickIndex}}</div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      dataLength: ['一 5-22', '二 5-23', '三 5-24', '四 5-25', '五 5-26', '六 5-27', '日 5-28'],
      tableData: [
        {
          id: 1,
          name: '测试',
          dateData: [{
            date: '5-22',
            status: '√'
          },
          {
            date: '5-23',
            status: '√'
          },
          {
            date: '5-24',
            status: 'B'
          }, {
            date: '5-25',
            status: 'A'
          },
          {
            date: '5-26',
            status: 'A'
          },
          {
            date: '5-27',
            status: 'B'
          },
          {
            date: '5-28',
            status: 'B'
          }]
        }, {
          id: 2,
          name: '测试',
          dateData: [{
            date: '5-22',
            status: '√'
          },
          {
            date: '5-23',
            status: '√'
          },
          {
            date: '5-24',
            status: 'B'
          },
          {
            date: '5-25',
            status: 'A'
          },
          {
            date: '5-26',
            status: 'A'
          },
          {
            date: '5-27',
            status: 'B'
          },
          {
            date: '5-28',
            status: 'B'
          }]
        }
      ],
      clickIndex: null
    };
  },
  mounted () {
    // var dom = document.getElementById('tabelStyle_planWeek')
    // dom.addEventListener('mouseup', this.update)
  },
  computed: {},
  watch: {
  },
  methods: {
    // 鼠标按下
    select: function (row, event) {
      this.clickIndex = row.id;// 存下点击行
      this.preselection(row, event);// 进入预选
    },
    // 鼠标松开
    update: function (event) {
      this.clickIndex = null;// 关掉点击行的ID
      console.log(event, 'update>>event');
    },
    // 单元格hover进入事件
    hoverCall: function (row, column, cell, event) {
      if (event.which === 1 && row.id === this.clickIndex) { // 锁定状态为鼠标按下了，确定滑动的是在同一行
        // console.log(row); console.log(column); console.log(cell); console.log(event)
        this.preselection(row, event);// 进入预选
      }
    },
    // 进入预选状态
    preselection (row, event) {
      var element = document.elementFromPoint(event.pageX, event.pageY);// 找到鼠标点下DOM元素
      let elementId = element.id || element.childNodes[0].id;
      let Uindex = elementId.split('_')[1];
      console.log(row, elementId, 'row uindex');
      this.tableData.forEach(item => {
        if (item.id === row.id) {
          item.dateData[Uindex].status = '0';
        }
      });
    },
    // 单元格点击事件
    getCellClick (row, index) {
      // row.dateData[index].status = '0'
      // this.tableData.forEach(item => {
      //   if (row.id === item.id) {
      //     row = item
      //   }
      // })
    },
    // 日期更换上一页
    clickPub () {
      alert('1');
    },
    // 日期更换下一页
    clickSub () {
      alert('2');
    },
    renderHeaderClick (h, { column, $index }) { // 第一个表格头。可点击换日期
      let arr = this.dataLength;
      return [
        h('i', { 'class': 'el-icon-caret-left', on: { click: this.clickPub } }, []),
        h('span', {}, [`  ${arr[0].split(' ')[1]} - ${arr[arr.length - 1].split(' ')[1]}  `]),
        h('i', { 'class': 'el-icon-caret-right', on: { click: this.clickSub } }, [])];
    },
    renderHeader (h, { column, $index }) { // 第二个表格头，让日期和星期换行
      let arr = this.dataLength[$index];
      return [h('p', {}, [arr.split(' ')[0]]), h('p', {}, [arr.split(' ')[1]])];
    },
    popopClass (id, index) { // 给每个单元格加独特ID
      return id + 'm_' + index;
    }
  }
};
</script>
<style lang='less' scoped>
.planWeek {
  #tabelStyle_planWeek tbody tr:hover > td {
    background-color: white !important;
  }
  .el-table td,
  .el-table th {
    padding: 0 !important;
  }
  .cell {
    padding: 0 !important;
    div {
      padding: 12px 0 !important;
      line-height: 20px;
    }
  }
  .color409EFF {
    background-color: #409eff;
    color: #409eff;
  }
  .colorD7CDfD {
    background-color: #d7cdfd;
  }
  .color9CCBFC {
    background-color: #9ccbfc;
  }
  .colorFDD2C4 {
    background-color: #fdd2c4;
  }
  .el-icon-caret-left,
  .el-icon-caret-right {
    color: #409eff;
  }
  .popup {
    position: absolute;
    right: 0;
    top: 0;
    width: 120px;
    height: 120px;
    border: 1px solid #409eff;
    z-index: 999;
    display: none;
  }
}
</style>
