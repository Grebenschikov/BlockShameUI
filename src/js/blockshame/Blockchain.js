import Block from './Block.js';
import Moment from 'moment';

class Blockchain {

	constructor() {
		this.chain = this.createGenesisBlock();
	}

	createGenesisBlock() {
		let block = new Block(0, Moment().format('YYYY-MM-DD HH:mm:ss'), "Genesis block",()=>true);
		block.hash = block.calculateHash();
		return [block];
	}

	getLatestBlock()  {
		return this.chain[this.chain.length - 1];
	}

	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.mine() ;
		this.chain.push(newBlock);
	}

	isValidChain() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i - 1];
			if (currentBlock.hash != currentBlock.calculateHash()) { return false };
			if (currentBlock.previousHash != previousBlock.hash) { return false };
		}

		return true
	}
}

export default Blockchain;
