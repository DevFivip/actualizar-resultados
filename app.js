const axios = require("axios");
const cheerio = require("cheerio");
const cron = require("node-cron");
const ENDPOINT = 'https://lotto.fivipsystem.com'
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

// const fetchResults = async () => {
//   try {
//     const response = await axios.get("http://www.lottoactivo.com/");
//     const html = response.data;

//     const $ = cheerio.load(html);

//     const numeros = [];

//     $("#result p").each((k, v) => {
//       p = $(v).find("img").attr("src");

//       g = p.replace("/images/animalitos/venezuela/", "");
//       g = g.replace(".jpg", "");

//       if (g === "lottoactivoesperaVE.png") {
//       } else {
//         numeros.push({ numero: g, schedule_id: k + 1 });
//       }
//     });
//     return numeros;
//   } catch (error) {
//     return false;
//   }
// };

const fetchResultsLottoActivo = async () => {
  try {
    const response = await axios.get("https://centrodeapuestaselrey.com.ve/resultados/lotto-activo");
    const html = response.data;
    const resLottoActivo = [];
    const $ = cheerio.load(html);

    let schedule_id = -1; // numero donde inicia los horarios de lotto activo rd
    sections = $("img").each((v, k) => {
      w = $(k).attr("src");

      arry = w.split("/");
      // console.log(arry)

      count = arry.length;
      if (
        arry[count - 1] === "el-rey-logo.png"
      ) {
      } else {
        _number = arry[count - 1].split("_");
        schedule_id = ++schedule_id;
        resLottoActivo.push({ numero: _number[0], schedule_id });
      }
    });
    // console.log(resLottoActivo)
    return resLottoActivo;
  } catch (error) {
    console.log({ error });
    return false;
  }
}; // grupo 1

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

      res.push({ numero: _numero, schedule_id: item.lottery.id - 2 });
    });
    //  console.log({ res });
    return res;
  } catch (error) {
    return false;
  }
};// grupo 1

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
        resSelvaParaiso.push({ numero: _number[0], schedule_id });
        schedule_id = ++schedule_id;
      }
    });
    console.log(resSelvaParaiso)
    return resSelvaParaiso;
  } catch (error) {
    console.log({ error });
    return false;
  }
}; // grupo 2

const fetchResultsLottoActivoRD = async () => {
  try {
    const response = await axios.get("https://centrodeapuestaselrey.com.ve/resultados/lotto-activo-rd");
    const html = response.data;
    const resLottoActivoRD = [];
    const $ = cheerio.load(html);

    let schedule_id = -1; // numero donde inicia los horarios de lotto activo rd
    sections = $("img").each((v, k) => {
      w = $(k).attr("src");

      arry = w.split("/");
      // console.log(arry)

      count = arry.length;
      if (
        arry[count - 1] === "el-rey-logo.png"
      ) {
      } else {
        _number = arry[count - 1].split("_");
        schedule_id = ++schedule_id;
        resLottoActivoRD.push({ numero: _number[0], schedule_id });
      }
    });
    console.log(resLottoActivoRD)
    return resLottoActivoRD;
  } catch (error) {
    console.log({ error });
    return false;
  }
};// grupo 3

const fetchResultsLottoRey = async () => {
  try {
    const response = await axios.get("https://centrodeapuestaselrey.com.ve/resultados/lotto-rey");
    const html = response.data;
    const resLottoRey = [];
    const $ = cheerio.load(html);

    let schedule_id = -1; // numero donde inicia los horarios de lotto activo rd
    sections = $("img").each((v, k) => {
      w = $(k).attr("src");

      arry = w.split("/");
      // console.log(arry)

      count = arry.length;
      if (
        arry[count - 1] === "el-rey-logo.png"
      ) {
      } else {
        _number = arry[count - 1].split("_");
        schedule_id = ++schedule_id;
        resLottoRey.push({ numero: _number[0], schedule_id });
      }
    });
    console.log(resLottoRey)
    return resLottoRey;
  } catch (error) {
    console.log({ error });
    return false;
  }
}; // grupo 3

