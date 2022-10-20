import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    children: [
      {
        path: "/departamentos",
        component: () => import("@/views/Departments.vue"),
        children: [
          {
            path: "",
            name: "DepartmentsIndex",
            component: () => import("@/views/Departments/Index.vue"),
          },
          {
            path: "nuevo",
            name: "DepartmentsCreate",
            component: () => import("@/views/Departments/Create.vue"),
          },
          {
            path: ":id/edit",
            name: "DepartmentsEdit",
            props: true,
            component: () => import("@/views/Departments/Edit.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
];


const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: "is-active",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("token");

  if (to.name !== "Login" && !token) {
    next({ name: "Login" });
  } else if (to.name == "Login" && token) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
