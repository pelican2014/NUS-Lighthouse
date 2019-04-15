import Vue from 'vue';
import HighchartsVue from 'highcharts-vue';
import Vuetify from 'vuetify';
import VueFire from 'vuefire';
import BootstrapVue from 'bootstrap-vue';
import Highcharts from 'highcharts'; import Vuex from 'vuex';
import exportingInit from 'highcharts/modules/exporting';
import 'vuetify/dist/vuetify.min.css';
import App from './app/app';
import router from './app/router/router';
// import cors from 'cors';
// import Highcharts from 'highcharts';
import './styles/main.scss';
import { store } from './_store';
// Vue.use(cors());

exportingInit(Highcharts);

Vue.config.productionTip = process.env.NODE_ENV === 'production';

Vue.use(BootstrapVue);
Vue.use(HighchartsVue);
Vue.use(Highcharts);
Vue.use(Vuetify);
Vue.use(VueFire);
Vue.use(Vuex);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
