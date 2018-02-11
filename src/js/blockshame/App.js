import BlockchainFabrique from './BlockchainFabrique.js' ;

class App {
  constructor(){
    var numZeros = 2;
    this.generateChain(numZeros);
  }

  generateChain(numZeros){
    var ethalonString = "0x" ;
    for (var i = 0; i < numZeros; i++) {
      ethalonString += "0" ;
    }
    var validationClosure = hash => {
      var stringToInspect = hash.substring(0,2+numZeros);
      return stringToInspect === ethalonString ;
    }

    var data = ["Петя пьет", "Миша колется", "Петя передал мише 5 бетховенов", "Дарья пишет письмо на зону", "Наташу отбуратинили в кафе"];
    var fabrique = new BlockchainFabrique(validationClosure,data) ;
    fabrique.printBlockchain();

  }

}

export default App;
