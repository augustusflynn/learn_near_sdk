## Detail


### Build contract

- Deploy contract:

```sh
npm run deploy


>> Deploying contract
Starting deployment. Account id: dev-1673076905543-84122072609588, node: https://rpc.testnet.near.org, helper: https://helper.testnet.near.org, file: build/nft.wasm
Transaction Id 4wN7xrBskABJAYedQacsZqAk5MbsaePmJjx2yBdaxsqA
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/4wN7xrBskABJAYedQacsZqAk5MbsaePmJjx2yBdaxsqA
Done deploying to dev-1673076905543-84122072609588
```

- Initialized

```sh
near call dev-1673076905543-84122072609588 init '{"owner_id": "dev-1673076905543-84122072609588"}' --accountId dev-1673076905543-84122072609588


Scheduling a call: dev-1673076905543-84122072609588.init({"owner_id": "dev-1673076905543-84122072609588"})
Doing account.functionCall()
Transaction Id 7AXt1wVH9Ziaj6WZY4irT8nLuCvHnjTjmfwSg2F4cqjj
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/7AXt1wVH9Ziaj6WZY4irT8nLuCvHnjTjmfwSg2F4cqjj
''
```

- Mint NFT

```sh
near call dev-1673076905543-84122072609588 mint_nft '{"account_id": "dev-1673076905543-84122072609588"}' --accountId dev-1673076905543-84122072609588


Scheduling a call: dev-1673076905543-84122072609588.mint_nft({"account_id": "dev-1673076905543-84122072609588"})
Doing account.functionCall()
Transaction Id 6TAL87o6acieArkPvNNdxVzWE97qHniHVhtg1mS7F3ZA
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/6TAL87o6acieArkPvNNdxVzWE97qHniHVhtg1mS7F3ZA
1
```

- Get token by id

```sh
near view dev-1673076905543-84122072609588 owner_of_token '{"token_id": "1"}' --accountId dev-1673076905543-84122072609588


View call: dev-1673076905543-84122072609588.owner_of_token({"token_id": "1"})
'dev-1673076905543-84122072609588'
```

- Get total supply

```sh
near view dev-1673076905543-84122072609588 get_total_supply --accountId dev-1673076905543-84122072609588


View call: dev-1673076905543-84122072609588.get_total_supply()
1
```


