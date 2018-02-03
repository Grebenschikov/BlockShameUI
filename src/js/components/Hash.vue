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
import blockshame from 'blockshame';
let hash = new blockshame.Hash();
export default {
  mounted(){
    this.updateHash();
  },
  props: ['state'],
  methods: {
    calcHash(){
      return hash.calculateHash(this.$props.state.data);
    },
    updateHash(){
      this.$props.state.hash = this.calcHash();
    }
  },
  watch: {
  	'state.data': function(newVal, oldVal) {
      this.updateHash();
    }
  }
}
</script>

<style lang="css">
</style>
