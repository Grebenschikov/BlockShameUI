class Validator{
  constructor(blockchain){
    this.blockchain = blockchain ;
  }

  rebuildChain(){
    const chainArray = this.blockchain.chain ;

      for (let i = 1; i < chainArray.length; i++) {
      const currentBlock = chainArray[i];
      const previousBlock = chainArray[i - 1];
      previousBlock.hash = previousBlock.calculateHash();
      currentBlock.previousHash = previousBlock.hash;
      if( i == chainArray.length - 1 ){
        currentBlock.hash = currentBlock.calculateHash();
      }
    }
  }
}

export default Validator;
