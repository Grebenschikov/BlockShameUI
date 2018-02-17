<template lang="html">
<div class="">
  <div class="longRow">
    <form :class='"form-horizontal BlockChainCol "+((block.isBlockValid() || false)?"bcbg-success":"bcbg-warning")' v-for="block,i in state.blocks" @submit.prevent='mine(i)'>
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
            <input type="submit" name="" value="Mine" class="btn btn-primary btn-md" @click.prevent='mine(i)'>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
  <div class="container row">
    <form class="form-horizontal col-md-6" @submit.prevent="reloadData()">
      <fieldset>
        <div class="form-group">
          <label for="textArea" class="col-lg-2 control-label">Number of zeros</label>
          <div class="col-lg-4">
            <input type="text" class="form-control" v-model='numZeros'>
          </div>
          <div class="col-md-2">
            <input type="submit" name="" value="Apply" class="btn btn-primary btn-md">
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</div>
</template>

<script>
import blockshame, { Hash, BlockchainFabrique, Validator } from '../blockshame';

export default {
  data(){
    return {
      numberOfZeros:2,
      state:{
        blocks:[],
        blockchain:{}
      },
    }
  },
  mounted(){
    this.state.blocks = this.generateChain();
  },
  computed:{
    numZeros:{
      get:function(){
        return this.numberOfZeros;
      },
      set:function(newVal){
        if(Number(newVal) > 0){
          this.numberOfZeros = Number(newVal);
        }
      }
    }
  },
  methods:{
    generateChain(){
      const validationClosure = hash => {
        var zeros = this.numZeros;
        var words = hash.getWords();

        for (let word of words) {
          if (
            // fast check, если первый бит равен 1 (то есть число отрицательное),
            // значит слово не начинается с нуля
            word < 0
            ||
            word > (16 ** (8 - zeros))
          ) {
            return false;
          }

          zeros -= 8;
          if (zeros <= 0) {
            return true;
          }
        }

        return false;
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
      console.time('calculate-chain');
      this.state.blocks = this.generateChain();
      console.timeEnd('calculate-chain');
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
