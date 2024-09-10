import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/Dashboard.vue";
import EmployeeView from "@/pages/Employee.vue";
import Notifications from "@/pages/Notifications.vue";
import Icons from "@/pages/Icons.vue";
import Level from "@/pages/Level.vue";
import Typography from "@/pages/Typography.vue";
import ContractView from "@/pages/Contract.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "employee",
        name: "employee",
        component: EmployeeView,
      },
      {
        path: "department",
        name: "department",
        component: Notifications,
      },
      {
        path: "job",
        name: "job",
        component: Icons,
      },
      {
        path: "level",
        name: "level",
        component: Level,
      },
      {
        path: "project",
        name: "project",
        component: Typography,
      },
      {
        path: "contract",
        name: "contract",
        component: ContractView,
      },
    ],
  },
  { path: "*", component: NotFound },
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
