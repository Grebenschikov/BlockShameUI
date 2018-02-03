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
export default {
  data(){
    return {
      state:{
        block:"",
        nonce:"",
        data:"",
        hash:""
      }
    }
  },
  methods:{
    mine(){
      console.log('mining');
    }
  }
}
</script>

<style lang="css">
</style>
