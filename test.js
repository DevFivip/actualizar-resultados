const axios = require("axios");
const cheerio = require("cheerio");

const resSelvaParaiso = [];

(async () => {
  const response = await axios.get("https://www.selvaparaiso.com/");
  const html = response.data;

  const $ = cheerio.load(html);

  let schedule_id = 0;
  sections = $("img").each((v, k) => {
    w = $(k).attr("data-src");

    arry = w.split("/");

    count = arry.length;

    if (
      arry[count - 1] === "51obnwHIRDL._AC_SY580_.jpg" ||
      arry[count - 1] === "Header-bueno-1024x618.png" ||
      arry[count - 1] === "tabla-selva-paraiso-1024x312.png"
    ) {
      // console.log(arry);
    } else {
      _number = arry[count - 1].split("-");
      schedule_id = ++schedule_id;
      resSelvaParaiso.push({ numero: _number[0], schedule_id });
    }
  });

  console.log(resSelvaParaiso);
})();
