// crbn backend early
import { keccak256 } from "ethereumjs-util";
import { Buffer } from "buffer";

export const generatePublicKey = (curve, x, y) => {
  // Convert base64-encoded x and y to buffers
  const xBuffer = Buffer.from(x, "base64");
  const yBuffer = Buffer.from(y, "base64");

  // Concatenate x and y buffers to form the uncompressed public key
  const publicKey = Buffer.concat([Buffer.from([0x04]), xBuffer, yBuffer]);

  // Hash the public key using keccak-256
  const addressBuffer = keccak256(publicKey);

  // Take the last 20 bytes of the hash to get the Ethereum address
  const address = addressBuffer.slice(-20);

  // Convert the address to a hexadecimal string
  const addressHex = `0x${address.toString("hex")}`;

  console.log("Ethereum Address:", addressHex);

  const walletData = {
    curve,
    x,
    y,
    address: addressHex,
  };

  return walletData;
};
