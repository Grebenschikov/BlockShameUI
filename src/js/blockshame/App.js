import BlockchainFabrique from './BlockchainFabrique.js' ;

class App {
  constructor(){
    var numZeros = 2;
    this.generateChain(numZeros);
  }

  generateChain(numZeros){
    var validationClosure = hash => {
      var words = hash.getWords();

      for (let word of words) {
        if (
          // fast check, если первый бит равен 1 (то есть число отрицательное),
          // значит слово не начинается с нуля
          word < 0
          ||
          word > (16 ** (8 - numZeros))
        ) {
          return false;
        }

        numZeros -= 8;
        if (numZeros <= 0) {
          return true;
        }
      }

      return false;
    }

    var data = ["Петя пьет", "Миша колется", "Петя передал мише 5 бетховенов", "Дарья пишет письмо на зону", "Наташу отбуратинили в кафе"];
    var fabrique = new BlockchainFabrique(validationClosure,data) ;
    fabrique.printBlockchain();
}

export default App;