const fetchResultsChanceAnimalitos = async () => {
  try {
    const response = await axios.get("https://centrodeapuestaselrey.com.ve/resultados/chance-animalitos");
    const html = response.data;
    const resChanceAnimalitos = [];
    const $ = cheerio.load(html);

    let schedule_id = -1; // numero donde inicia los horarios de lotto activo rd
    sections = $("img").each((v, k) => {
      w = $(k).attr("src");

      arry = w.split("/");
      // console.log(arry)

      count = arry.length;
      if (
        arry[count - 1] === "el-rey-logo.png"
      ) {
      } else {
        _number = arry[count - 1].split("_");
        schedule_id = ++schedule_id;
        resChanceAnimalitos.push({ numero: _number[0], schedule_id });
      }
    });
    console.log(resChanceAnimalitos)
    return resChanceAnimalitos;
  } catch (error) {
    console.log({ error });
    return false;
  }
};

const fetchResultsTropiGana = async () => {
  try {
    const response = await axios.get("https://centrodeapuestaselrey.com.ve/resultados/tropi-gana");
    const html = response.data;
    const resTropiGana = [];
    const $ = cheerio.load(html);

    let schedule_id = -1; // numero donde inicia los horarios de lotto activo rd
    sections = $("img").each((v, k) => {
      w = $(k).attr("src");

      arry = w.split("/");
      // console.log(arry)

      count = arry.length;
      if (
        arry[count - 1] === "el-rey-logo.png"
      ) {
      } else {
        _number = arry[count - 1].split("_");
        schedule_id = ++schedule_id;
        resTropiGana.push({ numero: _number[0], schedule_id });
      }
    });
    console.log(resTropiGana)
    return resTropiGana;
  } catch (error) {
    console.log({ error });
    return false;
  }
};

const fetchResultsJunglaMillonaria = async () => {
  try {
    const response = await axios.get("https://www.tuazar.com/loteria/junglamillonaria/resultados/");
    const html = response.data;
    const resTropiGana = [];
    const $ = cheerio.load(html);

    let schedule_id = -1; // numero donde inicia los horarios de lotto activo rd
    sections = $("img").each((v, k) => {

      // console.log(v,k)
      w = $(k).attr("alt");
      // console.log(w)


      arry = w.replace(/ /g, "").split("-");
      // console.log(arry)

      count = arry.length;
      if (
        arry[count - 1] === "JunglaMillonariaenesperaderesultadosdelsorteo" ||
        arry[count - 1] === "BannerTuAzar.comNOTIENESMS" ||
        arry[count - 1] === "LogoJunglaMillonaria" || arry[count - 1] === "BannerTuinformaciónenTuAzar.com"
      ) {
      } else {
        // console.log(arry, arry[0])
        _number = arry[0];

        if (_number == '0' || _number == '00') {

        } else {
          _number = zfill(_number, 2)
        }


        schedule_id = ++schedule_id;
        resTropiGana.push({ numero: _number, schedule_id });
      }
    });
    console.log(resTropiGana)
    return resTropiGana;
  } catch (error) {
    console.log({ error });
    return false;
  }
};

const fetchResultsGuacharoActivo = async () => {
  try {
    const response = await axios.get("https://guacharoactivo.com/resultados-guacharo/");
    const html = response.data;
    const resGuacharoActivo = [];
    const $ = cheerio.load(html);

    let schedule_id = 0;
    sections = $("img").each((v, k) => {
      w = $(k).attr("src");

      arry = w.split("/");

      count = arry.length;
      if (
        arry[count - 1] === "cropped-logo.png" ||
        arry[count - 1] === "espera.png") {
      } else {
        console.log(arry[count - 1])
        _number = arry[count - 1].split("-");
        _number = arry[count - 1].split(".");
        resGuacharoActivo.push({ numero: _number[0], schedule_id });
        schedule_id = ++schedule_id;
      }
    });

    return resGuacharoActivo;
  } catch (error) {
    console.log({ error });
    return false;
  }
}; // grupo 2


