//const envPath = __dirname + '/../../.env';

////check if env file exist
//const fs = require('fs');
//if (!fs.existsSync(envPath)) {
//  throw ("Env file not found. Plesae rename .env.example to .env.");
//}
//// load env config file
//const dotenv = require('dotenv').config({path: envPath});

//module.exports = {
//  HOST: process.env.DB_HOST,
//  USER: process.env.DB_USER,
//  PASSWORD: process.env.DB_PASSWORD,
//  DB: process.env.DB_DATABASE_NAME
//};

// module.exports = {
//   HOST: "localhost",
//   USER: "root",
//   PASSWORD: "123456",
//   DB: "testdb"
// };

const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

const keyVaultName = "nagasumukh2404-mp01-kv";
const url = `https://${keyVaultName}.vault.azure.net`;

async function getSecret(secretName) {
  const credential = new DefaultAzureCredential();
  const client = new SecretClient(url, credential);
  const secret = await client.getSecret(secretName);

  return secret.value;
}

module.exports = {
  // Use the getSecret function to fetch secrets from Azure Key Vault
  HOST: getSecret("DB_HOST"),
  USER: getSecret("DB_USER"),
  PASSWORD: getSecret("DB_PASSWORD"),
  DB: getSecret("DB_DATABASE_NAME"),
};

