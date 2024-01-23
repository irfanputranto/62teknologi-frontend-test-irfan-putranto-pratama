import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/index.css'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './router/routes'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { createPinia } from 'pinia'


library.add(faSearch);

const pinia = createPinia();

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(pinia);

app.use(router).mount('#app')