// cron.schedule("5,8,12,15 * * * *", async () => {
//   console.log("try Animalitos");
//   res = await fetchResultsLottoActivo();
//   // console.log({ res });

//   lastResult = res[res.length - 1];
//   body = await axios.post(
//     ENDPOINT + "/api/send-results-complement",
//     lastResult
//   );

//   if (body.valid) {
//     console.log({ body });
//   } else {
//     console.log("noting for to do animalitos");
//   }

// });

cron.schedule("5,8,12,15 * * * *", async () => {
  console.log("try Granjita");
  res = await fetchResultsGranjita();
  lastResult = res[res.length - 1];
  // console.log(lastResult);
  body = await axios.post(
    ENDPOINT + "/api/send-results-granjita",
    lastResult
  );

  if (body.valid) {
    console.log({ body });
  } else {
    console.log("noting for to do granjita");
  }
});

cron.schedule("2,8,12,15  * * * *", async () => {
  console.log("try selva paraiso");
  res = await fetchResultsSelvaParaiso();
  lastResult = res[res.length - 1];
  body = await axios.post(
    ENDPOINT + "/api/send-results-selvaParaiso",
    lastResult
  );

  if (body.valid) {
    console.log({ body });
  } else {
    console.log("noting for to do selva paraiso");
  }
});

// cron.schedule("6,8,12,15  * * * *", async () => {
//   console.log("try lotto activo rd");
//   res = await fetchResultsLottoActivoRD();
//   lastResult = res[res.length - 1];
//   body = await axios.post(
//     ENDPOINT + "/api/send-results-lottoactivord",
//     lastResult
//   );

//   if (body.valid) {
//     console.log({ body });
//   } else {
//     console.log("noting for to do selva paraiso");
//   }
// });

cron.schedule("3,8,12,15  * * * *", async () => {
  console.log("try Lotto Rey");
  res = await fetchResultsLottoRey();
  lastResult = res[res.length - 1];
  body = await axios.post(
    ENDPOINT + "/api/send-results-lottorey",
    lastResult
  );

  if (body.valid) {
    console.log({ body });
  } else {
    console.log("noting for to do lotto rey");
  }
});

cron.schedule("7,8,12,15  * * * *", async () => {
  console.log("try Chance Animalitos");
  res = await fetchResultsChanceAnimalitos();
  lastResult = res[res.length - 1];
  body = await axios.post(
    ENDPOINT + "/api/send-results-chanceanimalitos",
    lastResult
  );

  if (body.valid) {
    console.log({ body });
  } else {
    console.log("noting for to do Chance Animalitos");
  }
});

cron.schedule("8,10,12,15  * * * *", async () => {
  console.log("try Tropi Gana");
  res = await fetchResultsTropiGana();
  lastResult = res[res.length - 1];
  body = await axios.post(
    ENDPOINT + "/api/send-results-tropigana",
    lastResult
  );

  if (body.valid) {
    console.log({ body });
  } else {
    console.log("noting for to do Tropi Gana");
  }
});

cron.schedule("8,10,12,15  * * * *", async () => {
  console.log("try jungla millonaria");
  res = await fetchResultsJunglaMillonaria();
  lastResult = res[res.length - 1];
  body = await axios.post(
    ENDPOINT + "/api/send-results-junglamillonaria",
    lastResult
  );

  if (body.valid) {
    console.log({ body });
  } else {
    console.log("noting for to do jungla millonaria");
  }
});



// /**cambiar por un cron de lotto activo RD */
// run = (async () => {

//   console.log("try lotto activo");
//   res = await fetchResultsLottoActivo();
//   console.log({ res });
//   lastResult = res[res.length - 1];

