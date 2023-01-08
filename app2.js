const axios = require("axios");
const cheerio = require("cheerio");
const cron = require("node-cron");
const ENDPOINT = 'https://lotto.fivipsystem.com';

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


const get = (url) => new Promise(async (success, rej) => {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    resLoteria = [];
    schedule_id = 0;
    sections = $("img").each((v, k) => {

        w = $(k).attr("src");
        arry = w.split("/");
        // console.log(w)
        count = arry.length;

        if (
            w === "https://apitriples.parley.la/assets/img/logo-regular.png" ||
            w === "https://apitriples.parley.la/assets/img/products/trio-activo/logo_xs.png" ||
            w === "https://apitriples.parley.la/assets/img/products/quiniela/13_xss.png" ||
            w === "https://apitriples.parley.la/assets/img/products/animals/lotto-activo/logo_xs_.png" ||
            w === "https://apitriples.parley.la/assets/img/products/animals/lotto-activo-rd/logo_xs_.png" ||
            w === "https://apitriples.parley.la/assets/img/products/animals/chance-animalitos/logo_xs_.png" ||
            w === "https://apitriples.parley.la/assets/img/products/animals/guacharo-activo/logo_xs_.png" ||
            w === "https://apitriples.parley.la/assets/img/products/animals/lotto-rey/logo_xs_.png" ||
            w === "https://apitriples.parley.la/assets/img/products/animals/selva-plus/logo_xs_.png" ||
            w === "https://apitriples.parley.la/assets/img/products/animals/granjita/logo_xs_.png" ||
            w === "https://apitriples.parley.la/assets/img/get-lucky/piramide-icono.png" ||
            w === "https://apitriples.parley.la/assets/img/products/animals/lotto-activo/logo_a.png" ||
            w === "https://apitriples.parley.la/assets/img/whatsapp-icons-2.png" ||
            w === "https://apitriples.parley.la/assets/img/logo_positive.png" ||
            w === "https://apitriples.parley.la/assets/img/ssl.png" ||
            w === "https://apitriples.parley.la/assets/img/conalot-sisvenprol.png" ||
            w === "https://apitriples.parley.la/assets/img/products/animals/lotto-rey/logo_xs_.png" ||
            w === "" ||
            w === "https://apitriples.parley.la/assets/img/products/animals/lotto-activo-rd/logo_rd.png" ||
            w === "https://apitriples.parley.la/assets/img/products/animals/granjita/logo_a.png"
        ) {

        } else {
            // console.log({ w })
            arry = w.split("/");
            count = arry.length;
            _number = arry[count - 1].split("-");
            resLoteria.push({ numero: zfill(_number[0], 2), schedule_id });
            schedule_id = ++schedule_id;
        }


    });
    success(resLoteria)
    // console.log(resLoteria)
})



const init = async function () {

    lottoActivo = await get("https://apitriples.parley.la/products-results/lotto-activo-results");
    lottoActivoRD = await get("https://apitriples.parley.la/products-results/lotto-activo-rd-resultados");
    laGranjita = await get("https://apitriples.parley.la/products-results/granjita-results");
    console.log(lottoActivo, laGranjita, lottoActivoRD)

}


cron.schedule("34,36,40 * * * *", async () => {
    lottoActivoRD = await get("https://apitriples.parley.la/products-results/lotto-activo-rd-resultados");
    last = lottoActivoRD[lottoActivoRD.length - 1];


    body = await axios.post(
        ENDPOINT + "/api/send-results-lottoactivord",
        last
    );

    if (body.valid) {
        console.log({ last });
    } else {
        console.log("nada que hacer Lotto Activo RD");
    }

})

// init()
