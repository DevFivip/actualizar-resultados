const axios = require("axios");
const cheerio = require("cheerio");
const cron = require("node-cron");
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


const get = (url) => new Promise(async (success, rej) => {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    resLoteria = [];
    schedule_id = 0;
    sections = $("img").each((v, k) => {

        w = $(k).attr("src");
        arry = w.split("/");
        console.log(w)
        count = arry.length;

        if (
            w === "https://apitriples.parley.la/assets/img/products/animals/animalito-millonario/logo_xs_.png" ||
            w === "https://apitriples.parley.la/assets/img/products/animals/terminalito/logo_xs_.png" ||
            w === "https://apitriples.parley.la/assets/img/products/animals/ruleta-royal/logo_xs_.png" ||
            w === "https://apitriples.parley.la/assets/img/products/animals/el-ruco/logo_xs_.png" ||
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
            w === "https://apitriples.parley.la/assets/img/products/animals/granjita/logo_a.png" ||
            w === "https://apitriples.parley.la/assets/img/products/animals/la-ruca/logo_xs_.png" ||
            w === "https://apitriples.parley.la/assets/img/products/animals/ruleta-activa/logo_xs_.png" ||
            w === "https://apitriples.parley.la/assets/img/products/animals/la-ricachona/logo_xs_.png"
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


function formatDate(date) {
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
}

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

        // console.log(response);
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
        console.log(error)
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
}; // grupo 3

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
}; // grupo 2


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


const init = async function () {
    let lottoActivo = await get("https://apitriples.parley.la/products-results/lotto-activo-results");
    // lottoActivoRD = await get("https://apitriples.parley.la/products-results/lotto-activo-rd-resultados");
    // laGranjita = await get("https://apitriples.parley.la/products-results/granjita-results");
    let laGranjita = await fetchResultsGranjita();
    // let selvaParaiso = await fetchResultsSelvaParaiso()

    console.log(lottoActivo)
    console.log(laGranjita)
}


// init()


// lotto activo RD
cron.schedule("38,40,45,50 * * * *", async () => {
    lottoActivoRD = await fetchResultsLottoActivoRD();
    last = lottoActivoRD[lottoActivoRD.length - 1];

    body = await axios.post(
        ENDPOINT + "/api/send-results-lottoactivord",
        last
    );

    if (body.valid) {
        console.log("Lotto Activo RD Enviado Correctamente");
        console.log({ last });
    } else {
        console.log("nada que hacer Lotto Activo RD");
    }

})

//
// cron.schedule("11,12,13 * * * *", async () => {
//     lottoActivo = await get("https://apitriples.parley.la/products-results/lotto-activo-results");

//     last = lottoActivo[lottoActivo.length - 1];

//     body = await axios.post(
//         ENDPOINT + "/api/send-results-lottoactivo",
//         last
//     );

//     if (body.valid) {
//         // console.log({ last });
//     } else {
//         console.log("nada que hacer Lotto Activo");
//     }

// })

// la granjita
cron.schedule("10,12,13 * * * *", async () => {
    laGranjita = await fetchResultsLaGranjita();
    last = laGranjita[laGranjita.length - 1];

    body = await axios.post(
        ENDPOINT + "/api/send-results-granjita",
        last
    );

    if (body.valid) {
        console.log("La Granjita Enviado Correctamente");
        console.log({ last });
    } else {
        console.log("nada que hacer la granjita");
    }
})

//lotto activo 
cron.schedule("8,10,12,13 * * * *", async () => {
    lottoactivo = await fetchResultsLottoActivo();
    last = lottoactivo[lottoactivo.length - 1];

    body = await axios.post(
        ENDPOINT + "/api/send-results-lottoactivo",
        last
    );

    if (body.valid) {
        console.log("Lotto Activo Enviado Correctamente");
        console.log({ last });
    } else {
        console.log("nada que hacer lotto activo");
    }
})

// lotto rey
cron.schedule("33,35,39 * * * *", async () => {
    lotteRey = await fetchResultsLottoRey();
    last = lotteRey[lotteRey.length - 1];

    body = await axios.post(
        ENDPOINT + "/api/send-results-lottorey",
        last
    );

    if (body.valid) {
        console.log({ last });
    } else {
        console.log("nada que hacer la lotto rey");
    }

})
// selva paraiso
cron.schedule("2,4,13 * * * *", async () => {
    selvaParaiso = await fetchResultsSelvaParaiso();
    last = selvaParaiso[selvaParaiso.length - 1];

    body = await axios.post(
        ENDPOINT + "/api/send-results-selvaParaiso",
        last
    );

    if (body.valid) {
        console.log({ last });
    } else {
        console.log("nada que hacer selva paraiso");
    }

})