//   body = await axios.post(
//     ENDPOINT + "/api/send-results-complement",
//     lastResult
//   );

//   if (body.valid) {
//     console.log({ body });
//   } else {
//     console.log("noting for to do lotto activo");
//   }


//   console.log("try Granjita");

//   res = await fetchResultsGranjita();
//   lastResult = res[res.length - 1];
//   // console.log(lastResult);
//   try {
//     body = await axios.post(
//       ENDPOINT + "/api/send-results-granjita",
//       lastResult
//     );

//   } catch (error) {
//     console.log(error)
//   }

//   if (body.valid) {
//     console.log({ body });
//   } else {
//     console.log("noting for to do granjita");
//   }



//   console.log("try selva paraiso");
//   res = await fetchResultsSelvaParaiso();
//   lastResult = res[res.length - 1];
//   body = await axios.post(
//     ENDPOINT + "/api/send-results-selvaParaiso",
//     lastResult
//   );

//   if (body.valid) {
//     console.log({ body });
//   } else {
//     console.log("noting for to do selva paraiso");
//   }


//   console.log("try lotto Activo RD");
//   res = await fetchResultsLottoActivoRD();
//   lastResult = res[res.length - 1];
//   body = await axios.post(
//     ENDPOINT + "/api/send-results-lottoactivord",
//     lastResult
//   );

//   if (body.valid) {
//     console.log({ body });
//   } else {
//     console.log("noting for to do lottoActivo RD");
//   }

//   console.log("try Lotto Rey");

//   res = await fetchResultsLottoRey();

//   lastResult = res[res.length - 1];

//   body = await axios.post(
//     ENDPOINT + "/api/send-results-lottorey",
//     lastResult
//   );

//   if (body.valid) {
//     console.log({ body });
//   } else {
//     console.log("noting for to do lotto Rey");
//   }

//   console.log("try Chance Animalitos");

//   res = await fetchResultsChanceAnimalitos();

//   lastResult = res[res.length - 1];

//   body = await axios.post(
//     ENDPOINT + "/api/send-results-chanceanimalitos",
//     lastResult
//   );

//   if (body.valid) {
//     console.log({ body });
//   } else {
//     console.log("noting for to do Chance Animalitos");
//   }

//   console.log("try Chance Animalitos");

//   res = await fetchResultsTropiGana();

//   lastResult = res[res.length - 1];

//   body = await axios.post(
//     ENDPOINT + "/api/send-results-tropigana",
//     lastResult
//   );

//   if (body.valid) {
//     console.log({ body });
//   } else {
//     console.log("noting for to do Tropi Gana");
//   }

//   console.log("try Jungla Millonaria");
//   res = await fetchResultsJunglaMillonaria();
//   lastResult = res[res.length - 1];

//   body = await axios.post(
//     ENDPOINT + "/api/send-results-junglamillonaria",
//     lastResult
//   );

//   if (body.valid) {
//     console.log({ body });
//   } else {
//     console.log("noting for to do Jungla Millonaria");
//   }


//   // res = await fetchResultsGranjita()
//   // console.log(res)

//   // res = await fetchResultsSelvaParaiso();
//   // console.log({ res })

//   // console.log('fetchResultsLottoActivoRD')
//   // await fetchResultsLottoActivoRD()

//   // console.log('fetchResultsLottoActivo')
//   // await fetchResultsLottoActivo()

//   // console.log('fetchResultsLottoRey')
//   // await fetchResultsLottoRey()

//   // console.log('fetchResultsChanceAnimalitos')
//   // await fetchResultsChanceAnimalitos()

//   // console.log('fetchResultsTropiGana')
//   // await fetchResultsTropiGana()

//   // console.log('fetchResultsJunglaMillonaria')
//   // await fetchResultsJunglaMillonaria()

// })


// const ejecutar = async function () {
//   const res = await fetchResultsGuacharoActivo()
//   console.log(res)
// }


// ejecutar();