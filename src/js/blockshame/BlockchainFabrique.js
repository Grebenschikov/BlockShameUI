import Moment from 'moment' ;
import Block from './Block.js' ;
import Blockchain from './Blockchain.js' ;

class BlockchainFabrique{

  constructor(hashValidationClosure,dataArray) {
    this.blockchain = new Blockchain();
    this.generateBlockchain(hashValidationClosure,dataArray);
  }

  generateBlockchain(hashValidationClosure,dataArray){
    for (var i = 1; i <= dataArray.length; i++) {
      var data = dataArray[i-1] ;
      var timestamp = Moment().format('YYYY-MM-DD HH:mm:ss') ;
      var block = new Block(i, timestamp, data, hashValidationClosure ) ;
      this.blockchain.addBlock(block) ;
    }
  }

  printBlockchain(){
    var blocksArray = this.blockchain.chain ;
    for (var i = 0; i < blocksArray.length; i++) {
      var block = blocksArray[i] ;
      console.log(block);
      console.log("<---------->");
    }

    var isValidChain = this.blockchain.isValidChain() ;
    console.log("Blockchain valid - %s", isValidChain);

  }
}

export default BlockchainFabrique;
