<template>
    <div class="container">
      <table>
        <thead>
          <tr>
            <th>Tên Dự Án</th>
            <th>Ngày Bắt Đầu</th>
            <th>Ngày Kết Thúc</th>
            <th>Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in list_table_data" :key="data">
            <td>{{ data[0] }}</td>
            <td>{{ data[1] }}</td>
            <td>{{ data[2] }}</td>
            <td>{{ data[3] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
<script>
import { getData } from "/src/services/apiServices.js";
export default {
  async created() {
    await this.get_list_status_project();
  },
  data() {
    return {
      list_jobs: [],
      list_table_data: [],
      is_show_table: false,
    };
  },
  methods: {
    async get_list_status_project(){
      const response = await getData("/project/get_list_status_project/", {});
      let data = response.data
      this.list_table_data = data;
      this.is_show_table = true;
      // this.list_jobs = data
    },
  },
};
</script>
<style  scoped lang="scss">
.container {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

table {
	width: 100%;
	border-collapse: collapse;
	overflow: hidden;
	box-shadow: 0 0 20px rgba(0,0,0,0.1);
  grid-template-columns: minmax(150px, 1fr) minmax(120px, 1.37fr) minmax(120px, 1.37fr) minmax(10px, 1.7fr);

}

th,
td {
	padding: 15px;
	background-color: rgba(255,255,255,0.2);
	color: black;
}

th {
	text-align: left;
}

thead {
	th {
		background-color: #55608f;
	}
}

tbody {
	tr {
		&:hover {
			background-color: rgba(255,255,255,0.3);
		}
	}
	td {
		position: relative;
		&:hover {
			&:before {
				content: "";
				position: absolute;
				left: 0;
				right: 0;
				top: -9999px;
				bottom: -9999px;
				background-color: rgba(255,255,255,0.2);
				z-index: -1;
			}
		}
	}
}
</style>
