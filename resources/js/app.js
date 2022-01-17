require("./bootstrap");

import Alpine from "alpinejs";

window.Alpine = Alpine;

Alpine.start();

window.Vue = require("vue").default;
import moment from "moment";

import Form from "vform";
window.Form = Form;
import {
    Button,
    HasError,
    AlertError,
    AlertErrors,
    AlertSuccess,
} from "vform/src/components/bootstrap5";
// 'vform/src/components/bootstrap4'
// 'vform/src/components/tailwind'

Vue.component(Button.name, Button);
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
Vue.component(AlertErrors.name, AlertErrors);
Vue.component(AlertSuccess.name, AlertSuccess);

// import { Form, HasError, AlertError } from "vform";

// SweetAlert

import Swal from "sweetalert2";
window.Swal = Swal;

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

window.Toast = Toast;

// Progress bar
import VueProgressBar from "vue-progressbar";
Vue.use(VueProgressBar, {
    color: "rgb(143, 255, 199)",
    failedColor: "red",
    thickness: "3px",
});

// Vue.use(VueProgressBar, options);
// const options = {
//     color: "#bffaf3",
//     failedColor: "#874b4b",
//     thickness: "5px",
//     transition: {
//         speed: "3s",
//         opacity: "0.6s",
//         termination: 300,
//     },
//     autoRevert: true,
//     location: "left",
//     inverse: false,
// };

// ===========

// window.Form = Form;
// Vue.component(HasError.name, HasError);
// Vue.component(AlertError.name, AlertError);

import VueRouter from "vue-router";
import Vue from "vue";
// import routes from './routes'
// C:\laragon\www\example-app\node_modules\vform\src\components\bootstrap5
// node_modules\vform\src\components\bootstrap5

Vue.use(VueRouter);

const routes = [
    {
        path: "/dashboard",
        component: require("./components/Dashboard.vue").default,
    },
    {
        path: "/profile",
        component: require("./components/Profile.vue").default,
    },
    { path: "/users", component: require("./components/Users.vue").default },
];

// const router = new VueRouter(routes)

const router = new VueRouter({
    routes: routes,
    mode: "history",
});

// componenta

Vue.component(
    "example-component",
    require("./components/ExampleComponent.vue").default
);

const app = new Vue({
    el: "#app",
    router,
});

// Filtre

Vue.filter("upText", function (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
});

Vue.filter("myDate", function (created) {
    return moment(created).format("MMMM Do YYYY");
});
// import VeeValidate from "vee-validate";

// Vue.use(VeeValidate);

// http request
window.Fire = new Vue();

// https://getbootstrap.com/docs/5.1/components/modal/

// var myModal = document.getElementById('myModal')

// myModal.addEventListener('show.bs.modal', function (event) {
//   if (!data) {
//     return event.preventDefault() // stops modal from being shown
//   }
// });
