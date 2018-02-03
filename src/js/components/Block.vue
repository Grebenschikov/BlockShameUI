<template lang="html">
  <form class="form-horizontal" @submit.prevent="mine()">
    <fieldset>
      <div class="form-group">
        <label for="textArea" class="col-lg-2 control-label">Block</label>
        <div class="col-lg-10">
          <input type="text" class="form-control" v-model="state.block">
        </div>
      </div>
      <div class="form-group">
        <label for="textArea" class="col-lg-2 control-label">Nonce</label>
        <div class="col-lg-10">
          <input type="text" class="form-control" v-model="state.nonce">
        </div>
      </div>
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
      <div class="form-group row">
        <div class="col-md-10 col-md-offset-2">
          <input type="submit" name="" value="Fix" class="btn btn-primary btn-md">
        </div>
      </div>
    </fieldset>
  </form>
</template>

<script>
// Дальше в этом контексте будут доступны аргументы, которые мы передали в
// App
// они будут доступны через this.$props.state
// за примером пиздуйте в Hash.vue
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
      console.log('Fixing');
    }
  }
}
</script>

<style lang="css">
</style>
