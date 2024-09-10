// https://medium.com/hackernoon/utilizing-cryptography-libraries-to-derive-ethereum-addresses-from-private-keys-1bedd1a85bd

const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const keccak256 = require("js-sha3").keccak256;

// Private Key and Public Ethereum address (from Ganache)
const givenPrivateKey =
  "c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3";
const givenEthAddress = "0x627306090abab3a6e1400e9345bc60c78a8bef57";

// Get secp256k1 generator point
const generatorPoint = ec.g;

// Public Key Coordinates calculated via Elliptic Curve Multiplication
// PublicKeyCoordinates = privateKey * generatorPoint
const pubKeyCoordinates = generatorPoint.mul(givenPrivateKey);

const x = pubKeyCoordinates.getX().toString("hex");
const y = pubKeyCoordinates.getY().toString("hex");

// Public Key = X and Y concatenated
const publicKey = x + y;
console.log(publicKey);
//af80b90d25145da28c583359beb47b21796b2fe1a23c1511e443e7a64dfdb27d7434c380f0aa4c500e220aa1a9d068514b1ff4d5019e624e7ba1efe82b340a59

// Use Keccak-256 hash function to get public key hash
const hashOfPublicKey = keccak256(new Buffer(publicKey, "hex"));
console.log(hashOfPublicKey);
// 3f704e8b0ee605967f55081f627306090abab3a6e1400e9345bc60c78a8bef57

// Convert hash to buffer
const ethAddressBuffer = new Buffer(hashOfPublicKey, "hex");

// Ethereum Address is '0x' concatenated with last 20 bytes
// of the public key hash
const ethAddress = ethAddressBuffer.slice(-20).toString("hex");
const ethAddressWithPrefix = `0x${ethAddress}`;

// Ethereum Address derived from private key
// is equal to the given address
console.log(ethAddressWithPrefix === givenEthAddress);
