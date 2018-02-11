<template lang="html">
    <div class="">
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">BlockShame</a>
          </div>

          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li
                v-for="page in pages"
                :class='getClassForPageLink(page)'
                @click="goTo(page)">
                <a href="#">{{ page }}</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div :is="pageName" :state="state[pageName]"/>
    </div>
</template>

<script>
import Hash from './Hash.vue';
import Block from './Block.vue';
import BlockChain from './BlockChain.vue';
// Когда мы добавляем новый компонент мы его сюда импортим
// типо как бля

//
export default {
  // затем компонент надо подключить к Vue
  // сделать это надо ниже
  components:{
    Hash, Block, BlockChain
    //, BlockChain
  },
  data(){
    return {
      pageName: "BlockChain",
      pages:[ 'Hash', 'Block', 'BlockChain', 'Distributed', 'Tokens', 'Coinbase'],
      state:{
        Hash: {
          data:"",
          hash:""
        },
        Block: {},
        BlockChain:{}
        // Последнее что нужно сделать,
        // это обозначть необходимый кусок глобального состояния
        // прямо вот тут
        /* BlockChain: {
          prop1: "nachalnoe_znachenie",
          prop2: "ewe_nachalnoe_znachenie",
          ITD..
        }
        */
      }
    }
  },
  methods:{
    goTo(page){
      this.pageName = page;
    },
    getClassForPageLink(page){
      let classStr = "p-2 text-dark router-link";
      if(this.pageName === page){
        classStr = `${classStr} active`;
      }
      return classStr;
    }
  }
}
</script>

<style lang="css">
  nav .is-active{
    font-weight: 600;
  }
  .router-link{
    cursor: pointer;
  }
</style>
