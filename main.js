function generatePrivateKey() {
  return Math.floor(Math.random() * 100) + 10;
}

function generatePublicKey(privateKey, base, modulus) {
  return BigInt(base) ** BigInt(privateKey) % BigInt(modulus);
}

function generateSharedSecretKey(privateKey, publicKey, modulus) {
  return BigInt(publicKey) ** BigInt(privateKey) % BigInt(modulus);
}

function generateKeys() {
  const base = document.getElementById("base").valueAsNumber;
  const modulus = document.getElementById("modulus").valueAsNumber;

  const alicePrivateKey = document.getElementById("alicePrivateKey").valueAsNumber;
  const alicePublicKey = generatePublicKey(alicePrivateKey, base, modulus);
  document.getElementById("alicePublicKey").value = alicePublicKey;

  const bobPrivateKey = document.getElementById("bobPrivateKey").valueAsNumber;
  const bobPublicKey = generatePublicKey(bobPrivateKey, base, modulus);
  document.getElementById("bobPublicKey").value = bobPublicKey;

  const aliceExchangePublicKey = generatePublicKey(alicePrivateKey, base, modulus);
  const bobExchangePublicKey = generatePublicKey(bobPrivateKey, base, modulus);
  document.getElementById("aliceExchangePublicKey").value = bobExchangePublicKey;
  document.getElementById("bobExchangePublicKey").value = aliceExchangePublicKey;

  const aliceSharedSecretKey = generateSharedSecretKey(alicePrivateKey, bobExchangePublicKey, modulus);
  const bobSharedSecretKey = generateSharedSecretKey(bobPrivateKey, aliceExchangePublicKey, modulus);

  document.getElementById("sharedSecretKey").value = aliceSharedSecretKey;

  if (aliceSharedSecretKey === bobSharedSecretKey) {
    console.log("Shared secret key is the same for both Alice and Bob:", aliceSharedSecretKey);
  } else {
    console.error("Shared secret key mismatch!");
  }
}

function toggleCode() {
  var code = document.getElementById("code");
  code.style.display = code.style.display === "none" ? "block" : "none";
}