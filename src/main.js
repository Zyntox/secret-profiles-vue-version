import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMars, faVenus, faSpinner, faFrownOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';

library.add(faMars);
library.add(faVenus);
library.add(faSpinner);
library.add(faFrownOpen);
Vue.component('font-awesome-icon', FontAwesomeIcon);


Vue.config.productionTip = false;
Vue.use(require('vue-moment'));

new Vue({
  render: h => h(App),
}).$mount('#app');
