const axios = require("axios");
const cheerio = require("cheerio");
const cron = require("node-cron");

// const { Telegraf } = require("telegraf");
// const bot = new Telegraf("5561218186:AAGw_UubGkg94Vv98l0gHRu-0PDrKwkXbEE");

const fetchResults = async () => {
  try {
    const response = await axios.get("http://www.lottoactivo.com/");
    const html = response.data;

    const $ = cheerio.load(html);

    const numeros = [];

    $("#result p").each((k, v) => {
      p = $(v).find("img").attr("src");

      g = p.replace("/images/animalitos/venezuela/", "");
      g = g.replace(".jpg", "");
      //   console.log(g);

      if (g === "lottoactivoesperaVE.png") {
        // console.log("Noting for to do");
        // console.log(g);
      } else {
        numeros.push({ numero: g, schedule_id: k + 1 });
      }
    });
    return numeros;
    // console.log(urls);
  } catch (error) {
    return false;
  }
};

cron.schedule("*/10 * * * *", async () => {
  // (async () => {
  res = await fetchResults();
  console.log({ res });
  lastResult = res[res.length - 1];
  // console.log(lastResult);
  body = await axios.post(
    "https://lotto.fivipsystem.com/api/send-results-complement",
    lastResult
  );
  console.log(body.data);
  // })();
});

// console.log("fetching");
// fetchResults().then((titles) => console.log(titles));
//console.log()
