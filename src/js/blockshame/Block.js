import Hash from './Hash.js';

class Block {

	/*public*/
	constructor(index, timestamp, data, hashValidationClosure ) {
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = "";
		this.nonce = 0;
		this.hash = this.calculateHash();
		this.hashValidationClosure = hashValidationClosure ;
	}


	mine(){
		var nonceAccumulator = 0 ;

		while (true) {
			this.nonce = nonceAccumulator ;
			var hash = this.calculateHash();
			if ( this.hashValidationClosure(hash) ){
				this.hash = hash ;
				break ;
			}

			nonceAccumulator ++ ;
		}
	}

	calculateHash(){
		return new Hash(this.index+this.timestamp+this.data+this.previousHash+this.nonce);
	}

	isBlockValid(){
		return this.hashValidationClosure(this.hash);
	}

	isHashValid(){
		return this.hash.equal(this.calculateHash());
	}
}

export default Block;