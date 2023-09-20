import Vue from "vue";
import App from "./App.vue";
import "./app.css";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App)
}).$mount("#app");

// Login - Completed by Kayleigh
const loginOpenBtn = document.querySelector("#login-open"),
  home = document.querySelector(".home"),
  formCloseBtn = document.querySelector(".form-close"),
  login = document.querySelector(".login"),
  temp = document.querySelector(".temp"),
  logOut = document.querySelector(".log-out");

// form open and close function
loginOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

// login & logout button function
login.addEventListener("click", () => temp.classList.add("hide"));
logOut.addEventListener("click", () => temp.classList.remove("hide"));
