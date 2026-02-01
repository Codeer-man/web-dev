// package
// @aws-sdk/client-s3
// @aws-sdk/s3-request-presigner

const { S3Client, GetObjectCommand, Bucket$ } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: "us-east-1",
  endpoint: "https://t3.storage.dev",
  forcePathStyle: true,
  credentials: {
    accessKeyId: "tid_ehTYAtbgNsaGtG_dSHVlzzgXwtLw_kHkFaUzYBtojBsYJNWdhE",
    secretAccessKey:
      "tsec_otqbt4C1IuGks2m9jI9zMXNLxw6rVU2AL1uTKudBUlpkUgfjb06fD1tSIMGRqOQL1WLL84",
  },
});

const getObjectSignedUrl = async (key) => {
  //key = file name that we are about to put
  const command = new GetObjectCommand({
    Bucket: "check",
    Key: "test.jpg",
  });

  const url = await getSignedUrl(s3Client, command, {
    expiresIn: 360,
  });
  return url;
};

(async () => {
  const result = await getObjectSignedUrl();
  console.log(result);
})();
