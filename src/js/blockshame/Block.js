import Hash from './Hash.js';

class Block {

	/*public*/
	constructor(index, timestamp, data, hashValidationClosure ) {
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = "";
		this.nonce = 0;
		this.hash = "";
		this.hashValidationClosure = hashValidationClosure ;
	}


	mine(){
		var nonceAccumulator = 0 ;

		while (true) {
			this.nonce = nonceAccumulator ;
			var hashString = this.calculateHash();
			if ( this.hashValidationClosure(hashString) ){
				this.hash = hashString ;
				break ;
			}

			nonceAccumulator ++ ;
		}
	}

	calculateHash(){
		const hash = new Hash() ;
		return hash.calculateHash(this.index+this.timestamp+this.data+this.previousHash+this.nonce);
	}

	isHashValid(){
		return this.hash === this.calculateHash();
	}
}
export default Block;
