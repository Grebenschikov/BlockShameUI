<template lang="html">
  <form class="form-horizontal" @submit.prevent="fix()">
    <fieldset>
      <div class="form-group">
        <label for="textArea" class="col-lg-2 control-label">Block</label>
        <div class="col-lg-10">
          <input type="text" class="form-control" v-model="state.block" @keyup="dataDidChange">
        </div>
      </div>
      <div class="form-group">
        <label for="textArea" class="col-lg-2 control-label">Nonce</label>
        <div class="col-lg-10">
          <input type="text" class="form-control" v-model="state.nonce" @keyup="dataDidChange">
        </div>
      </div>
      <div class="form-group">
        <label for="textArea" class="col-lg-2 control-label">Data</label>
        <div class="col-lg-10">
          <textarea class="form-control" rows="3" id="textArea" v-model="state.data" @keyup="dataDidChange"></textarea>
        </div>
      </div>
      <div :class='"form-group " + (this.isHashCorrect?"":"has-error")'>
        <label for="textArea" class="col-lg-2 control-label">Hash</label>
        <div class="col-lg-10">
          <input type="text" class="form-control" v-model="state.hash" disabled="disabled">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-md-10 col-md-offset-2">
          <input type="submit" name="" value="Fix" class="btn btn-primary btn-md">
        </div>
      </div>
    </fieldset>
  </form>
</template>

<script>
import {Hash} from '../blockshame';
// Дальше в этом контексте будут доступны аргументы, которые мы передали в
// App
// они будут доступны через this.$props.state
// за примером пиздуйте в Hash.vue
export default {
  data(){
    return {
      state:{
        block:"1",
        nonce:"10",
        data:"Петя передал коле 5 бетховенов, коля оставил в парке закладку с веществами",
        hash: null
      },
      isHashCorrect : true
    }
  },
  mounted(){
    this.fix();
  },
  methods:{
    fix(){
        this.state.hash = this.calcHash();
        this.dataDidChange();
    },
    calcHash(){
      return new Hash(`${this.state.block}${this.state.nonce}${this.state.data}`);
    },
    dataDidChange(){
      this.isHashCorrect = this.calcHash().equal(this.state.hash) ;
    }
  }
}
</script>

<style lang="css">
</style>
