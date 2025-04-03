const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const loadLinks = async () => {
  const links = await prisma.shortLink.findMany();
  return links;
};

const getLinksByShortCode = async (shortCode) => {
  const find = await prisma.shortLink.findUnique({
    where: { shortcode: shortCode },
  });
  console.log(find);

  return find;
};

const saveLinks = async (url, finalShortCode) => {
  const save = await prisma.shortLink.create({
    data: {
      url,
      shortcode: finalShortCode,
    },
  });
  return save;
};

module.exports = { loadLinks, saveLinks, getLinksByShortCode };
