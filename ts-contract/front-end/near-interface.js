export class Contract {
	constructor({ contractId, walletToUse }) {
		this.contractId = contractId;
		this.wallet = walletToUse;
	}

  async mintNFT() {    
    // use the wallet to send the greeting to the contract
    await this.wallet.callMethod({ 
    	method: 'mint_nft',
  	 	args: { account_id: this.wallet.accountId }, 
  	 	contractId: this.contractId 
	 	})
  }

  async getTokenById(tokenId) {
    // use the wallet to query the contract's greeting
    return await this.wallet.viewMethod({ 
      method: 'get_total_supply', 
      contractId: this.contractId  
    })
  }

	async getTokenById(tokenId) {
    // use the wallet to query the contract's greeting
    return await this.wallet.viewMethod({ 
      method: 'get_token_by_id', 
      args: { token_id: tokenId }, 
      contractId: this.contractId  
    })
  }
}