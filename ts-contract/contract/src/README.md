## Detail


### Build contract

- Deploy contract:

```sh
npm run deploy
```

- Initialized

```sh
near call <contractId> init '{"owner_id": "<accountName>"}'
```

- Mint NFT

```sh
near call <contractId> mint '{"account_id": "<accountName>"}'
```


- Mint NFT

```sh
near call <contractId> mint '{"account_id": "<accountName>"}'
```

- Get token by id

```sh
near view <contractId> get_token_by_id '{"token_id": "<tokenId>"}'
```

- Get total supply

```sh
near view <contractId> get_total_supply
```