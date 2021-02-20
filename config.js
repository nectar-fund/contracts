require('dotenv').config();

const MODE = process.env.MODE;

const WETH = process.env[MODE + "_WETH"];
const UNI = process.env[MODE + "_UNI"];
const UNI_FACTORY = process.env[MODE + "_UNI_FACTORY"];
const TOKEN_SUPPLY = process.env[MODE + "_TOKEN_SUPPLY"];
const LIST_UNI_TOKEN = process.env[MODE + "_LIST_UNI_TOKEN"];
const LIST_UNI_ETHER = process.env[MODE + "_LIST_UNI_ETHER"];

const EXPLORER_KEY = process.env.BSCSCAN_API_KEY;

const moduleExports = { MODE, WETH, UNI, UNI_FACTORY, TOKEN_SUPPLY, LIST_UNI_TOKEN, LIST_UNI_ETHER, EXPLORER_KEY};

Object.keys(moduleExports).forEach(i => {
    if (moduleExports[i] === undefined || moduleExports[i] === null) {
        console.log(`Value for ${i} not set, please set mode ${MODE}_${i} in .env`)
        process.exit(-1);
    };
})

module.exports = moduleExports;
