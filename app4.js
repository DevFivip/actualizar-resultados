const axios = require("axios");
const cheerio = require("cheerio");
const ENDPOINT = 'https://lotto.fivipsystem.com';

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
const fetchResultsLaGranjita = async () => {
    try {
        res = [];
        date = new Date();
        date = date.toLocaleString("en-US", {
            timeZone: "America/Caracas",
        });

        const response = await axios.get(
            `https://loteriadehoy.com/animalito/lagranjita/resultados/`
        );
        const $ = cheerio.load(response.data);

        const textos = $('.circle-legend h4').map((_, element) => $(element).text().replace(/\n|\t/g, '').trim()).get();


        return textos.map((v, k) => {
            resArr = v.split(" ");
            obj = {
                numero: zfill(resArr[0], 2),
                schedule_id: k
            }
            return obj
        })

    } catch (error) {

        return false;
    }
};
const fetchResultsRuletaActiva = async () => {
    try {
        res = [];
        date = new Date();
        date = date.toLocaleString("en-US", {
            timeZone: "America/Caracas",
        });

        const response = await axios.get(
            `https://loteriadehoy.com/animalito/ruletaactiva/resultados/`
        );
        const $ = cheerio.load(response.data);

        const textos = $('.circle-legend h4').map((_, element) => $(element).text().replace(/\n|\t/g, '').trim()).get();


        return textos.map((v, k) => {
            resArr = v.split(" ");
            obj = {
                numero: zfill(resArr[0], 2),
                schedule_id: k
            }
            return obj
        })

    } catch (error) {

        return false;
    }
};
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


        return textos.map((v, k) => {
            resArr = v.split(" ");
            obj = {
                numero: zfill(resArr[0], 2),
                schedule_id: k
            }
            return obj
        })

    } catch (error) {

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
            `https://loteriadehoy.com/animalito/selvaplus/resultados/`
        );
        const $ = cheerio.load(response.data);

        const textos = $('.circle-legend h4').map((_, element) => $(element).text().replace(/\n|\t/g, '').trim()).get();


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
const fetchResultsGuacharo = async () => {
    try {
        res = [];
        date = new Date();
        date = date.toLocaleString("en-US", {
            timeZone: "America/Caracas",
        });

        const response = await axios.get(
            `https://loteriadehoy.com/animalito/guacharoactivo/resultados/`
        );
        const $ = cheerio.load(response.data);

        const textos = $('.circle-legend h4').map((_, element) => $(element).text().replace(/\n|\t/g, '').trim()).get();


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
const fetchResultsJunglaMillonaria = async () => {
    try {
        res = [];
        date = new Date();
        date = date.toLocaleString("en-US", {
            timeZone: "America/Caracas",
        });

        const response = await axios.get(
            `https://loteriadehoy.com/animalito/junglamillonaria/resultados/`
        );
        const $ = cheerio.load(response.data);

        const textos = $('.circle-legend h4').map((_, element) => $(element).text().replace(/\n|\t/g, '').trim()).get();


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
                arry[count - 1] === "51obnwHIRDL._AC_SY580_.jpg?fit=500%2C368&ssl=1" ||
                arry[count - 1] === "51obnwHIRDL._AC_SY580_.jpg?fit=500%2C368&ssl=1" ||
                arry[count - 1] === "51obnwHIRDL._AC_SY580_.jpg?fit=500%2C368&ssl=1" ||
                arry[count - 1] === "51obnwHIRDL._AC_SY580_.jpg" ||
                arry[count - 1] === "Header-bueno-1024x618.png" ||
                arry[count - 1].indexOf('.png') > 0 ||
                arry[count - 1] === "tabla-selva-paraiso-1024x312.png"
            ) {
            } else {
                _number = arry[count - 1].split("-");
                resSelvaParaiso.push({ numero: _number[0], schedule_id });
                schedule_id = ++schedule_id;
            }
        });
        // console.log(resSelvaParaiso)
        return resSelvaParaiso;
    } catch (error) {
        console.log({ error });
        return false;
    }
};
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
        return resLottoRey;
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
const fetch = async (url, lastResult) => {
    console.log(`try ${url}`, { lastResult })
    return new Promise(async (suc, res) => {
        try {
            body = await axios.post(
                ENDPOINT + url,
                lastResult
            );
            suc(true);
        } catch (error) {
            suc(false);
        }

        // if (body.valid) {
        //     console.log(url, true)
        //     suc(true)
        // } else {
        //     console.log(body)
        //     console.log(url, false)
        //     suc(false)
        // }
    });
}

module.exports = {
    fetchResultsRuletaActiva,
    fetchResultsLottoActivo,
    fetchResultsChanceAnimalitos,
    fetchResultsLottoActivoRD,
    fetchResultsSelvaPlus,
    fetchResultsGuacharo,
    fetchResultsJunglaMillonaria,
    fetchResultsSelvaParaiso,
    fetchResultsLottoRey,
    fetchResultsLaGranjita,
    fetchResultsTropiGana,
    fetch
}