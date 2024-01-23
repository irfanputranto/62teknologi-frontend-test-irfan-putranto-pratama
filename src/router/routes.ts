import { RouteRecordRaw } from "vue-router";
import Landing from "../views/Landing.vue";
import AboutVue from "../views/About.vue";
import Details from "../views/Details.vue";

const routes: RouteRecordRaw[] = [
    { path: '/', component: Landing },
    {
        path: '/details/:id',
        component: Details,
        name: 'details',
        props: true
    },
    { path: '/about', component: AboutVue }
];

export default routes;