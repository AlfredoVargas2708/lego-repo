const axios = require("axios");
const cheerio = require("cheerio");

const piece_url =
  "https://www.lego.com/cdn/product-assets/element.img.photoreal.192x192/";
const lego_url = "https://www.lego.com/es-es/service/building-instructions/";

const getImages = async (legos, pieces) => {
  try {
    let pieceImages = [];
    let legoImages = [];

    pieces.forEach((piece) => {
      let pieceImage =
        piece !== null
          ? `${piece_url}${piece}`
          : "https://www.lego.com/cdn/cs/set/assets/blt25ecf37f37849299/one_missing_brick.webp?format=webply&fit=bounds&quality=75&width=500&height=500&dpr=1";
      pieceImages.push({ piece, image: pieceImage });
    });

    legoImages = await Promise.all(
      legos.map(async (lego) => {
        let { data } = await axios.get(`${lego_url}${lego}`);
        let $ = cheerio.load(data);
        let image = {
          lego,
          imgLego: `${
            $('source[type="image/webp"]')
              .first()
              .attr("srcset")
              .split(",")[0]
              .split(" ")[0]
          }`,
        };
        return { lego, image };
      })
    );

    return { pieceImages, legoImages };
  } catch (error) {
    console.log(error);
    return { pieceImages: [], legoImages: [] };
  }
};

module.exports = {
  getImages,
};
