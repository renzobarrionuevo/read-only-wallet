//transaction type
export interface TxHistory {
    txs: Tx[]
    tx_responses: TxResponse[]
    pagination: Pagination
    total: string
  }
  
  export interface Tx {
    body: Body
    auth_info: AuthInfo
    signatures: string[]
  }
  
  export interface Body {
    messages: Message[]
    memo: string
    timeout_height: string
    extension_options: ExtensionOption[]
    non_critical_extension_options: NonCriticalExtensionOption[]
  }
  
  export interface Message {
    type_url: string
    value: string
  }
  
  export interface ExtensionOption {
    type_url: string
    value: string
  }
  
  export interface NonCriticalExtensionOption {
    type_url: string
    value: string
  }
  
  export interface AuthInfo {
    signer_infos: SignerInfo[]
    fee: Fee
    tip: Tip
  }
  
  export interface SignerInfo {
    public_key: PublicKey
    mode_info: ModeInfo
    sequence: string
  }
  
  export interface PublicKey {
    type_url: string
    value: string
  }
  
  export interface ModeInfo {
    single: Single
    multi: Multi
  }
  
  export interface Single {
    mode: string
  }
  
  export interface Multi {
    bitarray: Bitarray
    mode_infos: ModeInfo2[]
  }
  
  export interface Bitarray {
    extra_bits_stored: number
    elems: string
  }
  
  export interface ModeInfo2 {
    single: Single2
    multi: Multi2
  }
  
  export interface Single2 {
    mode: string
  }
  
  export interface Multi2 {
    bitarray: Bitarray2
    mode_infos: string[]
  }
  
  export interface Bitarray2 {
    extra_bits_stored: number
    elems: string
  }
  
  export interface Fee {
    amount: Amount[]
    gas_limit: string
    payer: string
    granter: string
  }
  
  export interface Amount {
    denom: string
    amount: string
  }
  
  export interface Tip {
    amount: Amount2[]
    tipper: string
  }
  
  export interface Amount2 {
    denom: string
    amount: string
  }
  
  export interface TxResponse {
    height: string
    txhash: string
    codespace: string
    code: number
    data: string
    raw_log: string
    logs: Log[]
    info: string
    gas_wanted: string
    gas_used: string
    tx: Tx2
    timestamp: string
    events: Event2[]
  }
  
  export interface Log {
    msg_index: number
    log: string
    events: Event[]
  }
  
  export interface Event {
    type: string
    attributes: Attribute[]
  }
  
  export interface Attribute {
    key: string
    value: string
  }
  
  export interface Tx2 {
    auth_info: Fee
    type_url: string
    value: string
  }
  
  export interface Event2 {
    type: string
    attributes: Attribute2[]
  }
  
  export interface Attribute2 {
    key: string
    value: string
    index: boolean
  }
  
  export interface Pagination {
    next_key: string
    total: string
  }