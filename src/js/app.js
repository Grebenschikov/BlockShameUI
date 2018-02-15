import boostrap from './boostrap';
import Vue from 'vue';
import App from './components/App.vue';
import VueRouter from 'vue-router';

import Hash from './components/Hash.vue';
import Block from './components/Block.vue';
import BlockChain from './components/BlockChain.vue';

const routes = [
  {path: '/', component: App, children:[
    {path:'hash', component:Hash},
    {path:'block', component:Block},
    {path: 'blockchain',component:BlockChain}
  ]}
];

Vue.use(VueRouter);
const router = new VueRouter({routes});
let app = new Vue({router}).$mount('#app');

window.App = app;
