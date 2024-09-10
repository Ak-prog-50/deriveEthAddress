// most comprehensive and to the point version of the code

/**
 --- How to get the wallet address given the x and y coordinates of a public key? ---
  1. combine the x and y coordinates of the public key to get the uncompressed public key ( optionally add the prefix 0x04 to indicate that it is uncompressed )
  2. hash the uncompressed public key using keccak-256 ( slice the first byte of the hash if it is 0x04 )
  3. take the last 20 bytes of the hash to get the wallet address

*/

const keccak256 = require("keccak256");

const givenEthAddress = "0x627306090abab3a6e1400e9345bc60c78a8bef57";

function deriveEthereumAddress(walletPublic) {
  // Convert Base64 strings to Buffer
  const xBuffer = Buffer.from(walletPublic.x, "base64");
  const yBuffer = Buffer.from(walletPublic.y, "base64");

  // Concatenate x and y coordinates with a prefix
  const uncompressedPubKeyBuffer = Buffer.concat([
    Buffer.from([0x04]), // Uncompressed public key prefix
    xBuffer,
    yBuffer,
  ]);

  // Hash the public key using Keccak-256
  const hash = keccak256(uncompressedPubKeyBuffer.slice(1));

  // Take the last 20 bytes of the hash
  const address = "0x" + hash.slice(-20).toString("hex");

  console.log("Ethereum Address:", address);
  console.log("Given Ethereum Address:", givenEthAddress);
  console.log("Is the Ethereum Address correct?", address === givenEthAddress);

  return address;
}

// Usage
const walletPublic = {
  curve: "secp256k1",
  x: "r4C5DSUUXaKMWDNZvrR7IXlrL+GiPBUR5EPnpk39sn0=",
  y: "dDTDgPCqTFAOIgqhqdBoUUsf9NUBnmJOe6Hv6Cs0Clk=",
};

deriveEthereumAddress(walletPublic);
