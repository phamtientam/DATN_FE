<template>
  <div class="body">
    <div id="list_button">
      <button @click="showChart_1">Số Lượng Hợp Đồng Theo Trạng Thái</button>
      <button @click="showChart_2">Số Lượng Hợp Đồng Theo Loại Hợp Đồng</button>
    </div>
    <div id="type_chart">
      <div>
        <h6>Select Type Chart</h6>
      </div>
      <select v-model="selectedChart">
        <option value="line">Biểu Đồ Đường</option>
        <option value="bar">Biểu Đồ Cột</option>
        <option value="pie">Biểu Đồ Tròn</option>
      </select>
    </div>
    <div id="type_color" v-if="selectedChart === 'line' || selectedChart === 'bar'">
      <div id="type_background">
        <div>
          <h6>Select Color Background</h6>
        </div>
        <select class="color-select" v-model="color_background">
          <option v-for="(color, code) in list_colors" :key="code" :value="code">
            {{ color }}
          </option>
        </select>
      </div>
      <div id="type_border">
        <div>
          <h6>Select Color Border</h6>
        </div>

        <select class="color-select" v-model="color_border">
          <option v-for="(color, code) in list_colors" :key="code" :value="code">
            {{ color }}
          </option>
        </select>
      </div>
    </div>

    <div v-if="show" :class="chartContainerClass">
      <line-chart
        :data="chartData"
        :options="chartOptions"
        v-if="selectedChart == 'line'"
      ></line-chart>
      <pie-chart
        :data="chartData"
        :options="chartOptions"
        v-if="selectedChart == 'pie'"
      ></pie-chart>
      <bar-chart
        :data="chartData"
        :options="chartOptions"
        v-if="selectedChart == 'bar'"
      ></bar-chart>
    </div>
  </div>
</template>

<script>
import { getData } from "/src/services/apiServices.js";
import { Line } from "vue-chartjs";
import { Pie } from "vue-chartjs";
import { Bar } from "vue-chartjs";
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

export default {
  components: {
    LineChart: Line,
    PieChart: Pie,
    BarChart: Bar,
  },
  data() {
    return {
      charShow: "",
      show: false,
      chartData: {
        labels: [],
        datasets: [
          {
            label: "",
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
      selectedChart: "line",
      list_colors: {
        "#FF5733": "Đỏ Cam",
        "#33FF57": "Xanh Lá",
        "#3357FF": "Xanh Dương",
        "#F1C40F": "Vàng",
        "#9B59B6": "Tím",
        "#E67E22": "Cam",
        "#1ABC9C": "Xanh Ngọc",
        "#3498DB": "Xanh Dương Sáng",
        "#2ECC71": "Xanh Lá Nhạt",
        "#F39C12": "Vàng Cam",
        "#D35400": "Cam Đậm",
        "#7F8C8D": "Xám",
        "#BDC3C7": "Xám Nhạt",
        "#C0392B": "Đỏ Đậm",
        "#8E44AD": "Tím Đậm",
        "#F5B041": "Vàng Cam Nhạt",
        "#48C9B0": "Xanh Ngọc Nhạt",
      },
      color_background: "#3357FF",
      color_border: "#3357FF",
    };
  },
  computed: {
    chartContainerClass() {
      return {
        "line-chart-container": this.selectedChart === "line",
        "pie-chart-container": this.selectedChart === "pie",
        "bar-chart-container": this.selectedChart === "bar",
      };
    },
  },
  watch: {
    color_background: "handleChartUpdate",
    color_border: "handleChartUpdate",
    selectedChart: "handleChartUpdate",
  },
  methods: {
    handleChartUpdate() {
      this.show = false;
      if (this.charShow === "showChart_1") {
        this.showChart_1();
      } else if (this.charShow === "showChart_2") {
        this.showChart_2();
      }
    },
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
    process_data_chart(response) {
      let data_res = response.data;
      if (this.selectedChart == "line" || this.selectedChart == "bar") {
        this.chartData.datasets[0].backgroundColor = this.color_background;
        this.chartData.datasets[0].borderColor = this.color_border;
      } else {
        const backgroundColors = this.generateBackgroundColors(data_res.data.length);
        this.chartData.datasets[0].backgroundColor = backgroundColors;
      }
      this.chartData.labels = data_res.title;
      this.chartData.datasets[0].data = data_res.data;
      this.chartData.datasets[0].label = data_res.label;
      if (data_res.title.length > 0 && data_res.data.length > 0) {
        this.show = !this.show;
      }
    },
    async showChart_1() {
      try {
        this.charShow = "showChart_1";
        const response = await getData("/contract/contract_by_status/", {});
        this.process_data_chart(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async showChart_2() {
      try {
        this.charShow = "showChart_2";
        const response = await getData("/contract/contract_by_contract_name/", {});
        this.process_data_chart(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>

<style scoped>
#list_button {
  display: flex;
}
#list_button button {
  margin: 0px 10px;
}
#type_chart {
  margin: 10px;
}
select {
  width: 200px;
  height: 45px;
  padding: 10px 15px;
  border: 2px solid #4caf50;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  font-size: 16px;
  font-family: Arial, sans-serif;
  appearance: none; /* Ẩn mũi tên mặc định trên các trình duyệt */
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Tạo mũi tên tùy chỉnh */
select::after {
  content: "▼";
  font-size: 12px;
  color: #4caf50;
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none; /* Để không can thiệp vào hành vi click của select */
}

/* Khi focus vào select */
select:focus {
  outline: none;
  border-color: #45a049;
}

/* CSS cho các tùy chọn trong thẻ option */
select option {
  padding: 10px;
  background-color: #fff;
  color: #333;
  font-size: 16px;
}

/* Màu nền khi di chuột qua tùy chọn */
select option:hover {
  background-color: #f1f1f1;
}

/* Màu nền khi tùy chọn được chọn */
select option:checked {
  background-color: #4caf50;
  color: #fff;
}
#type_color {
  margin: 10px;
  display: flex;
}
#type_color #type_border:last-child {
  margin: 0px 20px;
}
.line-chart-container {
  width: 70%;
  margin: 0 auto;
}
.pie-chart-container {
  width: 40%;
  margin: 0 auto;
}
.bar-chart-container {
  width: 70%;
  margin: 0 auto;
}
button {
	--border-radius: 24px;
	--border-width: 8px;
  width: 260px;
  height: 57px;
	appearance: none;
	position: relative;
	padding: 1em 2em;
	border: 0;
	background-color: transparent;
	font-family: "Montserrat", sans-serif;
	font-size: 12px;
	font-weight: 600;
	color: black;
}

button::after {
	--m-i: linear-gradient(#000, #000);
	--m-o: content-box, padding-box;

	content: "";
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	padding: var(--border-width);
	border-radius: var(--border-radius);
	background-image: conic-gradient(
		#488cfb,
		#29dbbc,
		#ddf505,
		#ff9f0e,
		#e440bb,
		#655adc,
		#488cfb
	);

	mask-image: var(--m-i), var(--m-i);
	mask-origin: var(--m-o);
	mask-clip: var(--m-o);
	mask-composite: exclude;
	-webkit-mask-composite: destination-out;

	filter: hue-rotate(0);
	animation: hue linear 500ms infinite;
	animation-play-state: paused;
}

button:hover::after {
	animation-play-state: running;
}

@keyframes hue {
	to {
		filter: hue-rotate(1turn);
	}
}

/* to have things in good shape */
*,
*::before,
*::after {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
</style>
