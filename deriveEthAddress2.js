// crbn backend early
const keccak256 = require("ethereumjs-util").keccak256;
const Buffer = require("buffer").Buffer;

const givenEthAddress = "0x627306090abab3a6e1400e9345bc60c78a8bef57";

const generatePublicKey = (curve, x, y) => {
  // Convert base64-encoded x and y to buffers
  const xBuffer = Buffer.from(x, "hex");
  const yBuffer = Buffer.from(y, "hex");

  // Concatenate x and y buffers to form the uncompressed public key
  const uncompressedPubKeyBuffer = Buffer.concat([
    // Buffer.from([0x04]),
    xBuffer,
    yBuffer,
  ]);

  // Hash the public key using keccak-256
  const pubKeyHash = keccak256(uncompressedPubKeyBuffer);

  // Take the last 20 bytes of the hash to get the Ethereum address
  const walletAddress = pubKeyHash.slice(-20);

  // Convert the address to a hexadecimal string
  const prefixedWalletAddressHex = `0x${walletAddress.toString("hex")}`;

  console.log("Ethereum Address:", prefixedWalletAddressHex);
  console.log(
    "Is the Ethereum Address correct?",
    prefixedWalletAddressHex === givenEthAddress
  );

  const walletData = {
    curve,
    x,
    y,
    address: prefixedWalletAddressHex,
  };

  return walletData;
};

// x and y coordinates are from the public key in deriveEthAddress.js ( givenEthAddress )
const walletData = generatePublicKey(
  "secp256k1",
  "af80b90d25145da28c583359beb47b21796b2fe1a23c1511e443e7a64dfdb27d",
  "7434c380f0aa4c500e220aa1a9d068514b1ff4d5019e624e7ba1efe82b340a59"
);

console.log(walletData);
