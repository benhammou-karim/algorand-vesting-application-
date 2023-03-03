// NOTE: below we provide some example accounts.
// DON'T this account in any working environment because everyone can check it and use
// the private keys (this accounts are visible to everyone).

// NOTE: to be able to execute transactions, you need to use an active account with
// a sufficient ALGO balance.

/**
   Check our /docs/algob-config.md documentation (https://github.com/scale-it/algo-builder/blob/master/docs/guide/algob-config.md) for more configuration options and ways how to
  load a private keys:
  + using mnemonic
  + using binary secret key
  + using KMD daemon
  + loading from a file
  + loading from an environment variable
  + ...
*/

// ## ACCOUNTS USING mnemonic ##
const { mkAccounts, algodCredentialsFromEnv } = require("@algo-builder/algob");
let accounts = mkAccounts([
  {
    // This account is created using `make setup-master-account` command from our
    // `/infrastructure` directory. It already has many ALGOs
    name: "master",
    addr: process.env.VUE_APP_CREATOR_ADDR,
    mnemonic: process.env.VUE_APP_CREATOR_MNEMONIC,
  },
  {
    name: "team",
    addr: process.env.VUE_APP_TEAM_ADDR,
    mnemonic: process.env.VUE_APP_TEAM_MNEMONIC,
  },
  {
    name: "advisors",
    addr: process.env.VUE_APP_ADVISORS_ADDR,
    mnemonic: process.env.VUE_APP_ADVISORS_MNEMONIC,
  },
  {
    name: "private_investors",
    addr: process.env.VUE_APP_PRIVATE_INVESTORS_ADDR,
    mnemonic: process.env.VUE_APP_PRIVATE_INVESTORS_MNEMONIC,
  },
  {
    name: "company_reserves",
    addr: process.env.VUE_APP_COMPANY_RESERVES_ADDR,
    mnemonic: process.env.VUE_APP_COMPANY_RESERVES_MNEMONIC,
  }
]);

// ## ACCOUNTS loaded from a FILE ##
// const { loadAccountsFromFileSync } = require("@algo-builder/algob");
// const accFromFile = loadAccountsFromFileSync("assets/accounts_generated.yaml");
// accounts = accounts.concat(accFromFile);

/// ## Enabling KMD access
/// Please check https://github.com/scale-it/algo-builder/blob/master/docs/guide/algob-config.md#credentials for more details and more methods.

// process.env.$KMD_DATA = "/path_to/KMD_DATA";
// let kmdCred = KMDCredentialsFromEnv();
process.env.KMD_TOKEN = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
process.env.KMD_SERVER = "http://localhost";
process.env.KMD_PORT = 4002;

// ## Algod Credentials
// You can set the credentials directly in this file:

// ## config for indexer running on local
// const indexerCfg = {
//   host: "http://localhost",
//   port: 8980,
//   token: ""
// };

let defaultCfg = {
  host: "http://localhost",
  port: 4001,
  // Below is a token created through our script in `/infrastructure`
  // If you use other setup, update it accordignly (eg content of algorand-node-data/algod.token)
  token: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  // you can also pass token as an object
  // token: {
  //   "X-Algo-API-Token": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  // },
  accounts: accounts,
  // if you want to load accounts from KMD, you need to add the kmdCfg object. Please read
  // algob-config.md documentation for details.
  // kmdCfg: kmdCfg,
  // you can pass config of indexer (ideally it should be attached to this network's algod node)
  // indexerCfg: indexerCfg
};

/**
 * TESTNET CONFIG USING PURESTAKE
 */
 let accounts_testnet = mkAccounts([
  {
    // This account is created using `make setup-master-account` command from our
    // `/infrastructure` directory. It already has many ALGOs
    name: "master",
    addr: process.env.VUE_APP_ADDR_CREATOR_TESTNET,
    mnemonic: process.env.VUE_APP_MNEMONIC_CREATOR_TESTNET,
  },
  {
    name: "team",
    addr: process.env.VUE_APP_ADDR_TEAM_TESTNET,
    mnemonic: process.env.VUE_APP_MNEMONIC_TEAM_TESTNET,
  },
  {
    name: "advisors",
    addr: process.env.VUE_APP_ADDR_ADVISORS_TESTNET,
    mnemonic: process.env.VUE_APP_MNEMONIC_ADVISORS_TESTNET,
  },
  {
    name: "private_investors",
    addr: process.env.VUE_APP_ADDR_PRIVATEINVESTORS_TESTNET,
    mnemonic: process.env.VUE_APP_MNEMONIC_PRIVATEINVESTORS_TESTNET,
  },
  {
    name: "company_reserves",
    addr: process.env.VUE_APP_ADDR_COMPANY_RESERVES_TESTNET,
    mnemonic: process.env.VUE_APP_MNEMONIC_COMPANY_RESERVES_TESTNET,
  }
]);

let purestakeTestNetCfg = {
  host: "https://testnet-algorand.api.purestake.io/ps2",
  port: "",
  token:  {
		"X-API-Key": "your API key", // replace this with your API key
	},
  accounts: accounts_testnet
};

// You can also use Environment variables to get Algod credentials
// Please check https://github.com/scale-it/algo-builder/blob/master/docs/algob-config.md#credentials for more details and more methods.
// Method 1
process.env.ALGOD_ADDR = "127.0.0.1:4001";
process.env.ALGOD_TOKEN = "algod_token";
let algodCred = algodCredentialsFromEnv();

let envCfg = {
  host: algodCred.host,
  port: algodCred.port,
  token: algodCred.token,
  accounts: accounts,
};

module.exports = {
  networks: {
    default: defaultCfg,
    prod: envCfg,
    purestake: purestakeTestNetCfg,
  },
};
