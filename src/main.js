// basic
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//custom style
import "./assets/style/transition.css"

// bootstrap
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import '../style/bootstrap.css';
import '../style/bootstrap-vue.css';

// primeVue
import PrimeVue from 'primevue/config';
import Ripple from 'primevue/ripple';
import BadgeDirective from 'primevue/badgedirective';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import "primevue/resources/themes/saga-blue/theme.css"
import "primevue/resources/primevue.min.css"
import "primeicons/primeicons.css"

// v-tooltip, loading
import VToolTip from 'v-tooltip';
import '../style/tooltip.css';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

//util
import interceptor from "./interceptor";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VToolTip);
Vue.use(Loading);

Vue.use(PrimeVue, { ripple: true });
Vue.use(ConfirmationService);
Vue.use(ToastService);
Vue.directive('ripple', Ripple);
Vue.directive('badge', BadgeDirective);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	interceptor,
	render: h => h(App)
}).$mount("#app");
