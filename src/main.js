import "@/style/main.css";

// Import Vue
import Vue from 'vue';


// Import Vue App, routes, store
import store from "@/store/store"
import router from "@/router/router"
import App from './App';

import moment from 'moment';
Vue.prototype.$moment = moment;

window.eventBus = new Vue();


Vue.config.productionTip = false

new Vue({
    el: '#app',
    store: store, 
    router: router,
    render: h => h(App),
});
