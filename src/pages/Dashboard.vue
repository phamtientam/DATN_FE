<template>
  <div>
    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-xl-3 item_dashboard" v-for="stats in itemMenu" :key="stats.title" @click="handleClick(stats)">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{ stats.title }}</p>
            {{ stats.value }}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{ stats.footerText }}
          </div>
        </stats-card>
      </div>
    </div>

    <!--Charts-->
    <div class="row">
      <div class="col-12">
        <chart-card
          v-if="this.show_chart_1"
          title="Trạng Thái Hợp Đồng Nhân Viên Theo Từng Tháng"
          sub-title="12 Month"
          :chart-data="usersChart.data"
          :chart-options="usersChart.options"
        >
          <span slot="footer"> <i class="ti-reload"></i> Updated 3 minutes ago </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Running
            <i class="fa fa-circle text-danger"></i> Expired
            <i class="fa fa-circle text-warning"></i> New
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-12">
        <chart-card
          v-if="this.show_chart_2"
          title="Tình Trạng Dự Án"
          sub-title="Status Project"
          :chart-data="preferencesChart.data"
          :chart-options="preferencesChart.options"
          chart-type="Pie"
        >
          <span slot="footer"> <i class="ti-timer"></i> Campaign set 2 days ago</span>
          <div slot="legend">
             <div>On Track : Dự Án Chuẩn Bị Về Đích</div>
             <br />
             <div>Off Track : Dự Án Đi Lệch Hướng</div>
             <br />
             <div>At Risk : Dự Án Có Nguy Cơ Thất Bại</div>
             <br />
             <div>On Hold : Dự Án Đang Chạy Bình Thường</div>
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-12">
        <chart-card
          v-if="this.show_chart_3"
          title="Số Lượng Dự Án Theo Từng Tháng"
          sub-title="Number Of Project By Month"
          :chart-data="activityChart.data"
          :chart-options="activityChart.options"
        >
          <span slot="footer"> <i class="ti-check"></i> Data information certified </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Số Lượng Dự Án
          </div>
        </chart-card>
      </div>
    </div>
  </div>
</template>
<script>
import { getData } from "/src/services/apiServices.js";
import { StatsCard, ChartCard } from "@/components/index";
import Chartist from "chartist";
export default {
  components: {
    StatsCard,
    ChartCard,
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  async created() {
    await this.get_data_menu_dashboard();
    await this.analyze_employee_active_by_month();
    await this.analyze_status_project();
    await this.analyze_number_of_project();
  },
  data() {
    return {
      show_chart_1: false,
      show_chart_2: false,
      show_chart_3: false,
      itemMenu: [
        {
          type: "warning",
          icon: "ti-user",
          title: "Employee",
          value: "",
          footerText: "Updated now",
          footerIcon: "ti-reload",
        },
        {
          type: "success",
          icon: "ti-credit-card",
          title: "Contract",
          value: "",
          footerText: "Last day",
          footerIcon: "ti-calendar",
        },
        {
          type: "danger",
          icon: "ti-pencil-alt",
          title: "Job",
          value: "",
          footerText: "In the last hour",
          footerIcon: "ti-timer",
        },
        {
          type: "info",
          icon: "ti-ruler-alt",
          title: "Level",
          value: "",
          footerText: "Updated now",
          footerIcon: "ti-reload",
        },
        {
          type: "info",
          icon: "ti-clipboard",
          title: "Project",
          value: "",
          footerText: "Updated now",
          footerIcon: "ti-reload",
        },
        {
          type: "info",
          icon: "ti-home",
          title: "Department",
          value: "",
          footerText: "Updated now",
          footerIcon: "ti-reload",
        },
      ],
      usersChart: {
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mai",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          series: [],
        },
        options: {
          low: 0,
          high: 1,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false,
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3,
          }),
          showLine: true,
          showPoint: false,
        },
      },
      activityChart: {
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mai",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          series: [],
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false,
          },
          height: "245px",
        },
      },
      preferencesChart: {
        data: {
          labels: [],
          series: [],
        },
        options: {
          colors: [
            '#28a745', // Màu cho 'text-success' (On Track)
            '#17a2b8', // Màu cho 'text-info' (On Hold)
            '#dc3545', // Màu cho 'text-danger' (At Risk)
            '#ffc107'  // Màu cho 'text-warning' (Off Track)
          ]
        }
      },
    };
  },
  methods: {
    handleClick(stats) {
      this.$router.push({ name: stats.title.toLowerCase() });
    },
    async get_data_menu_dashboard() {
      try {
        const response = await getData("/dashboard/data_menu_dashboard/", {});
        let data = response.data;
        this.itemMenu[0].value = data.employee + " " + "Employees";
        this.itemMenu[1].value = data.contract + " " + "Contracts";
        this.itemMenu[2].value = data.job + " " + "Jobs";
        this.itemMenu[3].value = data.level + " " + "Levels";
        this.itemMenu[4].value = data.project + " " + "Projects";
        this.itemMenu[5].value = data.department + " " + "Departments";
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async analyze_employee_active_by_month() {
      const response = await getData("/dashboard/analyze_employee_active_by_month/", {});
      let data = response.data;
      let data_series = []
      data_series[0] = data['running']
      data_series[1] = data['new']
      data_series[2] = data['expired']
      this.usersChart.data.series = data_series
      this.usersChart.options.high = data["max_height"]
      this.show_chart_1 = true
    },
    async analyze_status_project() {
      const response = await getData("/dashboard/analyze_status_project/", {});
      let data = response.data;
      this.preferencesChart.data.labels = data["labels"]
      this.preferencesChart.data.series = data["data"]
      this.show_chart_2 = true
    },
    async analyze_number_of_project() {
      const response = await getData("/dashboard/analyze_number_of_project/", {});
      let data = response.data;
      console.log(data["number_of_project"])
      let data_series = []
      data_series[0] = data["number_of_project"]
      this.activityChart.data.series = data_series
      this.show_chart_3 = true
    }
  },
};
</script>
<style>
.item_dashboard .card-body:hover{
  background-color: rgb(196, 181, 181);
  color: white;
  cursor: pointer;
  transform: scale(1.1);
  border-radius: 5px;
}
</style>
