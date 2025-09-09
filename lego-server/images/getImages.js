const axios = require("axios");
const cheerio = require("cheerio");

const piece_url =
  "https://www.lego.com/cdn/product-assets/element.img.photoreal.192x192/";
const lego_url = "https://www.lego.com/es-es/service/building-instructions/";

const getImages = async (legos, pieces) => {
  try {
    if (pieces.length === 1 && legos.length === 1) {
      let pieceImages = [];
      let legoImages = [];

      pieceImages.push({
        pieza: pieces[0],
        imgPiece:
          pieces[0] !== null
            ? `${piece_url}${pieces[0]}.jpg`
            : "https://www.lego.com/cdn/cs/set/assets/blt25ecf37f37849299/one_missing_brick.webp?format=webply&fit=bounds&quality=75&width=500&height=500&dpr=1",
      });

      const { data } = await axios.get(
        `${lego_url}${legos[0] !== null ? legos[0] : "1"}`
      );
      const $ = cheerio.load(data);

      let imgLego = {
        lego: legos[0],
        imgLego: `${
          $('source[type="image/webp"]')
            .first()
            .attr("srcset")
            .split(",")[0]
            .split(" ")[0]
        }`,
      };
      legoImages.push(imgLego);

      return { pieceImages, legoImages };
    } else if (pieces.length === 1 && legos.length > 1) {
      let pieceImages = [];
      let legoImages = [];

      pieceImages.push({
        pieza: pieces[0],
        imgPiece: `${piece_url}${pieces[0]}.jpg`,
      });

      legoImages = await Promise.all(
        legos.map(async (lego) => {
          const { data } = await axios.get(
            `${lego_url}${lego !== null ? lego : "1"}`
          );
          const $ = cheerio.load(data);

          let imgLego = {
            lego: lego,
            imgLego: `${
              $('source[type="image/webp"]')
                .first()
                .attr("srcset")
                .split(",")[0]
                .split(" ")[0]
            }`,
          };
          return imgLego;
        })
      );

      return { pieceImages, legoImages };
    } else if (pieces.length > 1 && legos.length > 1) {
      let pieceImages = [];
      let legoImages = [];

      pieceImages = pieces.map((piece) => {
        let imgPiece = {
          pieza: piece,
          imgPiece: `${piece_url}${piece}.jpg`,
        };
        return imgPiece;
      });

      legoImages = await Promise.all(
        legos.map(async (lego) => {
          const { data } = await axios.get(
            `${lego_url}${lego !== null ? lego : "1"}`
          );
          const $ = cheerio.load(data);

          let imgLego = {
            lego: lego,
            imgLego: `${
              $('source[type="image/webp"]')
                .first()
                .attr("srcset")
                .split(",")[0]
                .split(" ")[0]
            }`,
          };
          return imgLego;
        })
      );

      return { pieceImages, legoImages };
    } else if (pieces.length > 1 && legos.length === 1) {
      let pieceImages = [];
      let legoImages = [];

      pieceImages = pieces.map((piece) => {
        let imgPiece = {
          pieza: piece,
          imgPiece: `${piece_url}${piece}.jpg`,
        };
        return imgPiece;
      });

      const { data } = await axios.get(
        `${lego_url}${legos[0] !== null ? legos[0] : "1"}`
      );
      const $ = cheerio.load(data);

      let imgLego = {
        lego: legos[0],
        imgLego: `${
          $('source[type="image/webp"]')
            .first()
            .attr("srcset")
            .split(",")[0]
            .split(" ")[0]
        }`,
      };
      legoImages.push(imgLego);

      return { pieceImages, legoImages };
    }
  } catch (error) {
    console.log(error);
    return { pieceImages: [], legoImages: [] };
  }
};

module.exports = {
  getImages,
};
