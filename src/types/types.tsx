export type ApiPrices = {
    [denom: string]: {
      usd: number;
      eur: number;
    };
    evmos: {
      usd: number;
      eur: number;
    };
    osmosis: {
      usd: number;
      eur: number;
    };
    "usd-coin": {
      usd: number;
      eur: number;
    };
    weth: {
      usd: number;
      eur: number;
    };
    tether: {
      usd: number;
      eur: number;
    };
  };
  
  export type CosmoBalance = {
    balances: Balance[];
    pagination: Pagination;
  };
  

  export type ETHBalance = {
    balances: Balance[];
  };

  export type Balance = {
    denom: string;
    amount: string;
  };
  
  export type Pagination = {
    next_key: any;
    total: string;
  };

  export type Item = {
    name: string;
    token: string;
    amount: string;
    priceUSD: string;
    priceEUR: string;
  };

