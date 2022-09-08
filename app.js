const axios = require("axios");
const cheerio = require("cheerio");
const cron = require("node-cron");

// const { Telegraf } = require("telegraf");
// const bot = new Telegraf("5394351051:AAGd5-y5AgxSmhVEzRq4I8lwNpaCkiX734M");

function zfill(number, width) {
  var numberOutput = Math.abs(number); /* Valor absoluto del número */
  var length = number.toString().length; /* Largo del número */
  var zero = "0"; /* String de cero */

  if (width <= length) {
    if (number < 0) {
      return "-" + numberOutput.toString();
    } else {
      return numberOutput.toString();
    }
  } else {
    if (number < 0) {
      return "-" + zero.repeat(width - length) + numberOutput.toString();
    } else {
      return zero.repeat(width - length) + numberOutput.toString();
    }
  }
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

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

      if (g === "lottoactivoesperaVE.png") {
      } else {
        numeros.push({ numero: g, schedule_id: k + 1 });
      }
    });
    return numeros;
  } catch (error) {
    return false;
  }
};

const fetchResultsGranjita = async () => {
  try {
    res = [];
    date = new Date();
    date = date.toLocaleString("en-US", {
      timeZone: "America/Caracas",
    });

    const response = await axios.get(
      `https://webservice.premierpluss.com/loteries/results3?since=${formatDate(
        date
      )}&product=1`
    );

    response.data.forEach((item) => {
      numero = item.result.split("-");

      if (numero[0] == "0") {
        _numero = "0";
      } else if (numero[0] == "00") {
        _numero = "00";
      } else {
        _numero = zfill(numero[0], 2);
      }

      res.push({ numero: _numero, schedule_id: item.lottery.id - 1 });
    });
    // console.log({ res });
    return res;
  } catch (error) {
    return false;
  }
};

const fetchResultsSelvaParaiso = async () => {
  try {
    const response = await axios.get("https://www.selvaparaiso.com/");
    const html = response.data;
    const resSelvaParaiso = [];
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
      } else {
        _number = arry[count - 1].split("-");

        schedule_id = ++schedule_id;
        resSelvaParaiso.push({ numero: _number[0], schedule_id });
      }
    });
    return resSelvaParaiso;
  } catch (error) {
    console.log({ error });
    return false;
  }
};

cron.schedule("*/10 * * * *", async () => {
  console.log("try Animalitos");
  res = await fetchResults();
  // console.log({ res });
  lastResult = res[res.length - 1];
  body = await axios.post(
    "http://localhost:8000/api/send-results-complement",
    lastResult
  );

  if (body.valid) {
    console.log({ body });
  } else {
    console.log("noting for to do animalitos");
  }
});

cron.schedule("*/10 * * * *", async () => {
  console.log("try Granjita");
  res = await fetchResultsGranjita();
  lastResult = res[res.length - 1];
  // console.log(lastResult);
  body = await axios.post(
    "http://localhost:8000/api/send-results-granjita",
    lastResult
  );

  if (body.valid) {
    console.log({ body });
  } else {
    console.log("noting for to do granjita");
  }
  // console.log(body.data);
});

cron.schedule("*/10 * * * *", async () => {
  console.log("try selva paraiso");
  res = await fetchResultsSelvaParaiso();
  lastResult = res[res.length - 1];
  body = await axios.post(
    "http://localhost:8000/api/send-results-selvaParaiso",
    lastResult
  );

  if (body.valid) {
    console.log({ body });
  } else {
    console.log("noting for to do selva paraiso");
  }
});
