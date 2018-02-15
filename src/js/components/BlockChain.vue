<template lang="html">
<div class="">
  <div class="longRow">
    <form :class='"form-horizontal BlockChainCol "+((block.isBlockValid() || false)?"bcbg-success":"bcbg-warning")' v-for="block,i in state.blocks">
      <fieldset>
        <div class="form-group">
          <label for="textArea" class="col-lg-4 control-label">Height</label>
          <div class="col-lg-8">
            <input type="text" class="form-control" v-model="block.index" @keyup='blockDidChange()'>
          </div>
        </div>
        <div class="form-group">
          <label for="textArea" class="col-lg-4 control-label">Timestamp</label>
          <div class="col-lg-8">
            <input type="text" class="form-control" v-model="block.timestamp" @keyup='blockDidChange()'>
          </div>
        </div>
        <div class="form-group">
          <label for="textArea" class="col-lg-4 control-label">Nonce</label>
          <div class="col-lg-8">
            <input type="text" class="form-control" v-model="block.nonce" @keyup='blockDidChange()'>
          </div>
        </div>
        <div class="form-group">
          <label for="textArea" class="col-lg-4 control-label">Data</label>
          <div class="col-lg-8">
            <textarea class="form-control" rows="3" id="textArea" v-model="block.data" @keyup='blockDidChange()'></textarea>
          </div>
        </div>
        <div class="form-group">
          <label for="textArea" class="col-lg-4 control-label">Prev Hash</label>
          <div class="col-lg-8">
            <textarea class="form-control" id="textArea" v-model="block.previousHash" disabled rows="3"></textarea>
          </div>
        </div>
        <div class="form-group">
          <label for="textArea" class="col-lg-4 control-label">Hash</label>
          <div class="col-lg-8">
            <textarea class="form-control" id="textArea" v-model="block.hash" disabled rows="3"></textarea>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-md-10 col-md-offset-2">
            <input type="submit" name="" value="Mine" class="btn btn-primary btn-md" @click='mine(i)'>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
  <div class="container row">
    <form class="form-horizontal col-md-6" @submit.prevent="fix()">
      <fieldset>
        <div class="form-group">
          <label for="textArea" class="col-lg-2 control-label">Number of zeros</label>
          <div class="col-lg-4">
            <input type="text" class="form-control" v-model='state.numZeros'>
          </div>
          <div class="col-md-2">
            <input type="submit" name="" value="Apply" class="btn btn-primary btn-md" @click='reloadData()'>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</div>
</template>

<script>
import blockshame, { Hash, BlockchainFabrique, Validator } from '../blockshame';

let hash = new Hash();

export default {
  data(){
    return {
      state:{
        blocks:[],
        numZeros:2,
        blockchain:{}
      },
    }
  },
  mounted(){
    this.state.blocks = this.generateChain();
  },

  methods:{
    generateChain(){
      var ethalonString = "0x" ;
      for (var i = 0; i < this.state.numZeros; i++) {
        ethalonString += "0" ;
      }

      const validationClosure = hash => {
        var stringToInspect = hash.substring(0,2+this.state.numZeros);
        return stringToInspect === ethalonString ;
      }

      var data = ["Петя пьет", "Миша колется", "Петя передал мише 5 бетховенов", "Дарья пишет письмо на зону", "Наташу отбуратинили в кафе"];
      var fabrique = new BlockchainFabrique(validationClosure, data) ;
      this.state.blockchain = fabrique.blockchain ;
      return fabrique.blockchain.chain ;
    },
    blockDidChange(){
      const validator = new Validator(this.state.blockchain) ;
      validator.rebuildChain();
    },
    mine(i){
      const block = this.state.blockchain.chain[i];
      block.mine();
      const validator = new Validator(this.state.blockchain) ;
      validator.rebuildChain();
    },
    reloadData(){
      this.state.blocks = this.generateChain();
    }
  }
}
</script>

<style lang="css">
  .BlockChainCol{
    display: inline-block;
    width: 430px;
    margin-right: 50px;
    border: 2px solid #bebebe;
    border-radius: 5px;
    padding: 20px;
    height: 570px;
  }
  .longRow{
    padding: 25px;
    white-space: nowrap;
    overflow: scroll;
    height: 620px;
  }
  .bcbg-success{
    background-color: #ddffdd;
  }
  .bcbg-warning{
    background-color: #ffdddd;
  }

  textarea {
    resize:none;
  }
</style>
