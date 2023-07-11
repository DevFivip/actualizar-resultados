const axios = require("axios");
const cheerio = require("cheerio");
const cron = require("node-cron");

function zfill(number, width) {
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = number.toString().length; /* Largo del número */
    var zero = "0"; /* String de cero */

    if (number == '00') {
        return '00';
    }

    if (number == '0') {
        return '0';
    }

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




const fetchResultsRuletaActiva = async () => {
    try {
        res = [];
        date = new Date();
        date = date.toLocaleString("en-US", {
            timeZone: "America/Caracas",
        });

        const response = await axios.get(
            `https://webservice.premierpluss.com/loteries/results3?since=${formatDate(
                date
            )}&product=3`
        );

        // console.log(response);
        response.data.forEach((item, k) => {
            // console.log({k});
            numero = item.result.split("-");

            if (numero[0] == "0") {
                _numero = "0";
            } else if (numero[0] == "00") {
                _numero = "00";
            } else {
                _numero = zfill(numero[0], 2);
            }

            res.push({ numero: _numero, schedule_id: k });
        });

        return res;
    } catch (error) {
        console.log(error)
        return false;
    }
};

const fetchResultsLottoActivo = async () => {
    try {
        res = [];
        date = new Date();
        date = date.toLocaleString("en-US", {
            timeZone: "America/Caracas",
        });

        const response = await axios.get(
            `https://loteriadehoy.com/animalito/lottoactivo/resultados/`
        );
        const $ = cheerio.load(response.data);

        const textos = $('.circle-legend h4').map((_, element) => $(element).text().replace(/\n|\t/g, '').trim()).get();
        console.log(textos);

        return textos.map((v, k) => {
            resArr = v.split(" ");
            obj = {
                numero: zfill(resArr[0], 2),
                schedule_id: k
            }
            return obj
        })

    } catch (error) {
        console.log(error)
        return false;
    }
};
const fetchResultsChanceAnimalitos = async () => {
    try {
        res = [];
        date = new Date();
        date = date.toLocaleString("en-US", {
            timeZone: "America/Caracas",
        });

        const response = await axios.get(
            `https://loteriadehoy.com/animalito/chanceconanimalitos/resultados/`
        );
        const $ = cheerio.load(response.data);

        const textos = $('.circle-legend h4').map((_, element) => $(element).text().replace(/\n|\t/g, '').trim()).get();
        console.log(textos);

        return textos.map((v, k) => {
            resArr = v.split(" ");
            obj = {
                numero: zfill(resArr[0], 2),
                schedule_id: k
            }
            return obj
        })

    } catch (error) {
        console.log(error)
        return false;
    }
};

const fetchResultsLottoActivoRD = async () => {
    try {
        res = [];
        date = new Date();
        date = date.toLocaleString("en-US", {
            timeZone: "America/Caracas",
        });

        const response = await axios.get(
            `https://loteriadehoy.com/animalito/lottoactivordominicana/resultados/`
        );
        const $ = cheerio.load(response.data);

        const textos = $('.circle-legend h4').map((_, element) => $(element).text().replace(/\n|\t/g, '').trim()).get();
        console.log(textos);

        return textos.map((v, k) => {
            resArr = v.split(" ");
            obj = {
                numero: zfill(resArr[0], 2),
                schedule_id: k
            }
            return obj
        })

    } catch (error) {
        console.log(error)
        return false;
    }
};
const fetchResultsSelvaPlus = async () => {
    try {
        res = [];
        date = new Date();
        date = date.toLocaleString("en-US", {
            timeZone: "America/Caracas",
        });

        const response = await axios.get(
            `https://webservice.premierpluss.com/loteries/results3?since=${formatDate(
                date
            )}&product=20`
        );

        // console.log(response);
        response.data.forEach((item, k) => {
            // console.log({k});
            numero = item.result.split("-");

            if (numero[0] == "0") {
                _numero = "0";
            } else if (numero[0] == "00") {
                _numero = "00";
            } else {
                _numero = zfill(numero[0], 2);
            }

            res.push({ numero: _numero, schedule_id: k });
        });

        return res;
    } catch (error) {
        console.log(error)
        return false;
    }
};

const fetchResultsGuacharo = async () => {
    try {
        res = [];
        date = new Date();
        date = date.toLocaleString("en-US", {
            timeZone: "America/Caracas",
        });

        const response = await axios.get(
            `https://webservice.premierpluss.com/loteries/results3?since=${formatDate(
                date
            )}&product=24`
        );

        // console.log(response);
        response.data.forEach((item, k) => {
            // console.log({k});
            numero = item.result.split("-");

            if (numero[0] == "0") {
                _numero = "0";
            } else if (numero[0] == "00") {
                _numero = "00";
            } else {
                _numero = zfill(numero[0], 2);
            }

            res.push({ numero: _numero, schedule_id: k });
        });

        return res;
    } catch (error) {
        console.log(error)
        return false;
    }
};


const init = async function () {
    let lottoActivo = await fetchResultsLottoActivo();
    let chanceconanimalitos = await fetchResultsChanceAnimalitos();
    let lottoActivoRd = await fetchResultsLottoActivoRD();

    let selvaPlus = await fetchResultsSelvaPlus();
    let ruletaActiva = await fetchResultsRuletaActiva();
    let guacharo = await fetchResultsGuacharo();

    console.log({ lottoActivo }, { chanceconanimalitos }, { lottoActivoRd }, { selvaPlus }, { ruletaActiva }, { guacharo })
}


init()