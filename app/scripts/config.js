const MAINET_RPC_URL = 'https://mainnet.infura.io/metamask'
const ROPSTEN_RPC_URL = 'https://ropsten.infura.io/metamask'
const KOVAN_RPC_URL = 'https://kovan.infura.io/metamask'
const RINKEBY_RPC_URL = 'https://rinkeby.infura.io/metamask'
/*
 * to set up the authentication we edited the module ../../node_modules/web3-provider-engine/subproviders/fetch.js
 * to make it work, the password must be encoded in base64 and sent in a header as 'Authorization': `Basic ${encoded-pass}`
*/
const GOLDIAM_RPC_URL = 'https://calypsum.io/mainnet'
const GOLDIAM_TEST_RPC_URL = 'https://testnet.goldiambox.io'
const LOCALHOST_RPC_URL = 'http://localhost:2009'

const MAINET_RPC_URL_BETA = 'https://mainnet.infura.io/metamask2'
const ROPSTEN_RPC_URL_BETA = 'https://ropsten.infura.io/metamask2'
const KOVAN_RPC_URL_BETA = 'https://kovan.infura.io/metamask2'
const RINKEBY_RPC_URL_BETA = 'https://rinkeby.infura.io/metamask2'

const DEFAULT_RPC = 'rinkeby'
const OLD_UI_NETWORK_TYPE = 'network'
const BETA_UI_NETWORK_TYPE = 'networkBeta'

global.METAMASK_DEBUG = 'GULP_METAMASK_DEBUG'

module.exports = {
  network: {
    localhost: LOCALHOST_RPC_URL,
    mainnet: MAINET_RPC_URL,
    ropsten: ROPSTEN_RPC_URL,
    kovan: KOVAN_RPC_URL,
    rinkeby: RINKEBY_RPC_URL,
    goldiam: GOLDIAM_RPC_URL,
    goldiamtest: GOLDIAM_TEST_RPC_URL,
  },
  // Used for beta UI
  networkBeta: {
    localhost: LOCALHOST_RPC_URL,
    mainnet: MAINET_RPC_URL_BETA,
    ropsten: ROPSTEN_RPC_URL_BETA,
    kovan: KOVAN_RPC_URL_BETA,
    rinkeby: RINKEBY_RPC_URL_BETA,
    goldiam: GOLDIAM_RPC_URL,
    goldiamtest: GOLDIAM_TEST_RPC_URL,
  },
  networkNames: {
    3: 'Ropsten',
    4: 'Rinkeby',
    42: 'Kovan',
    1426: 'Goldiam',
    1439: 'GoldiamTest',
  },
  enums: {
    DEFAULT_RPC,
    OLD_UI_NETWORK_TYPE,
    BETA_UI_NETWORK_TYPE,
  },
}
