<template>
    <div>
      <div class="panel">
        <el-table :data="timetable" :span-method="objectSpanMethod" border
                  :header-cell-style="{background:'#d9e5fd', color:'black', fontWeight: 1000}"
                  :cell-style="tableCellStyle"
        >
          <el-table-column prop="sjd" label="时间段" width="80" align="center">
          </el-table-column>
          <el-table-column prop="jc" label="节次" width="80" align="center">
          </el-table-column>
          <el-table-column prop="mon" label="星期一" align="center">
            <template slot-scope="scope">
              <h4>{{ scope.row.mon.coursename }}</h4>
              <div v-html="scope.row.mon.address"></div>
            </template>
          </el-table-column>
          <el-table-column prop="tue" label="星期二" align="center">
            <template slot-scope="scope">
              <h4>{{ scope.row.tue.coursename }}</h4>
              <div v-html="scope.row.tue.address"></div>
            </template>
          </el-table-column>
          <el-table-column prop="wed" label="星期三" align="center">
            <template slot-scope="scope">
              <h4>{{ scope.row.wed.coursename }}</h4>
              <div v-html="scope.row.wed.address"></div>
            </template>
          </el-table-column>
          <el-table-column prop="thu" label="星期四" align="center">
            <template slot-scope="scope">
              <h4>{{ scope.row.thu.coursename }}</h4>
              <div v-html="scope.row.thu.address"></div>
            </template>
          </el-table-column>
          <el-table-column prop="fri" label="星期五" align="center">
            <template slot-scope="scope">
              <h4>{{ scope.row.fri.coursename }}</h4>
              <div v-html="scope.row.fri.address"></div>
            </template>
          </el-table-column>
          <el-table-column prop="sat" label="星期六" align="center">
            <template slot-scope="scope">
              <h4>{{ scope.row.sat.coursename }}</h4>
              <div v-html="scope.row.sat.address"></div>
            </template>
          </el-table-column>
          <el-table-column prop="sun" label="星期日" align="center">
            <template slot-scope="scope">
              <h4>{{ scope.row.sun.coursename }}</h4>
              <div v-html="scope.row.sun.address"></div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </template>
  <script>
  export default {
    props: {
      // 下午节次数
      afternoonLength: {
        type: [String, Number],
        default: 4
      },
      // 总节次
      length: {
        type: [String, Number],
        default: 12
      },
      // 课表数据
      events: {
        type: Array,
        default: null
      }
    },
    data () {
      return {
        // 课程表数据
        timetable: [],
        hoverOrderArr: [],
        weeks: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
      }
    },
    mounted () {
      this.mergeData()
    },
    watch: {
      events: {
        handler (newVal, oldVal) {
          this.mergeData()
        },
        deep: true
      }
    },

    created () {
      // 创建时调用初始化表格数据函数
      this.makeTimetable()
    },
    methods: {
      // 单元格添加背景色
      tableCellStyle (row) {
        if (row.columnIndex==0){
            switch(row.row['sjd']){
            case("上午"):
                return 'background-color:#FAE681;color: blue;'
            case("下午"):
                return 'background-color:#FFA101;color: blue;'
            case("晚上"):
                return 'background-color:#B3DEE5;color: blue;'
            }
        }
        if (row.row[row.column.property].coursename !== undefined) {
          return 'background-color:rgb(15 130 255 / 80%);color: #fff; border-radius:25% 10%;'
        }
      },
      // 构造课程表完整数据
      makeTimetable () {
        // 使表格对象数组为空
        this.timetable = []
        for (let i = 0; i < this.length; i++) {
          let one = {
            sjd: '',
            jc: i + 1,
            mon: {},
            tue: {},
            wed: {},
            thu: {},
            fri: {},
            sat: {},
            sun: {}
          }
          if (i < 4) {
            one.sjd = '上午'
          } else if (i > 3 && i < (this.afternoonLength + 4)) {
            one.sjd = '下午'
          } else {
            one.sjd = '晚上'
          }
          this.timetable.push(one)
        }
      },
      // 将接受的数据合并
      mergeData () {
        if (this.events.length > 0) {
          for (let i = 0; i < this.events.length; i++) {
            // 获取星期几
            let week = this.weeks[this.events[i].week - 1]
            this.timetable[this.events[i].start - 1][week] = this.events[i]
          }
        }
      },
      // 合并行或列的计算方法
      objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          // 第一列上午、下午、晚上分别占四行
          if (rowIndex < 4) {
            if (rowIndex === 0) {
              return {
                rowspan: 4,
                colspan: 1
              }
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          } else if (rowIndex > 3 && rowIndex < (4 + this.afternoonLength)) {
            if (rowIndex === 4) {
              return {
                rowspan: this.afternoonLength,
                colspan: 1
              }
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          } else {
            if (rowIndex === (4 + this.afternoonLength)) {
              return {
                rowspan: this.length - 4 - this.afternoonLength,
                colspan: 1
              }
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }
        }
        if (columnIndex === 2) {
          // 按照课程节数分配占的行数
          if (row.mon.coursename !== undefined) {
            // 如果有课则分配行数
            return {
              rowspan: row.mon.end - row.mon.start + 1,
              colspan: 1
            }
          } else {
            // 没有课则置空（1×1）
            return {
              rowspan: 1,
              colspan: 1
            }
          }
        }
        if (columnIndex === 3) {
          if (row.tue.coursename !== undefined) {
            return {
              rowspan: row.tue.end - row.tue.start + 1,
              colspan: 1
            }
          } else {
            return {
              rowspan: 1,
              colspan: 1
            }
          }
        }
        if (columnIndex === 4) {
          if (row.wed.coursename !== undefined) {
            return {
              rowspan: row.wed.end - row.wed.start + 1,
              colspan: 1
            }
          } else {
            return {
              rowspan: 1,
              colspan: 1
            }
          }
        }
        if (columnIndex === 5) {
          if (row.thu.coursename !== undefined) {
            return {
              rowspan: row.thu.end - row.thu.start + 1,
              colspan: 1
            }
          } else {
            return {
              rowspan: 1,
              colspan: 1
            }
          }
        }
        if (columnIndex === 6) {
          if (row.fri.coursename !== undefined) {
            return {
              rowspan: row.fri.end - row.fri.start + 1,
              colspan: 1
            }
          } else {
            return {
              rowspan: 1,
              colspan: 1
            }
          }
        }
        if (columnIndex === 7) {
          if (row.sat.coursename !== undefined) {
            return {
              rowspan: row.sat.end - row.sat.start + 1,
              colspan: 1
            }
          } else {
            return {
              rowspan: 1,
              colspan: 1
            }
          }
        }
        if (columnIndex === 8) {
          if (row.sun.coursename !== undefined) {
            return {
              rowspan: row.sun.end - row.sun.start + 1,
              colspan: 1
            }
          } else {
            return {
              rowspan: 1,
              colspan: 1
            }
          }
        }
      }
    }
  }
  </script>