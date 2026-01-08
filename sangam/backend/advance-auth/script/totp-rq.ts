import QRCode from "qrcode";

const optAuthUrl = process.argv[2];

if (!optAuthUrl) {
  throw new Error("Pass optURL as argument");
}

async function main() {
  await QRCode.toFile("totp.png", optAuthUrl);
  console.log("saved QR code");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
