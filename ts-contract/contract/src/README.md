## Detail


### Build contract

- Deploy contract:

```sh
npm run deploy


Starting deployment. Account id: dev-1672748799344-89158998807600, node: https://rpc.testnet.near.org, helper: https://helper.testnet.near.org, file: build/hello_near.wasm
Transaction Id EeGiuWBrDjcfahDnSNGGFNtXav4iBiybWs35YWjet6z4
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/EeGiuWBrDjcfahDnSNGGFNtXav4iBiybWs35YWjet6z4
Done deploying to dev-1672748799344-89158998807600
```

- Initialized

```sh
near call dev-1672748799344-89158998807600 init '{"owner_id": "dev-1672748799344-89158998807600", "prefix": "t"}' --accountId dev-1672748799344-89158998807600


Scheduling a call: dev-1672748799344-89158998807600.init({"owner_id": "dev-1672748799344-89158998807600", "prefix": "t"})
Doing account.functionCall()
Transaction Id EGdFwCmywfYqPKDwcHRN5kj2DkJ1LkzEN2twBsTk8QJE
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/EGdFwCmywfYqPKDwcHRN5kj2DkJ1LkzEN2twBsTk8QJE
''
```

- Mint NFT

```sh
near call dev-1672748799344-89158998807600 mint_nft '{"account_id": "dev-1672748799344-89158998807600"}' --accountId dev-1672748799344-89158998807600

Scheduling a call: dev-1672748799344-89158998807600.mint_nft({"account_id": "dev-1672748799344-89158998807600"})
Doing account.functionCall()
Transaction Id BFFu7i12C2rArJ8xLu4FPzeodkeLXfBdQJakp2nVDBdw
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/BFFu7i12C2rArJ8xLu4FPzeodkeLXfBdQJakp2nVDBdw
1
```

- Get token by id

```sh
near view dev-1672748799344-89158998807600 get_token_by_id '{"token_id": "1"}' --accountId dev-1672748799344-89158998807600

View call: dev-1672748799344-89158998807600.get_token_by_id({"token_id": "1"})
'dev-1672748799344-89158998807600'
```

- Get total supply

```sh
near view dev-1672748799344-89158998807600 get_total_supply --accountId dev-1672748799344-89158998807600

1
```