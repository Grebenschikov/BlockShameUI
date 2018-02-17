<template lang="html">
  <form class="form-horizontal" @submit.prevent="mine()">
    <fieldset>
      <div class="form-group">
        <label for="textArea" class="col-lg-2 control-label">Data</label>
        <div class="col-lg-10">
          <textarea class="form-control" rows="3" id="textArea" v-model="state.data"></textarea>
        </div>
      </div>
      <div class="form-group">
        <label for="textArea" class="col-lg-2 control-label">Hash</label>
        <div class="col-lg-10">
          <input type="text" class="form-control" v-model="state.hash" disabled="disabled">
        </div>
      </div>
    </fieldset>
  </form>
</template>

<script>
import {Hash} from '../blockshame';

export default {
  data(){
    return {
      state:{
        data:"",
        hash:null
      }
    }
  },
  mounted(){
    this.updateHash();
  },
  methods: {
    calcHash(){
      return new Hash(this.state.data);
    },
    updateHash(){
      this.state.hash = this.calcHash();
    }
  },
  watch: {
  	'state.data': function() {
      this.updateHash();
    },
  }
}
</script>
