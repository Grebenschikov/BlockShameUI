import SHA256 from 'crypto-js/sha256';

class Hash {
  
  constructor(inputData) {
    this.hash = SHA256(inputData);
  }

  toString() {
    return this.string || (this.string = "0x" + this.hash.words.map(function(x) {
      x = x + 0xFFFFFFFF + 1; // twos complement
      x = x.toString(16); // to hex
      x = ("00000000" + x).substr(-8); // zero-pad to 8-digits
      return x
    }).join(''));
  }

  getWords() {
    return this.hash.words;
  }

  equal(another) {
    var current = this.getWords();
    var another = another.getWords();
    if (another.length !== current.length) {
      return false;
    }

    for (var i = 0; i < current.length; i++) {
      if (another[i] !== current[i]) {
        return false;
      }
    }

    return true;
  }
}
export default Hash;
