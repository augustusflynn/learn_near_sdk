// Find all our documentation at https://docs.near.org
import { 
  NearBindgen, 
  near, 
  call, 
  view, 
  initialize,
  LookupMap
} from 'near-sdk-js';
import { AccountId } from 'near-sdk-js/lib/types';

@NearBindgen({})
class Contract {
  token_id: number;
  owner_id: AccountId;

  token_to_owner: LookupMap<string>; // 1 - N
  
  constructor() {
    this.token_id = 0;
    this.owner_id = "";
    this.token_to_owner = new LookupMap("o");
  }

  @initialize({})
  init({ owner_id, prefix }: { owner_id: AccountId, prefix: string }) {
    this.owner_id = owner_id;
    this.token_id = 0;
    this.token_to_owner = new LookupMap(prefix);
  }

  @call({})
  mint_nft({ account_id }: { account_id: AccountId }) {
    this.token_id++;
    this.token_to_owner.set(this.token_id.toString(), account_id);
        
    return this.token_id;
  }

  @view({})
  get_token_by_id({ token_id } : { token_id: number }) {
    let token = this.token_to_owner.get(token_id.toString());
    if (token === null) {
      return null;
    }
    return token;
  }

  @view({})
  get_total_supply() {
    return this.token_id;
  }

}