<template>
  <div style="margin: 24px">
    <a-table
      :bordered="true"
      :columns="tableColumn"
      :dataSource="tableData"
      :rowKey="record => record.index"
      size="small"
      :pagination="false"
    >
      <template v-for="item in 5" :slot="'month' + item" slot-scope="text, record">
        <div :key="item">
          <editable-cell
            v-if="record.title != '合计'"
            :text="text"
            :isEditable="true"
            @change="onCellChange(record, 'month' + item, $event, 'tableData')"
          />
          <!--合计行不可编辑，需要单独写，不然无法视图上无法显示-->
          <span v-else>{{text}}</span>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
import EditableCell from "./EditableCell.vue";
export default {
  name: "App",
  components: {
    EditableCell
  },
  data() {
    return {
      tableData: [
        { index: 0, title: "合计" },
        { index: 1, title: "费用1" },
        { index: 2, title: "费用2" },
        { index: 3, title: "费用3" },
        { index: 4, title: "费用4" },
        { index: 5, title: "费用5" }
      ],
      tableColumn: []
    };
  },
  mounted() {
    this.initTable();
  },
  methods: {
    initTable() {
      let array = [3]; //设置可编辑列
      this.tableColumn = [
        { title: "类别", align: "center", dataIndex: "title" },
        {
          title: "01",
          align: "center",
          dataIndex: "month1",
          width: 80,
          //判断该列是否可编辑
          scopedSlots: array.includes(1) ? { customRender: "month1" } : ""
        },
        {
          title: "02",
          align: "center",
          dataIndex: "month2",
          width: 80,
          scopedSlots: array.includes(2) ? { customRender: "month2" } : ""
        },
        {
          title: "03",
          align: "center",
          dataIndex: "month3",
          width: 80,
          scopedSlots: array.includes(3) ? { customRender: "month3" } : ""
        },
        {
          title: "04",
          align: "center",
          dataIndex: "month4",
          width: 80,
          scopedSlots: array.includes(4) ? { customRender: "month4" } : ""
        },
        {
          title: "05",
          align: "center",
          dataIndex: "month5",
          width: 80,
          scopedSlots: array.includes(5) ? { customRender: "month5" } : ""
        }
      ];
    },
    onCellChange(key, dataIndex, value, tableName) {
      var obj = {
        index: key.index,
        title: key.title
      };
      obj[dataIndex] = value;
      const dataSource = [...this[tableName]];
      const target = dataSource.find(item => item.index === key.index);
      if (target) {
        if (target[dataIndex] !== value) {
          target[dataIndex] = value;
          if (!dataSource[0][dataIndex]) {
            dataSource[0][dataIndex] = 0;
          }
          dataSource[0][dataIndex] += value * 1;
          this[tableName] = dataSource;
        }
      }
    }
  }
};
</script>
