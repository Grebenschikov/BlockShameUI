import SHA256 from 'crypto-js/sha256';

class Hash {
  /*
  процедура вычисления хеша - возвращает в 16 ричном формате мгновенный хеш блока
  */
  calculateHash(inputData) {
    var hashObject = SHA256(inputData);
    return this.getHexHashString(hashObject);
  }
  /* ====
    private
   ==== */
  /*
    возвращает 16 ричное число с 0x в начале
  */
  getHexHashString(hashArray) {
    return "0x" + hashArray.words.map(function(x) {
      x = x + 0xFFFFFFFF + 1; // twos complement
      x = x.toString(16); // to hex
      x = ("00000000" + x).substr(-8); // zero-pad to 8-digits
      return x
    }).join('');
  }
}
export default Hash;
