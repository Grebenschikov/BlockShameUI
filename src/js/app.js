import boostrap from './boostrap';
import Vue from 'vue';
import App from './components/App.vue';

Vue.component('App',App);

let app = new Vue().$mount('#app');

window.App = app;
