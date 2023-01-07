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
import { TokenId } from './helper';

@NearBindgen({})
class NFT {
  token_id: number;
  owner_id: AccountId;

  // Mapping from Token ID to owner id
  token_to_owner: LookupMap<string>;

  // Mapping from token ID to approved account id
  token_approvals: LookupMap<string>;

  // Mapping from owner to operator approvals
  operator_approvals: LookupMap<string>

  constructor() {
    this.token_id = 0;
    this.owner_id = "";
    this.token_to_owner = new LookupMap("to");
    this.token_approvals = new LookupMap("ta");
    this.operator_approvals = new LookupMap("oa");
  }

  @initialize({})
  init({ owner_id }: { owner_id: AccountId }) {
    this.owner_id = owner_id;
    this.token_id = 0;
    this.token_to_owner = new LookupMap("to");
    this.token_approvals = new LookupMap("ta");
    this.operator_approvals = new LookupMap("oa");
  }

  @call({})
  mint_nft({ account_id }: { account_id: AccountId }) {
    this.token_id++;
    this.token_to_owner.set(this.token_id.toString(), account_id);

    return this.token_id;
  }

  @view({})
  owner_of_token({ token_id }: { token_id: number }) {
    let token = this.token_to_owner.get(token_id.toString());
    if (token === null) {
      return null;
    }
    return token;
  }

  @view({})
  get_total_supply(): number {
    return this.token_id;
  }

  // implement later
  // _only_owner({
  //   owner_id,
  //   verify_id
  // }: {
  //   owner_id: AccountId,
  //   verify_id: AccountId
  // }): boolean {
  //   if (owner_id === verify_id) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  /******************/
  /* CHANGE METHODS */
  /******************/

  // Add an approved account for a specific token.
  //
  // Requirements
  // * Caller of the method must attach a deposit of at least 1 yoctoⓃ for
  //   security purposes
  // * Contract MAY require caller to attach larger deposit, to cover cost of
  //   storing approver data
  // * Contract MUST panic if called by someone other than token owner
  // * Contract MUST panic if addition would cause `nft_revoke_all` to exceed
  //   single-block gas limit. See below for more info.
  // * Contract MUST increment approval ID even if re-approving an account
  // * If successfully approved or if had already been approved, and if `msg` is
  //   present, contract MUST call `nft_on_approve` on `account_id`. See
  //   `nft_on_approve` description below for details.
  //
  // Arguments:
  // * `token_id`: the token for which to add an approval
  // * `account_id`: the account to add to `approved_account_ids`
  // * `msg`: optional string to be passed to `nft_on_approve`
  //
  // Returns void, if no `msg` given. Otherwise, returns promise call to
  // `nft_on_approve`, which can resolve with whatever it wants.
  @call({})
  nft_approve({
    token_id,
    operator_id
  }: {
    token_id: TokenId,
    operator_id: AccountId
  }): void {
    // verify onlyOwner or 'approved for all' account id
    // ...
    this.token_approvals.set(token_id.toString(), operator_id)
  }
  // Revoke an approved account for a specific token.
  //
  // Requirements
  // * Caller of the method must attach a deposit of 1 yoctoⓃ for security
  //   purposes
  // * If contract requires >1yN deposit on `nft_approve`, contract
  //   MUST refund associated storage deposit when owner revokes approval
  // * Contract MUST panic if called by someone other than token owner
  //
  // Arguments:
  // * `token_id`: the token for which to revoke an approval
  // * `account_id`: the account to remove from `approved_account_ids`
  @call({})
  nft_revoke({
    token_id
  }: {
    token_id: TokenId
  }) {
    // verify onlyOwner or 'approved for all' account id
    // ...
    this.token_approvals.remove(token_id.toString())
  }

  // Approve all approved accounts for a specific token.
  //
  // Requirements
  // * Caller of the method must attach a deposit of 1 yoctoⓃ for security
  //   purposes
  // * If contract requires >1yN deposit on `nft_approve`, contract
  //   MUST refund all associated storage deposit when owner revokes approved_account_ids
  // * Contract MUST panic if called by someone other than token owner
  //
  // Arguments:
  // * `token_id`: the token with approved_account_ids to revoke
  @call({})
  nft_approve_all({
    owner_id,
    operator_id,
    token_id
  }: {
    owner_id: AccountId,
    operator_id: AccountId,
    token_id: TokenId
  }) {
    // verify onlyOwner
    // ...
    if (this.token_to_owner.get(token_id.toString()) === owner_id) {
      this.operator_approvals.set(
        `${owner_id}|${operator_id}`,
        token_id.toString()
      );
    }
  }

  @call({})
  nft_revoke_all({
    owner_id,
    operator_id
  }: {
    owner_id: AccountId,
    operator_id: AccountId
  }) {
    // verify onlyOwner
    // ...
    this.operator_approvals.remove(`${owner_id}|${operator_id}`)
  }

  /****************/
  /* VIEW METHODS */
  /****************/

  // Check if a token is approved for transfer by a given account, optionally
  // checking an approval_id
  //
  // Arguments:
  // * `token_id`: the token for which to revoke an approval
  // * `approved_account_id`: the account to check the existence of in `approved_account_ids`
  // * `approval_id`: an optional approval ID to check against current approval ID for given account
  //
  // Returns:
  // if `approval_id` given, `true` if `approved_account_id` is approved with given `approval_id`
  // otherwise, `true` if `approved_account_id` is in list of approved accounts
  @view({})
  nft_is_approved(
    token_id: TokenId,
    operator_id: AccountId,
    owner_id: AccountId | null
  ): boolean {
    return (
      this.token_approvals.get(token_id.toString()) === operator_id ||
      this.operator_approvals.get(`${owner_id}|${operator_id}`) === token_id.toString()
    )
  }

  /******************/
  /* CHANGE METHODS */
  /******************/

  // Simple transfer. Transfer a given `token_id` from current owner to
  // `receiver_id`.
  //
  // Requirements
  // * Caller of the method must attach a deposit of 1 yoctoⓃ for security purposes
  // * Contract MUST panic if called by someone other than token owner or,
  //   if using Approval Management, one of the approved accounts
  // * `approval_id` is for use with Approval Management extension, see
  //   that document for full explanation.
  // * If using Approval Management, contract MUST nullify approved accounts on
  //   successful transfer.
  //
  // Arguments:
  // * `receiver_id`: the valid NEAR account receiving the token
  // * `token_id`: the token to transfer
  // * `approval_id` (optional): expected approval ID. A number smaller than
  //    2^53, and therefore representable as JSON. See Approval Management
  //    standard for full explanation.
  // * `memo` (optional): for use cases that may benefit from indexing or
  //    providing information for a transfer
  @call({})
  nft_transfer(
    receiver_id: AccountId,
    token_id: TokenId
  ) {
    // verify caller is owner or caller is approved to use nft
    // ...
    this.token_to_owner.set(token_id.toString(), receiver_id);
  }
}