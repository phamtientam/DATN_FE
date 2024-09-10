<template>
  <div id="content">
    <div style="display: flex;">
      <div class="career-ladder">
        <div class="level" v-for="(level, index) in list_levels" :key="index" :data="level" @click="handleClick(level)" tabindex="0">
          <span>{{ level }}</span>
          <i class="status_i" :ref="'statusIcon' + index">→</i>
        </div>
      </div>
      <div class="chart_level">
        <div v-if="this.show_chart">
          <bar-chart
            :data="chartData"
            :options="chartOptions"
            style="margin:0 20px"
          ></bar-chart>
        </div>
      </div>
  </div>
  <div id="table_data" v-if="this.is_show_table">
      <button @click="close_table()">X</button>
      <table>
        <thead>
          <tr>
            <th>Họ Và Tên</th>
            <th>Phòng Ban</th>
            <th>Trình Độ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in list_table_data" :key="data">
            <td>{{ data[0] }}</td>
            <td>{{ data[1] }}</td>
            <td>{{ data[2] }}</td>
          </tr>
        </tbody>
      </table>
  </div>
</div>
</template>
<script>
import { getData } from "/src/services/apiServices.js";
import { Bar } from "vue-chartjs";
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement
);
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  BarElement,
} from "chart.js";
export default {
  components: {
    BarChart: Bar,
  },
  async created() {
    await this.analyze_count_level_by_employee();
  },
  data() {
    return {
      show_chart: false,
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Số Lượng Nhân Viên Theo Level",
            backgroundColor: "",
            borderColor: "",
            data: [],
          },
        ],
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                return "Value: " + tooltipItem.raw;
              },
            },
          },
        },
      },
      list_levels: ['Intern', 'Fresher', 'Junior', 'Middle', 'Senior', 'Technical'],
      list_table_data: [],
      is_show_table: false,
    }
  },
  methods: {
    getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    generateBackgroundColors(count) {
      const colors = [];
      for (let i = 0; i < count; i++) {
        colors.push(this.getRandomColor());
      }
      return colors;
    },
    async analyze_count_level_by_employee() {
      const response = await getData("/level/analyze_count_level_by_employee/", {});
      let data_res = response.data;
      this.chartData.datasets[0].data = data_res.data;
      this.chartData.labels = data_res.labels;
      const backgroundColors = this.generateBackgroundColors(data_res.data.length);
      this.chartData.datasets[0].backgroundColor = backgroundColors;
      this.show_chart = true
    },
    async handleClick(level_name) {
      const response = await getData("/level/get_employee_by_level/", {level_name});
      let data_res = response.data;
      this.list_table_data = data_res
      this.is_show_table =true
    },
    close_table() {
      this.is_show_table = false
    }
  },
};
</script>
<style>
#content {
  width: 100%;
}
.career-ladder {
  width: 30%;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.chart_level{
  width: 70%;
}

.level {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 10px;
  margin: 10px 0;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.level:hover {
  transform: translateX(10px);
  background-color: #e8f4f8;
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.2);
}

.level span {
  font-weight: bold;
  color: #333;
}

.level i {
  font-size: 20px;
  color: #007bff;
  transition: transform 0.3s ease;
}

.level:focus i {
  transform: rotate(90deg);
}
.bar-chart-container {
  width: 70%;
  margin: 0 0;
}
#table_data {
  margin: 100px 0px;
}
table {
  display: grid;
  border-collapse: collapse;
  min-width: 100%;
  grid-template-columns: 
    minmax(150px, 1fr)
    minmax(150px, 1.67fr)
    minmax(150px, 1.67fr)
}

thead,
tbody,
tr {
  display: contents;
}

th,
td {
  padding: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

th {
  position: sticky;
  top: 0;
  background: #6c7ae0;
  text-align: left;
  font-weight: normal;
  font-size: 1.1rem;
  color: white;
}

th:last-child {
  border: 0;
}

td {
  padding-top: 10px;
  padding-bottom: 10px;
  color: #808080;
}

tr:nth-child(even) td {
  background: #f8f6ff;
}
</style>
