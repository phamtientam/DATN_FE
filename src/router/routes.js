import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import Login from "@/pages/Login.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import EmployeeView from "@/pages/Employee.vue";
import Department from "@/pages/Department.vue";
import Job from "@/pages/Job.vue";
import Level from "@/pages/Level.vue";
import Project from "@/pages/Project.vue";
import ContractView from "@/pages/Contract.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/login",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: { requiresAuth: true }
      },
      {
        path: "employee",
        name: "employee",
        component: EmployeeView,
      },
      {
        path: "department",
        name: "department",
        component: Department,
      },
      {
        path: "job",
        name: "job",
        component: Job,
      },
      {
        path: "level",
        name: "level",
        component: Level,
      },
      {
        path: "project",
        name: "project",  
        component: Project,
      },
      {
        path: "contract",
        name: "contract",
        component: ContractView,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
