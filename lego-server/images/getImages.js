const pieceApiUrl = "https://rebrickable.com/api/v3/lego/elements";
const legoApiUrl = "https://rebrickable.com/api/v3/lego/sets";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Función para procesar en batches
const fetchInBatches = async (
  items,
  fetchFn,
  batchSize = 5,
  delayMs = 1000
) => {
  const results = [];
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map(async (item) => {
        try {
          return await fetchFn(item);
        } catch (err) {
          console.error(err);
          return null;
        }
      })
    );
    results.push(...batchResults);
    await delay(delayMs); // Espera entre batches
  }
  return results;
};

const getImages = async (legos, pieces) => {
  const pieceFetch = async (piece) => {
    if (piece !== null) {
      const res = await fetch(
        `${pieceApiUrl}/${piece}?key=${process.env.REBRICKABLE_API_KEY}`
      );
      if (!res.ok) {
        console.error(
          `Error fetching piece ${piece}:`,
          res.status,
          await res.text()
        );
        return { piece, image: null };
      }
      const data = await res.json();
      return { piece, image: data.part_img_url };
    } else {
      return {
        piece,
        image:
          "https://www.lego.com/cdn/cs/set/assets/blt25ecf37f37849299/one_missing_brick.webp?format=webply&fit=bounds&quality=75&width=500&height=500&dpr=1",
      };
    }
  };

  const legoFetch = async (lego) => {
    if (lego !== null) {
      const res = await fetch(
        `${legoApiUrl}/${lego}-1?key=${process.env.REBRICKABLE_API_KEY}`
      );
      if (!res.ok) {
        console.error(
          `Error fetching lego ${lego}:`,
          res.status,
          await res.text()
        );
        return { lego, image: null };
      }
      const data = await res.json();
      return { lego, image: data.set_img_url };
    } else {
      return {
        lego,
        image:
          "https://www.lego.com/cdn/cs/set/assets/blt25ecf37f37849299/one_missing_brick.webp?format=webply&fit=bounds&quality=75&width=500&height=500&dpr=1",
      };
    }
  };

  try {
    const pieceImages = await fetchInBatches(pieces, pieceFetch, 5, 1000);
    const legoImages = await fetchInBatches(legos, legoFetch, 5, 1000);
    return { pieceImages, legoImages };
  } catch (error) {
    console.error("Error en getImages:", error);
    return { pieceImages: [], legoImages: [] };
  }
};

module.exports = {
  getImages,
};
