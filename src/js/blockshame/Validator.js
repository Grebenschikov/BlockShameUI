class Validator{

  construct($blockchain){
    this.blockchain = $blockchain ;
  }

  rebuildChain(){
    const chainArray = this.blockchain.chain ;

    for (let i = 1; i < chainArray; i++) {
      const currentBlock = chainArray[i];
      const previousBlock = chainArray[i - 1];

      previousBlock.hash = currentBlock.calculateHash();
      currentBlock.previousHash = previousBlock.hash ;
    }
  }
}

export default Validator;
