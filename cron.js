const cron = require("node-cron");
const { fetchResultsRuletaActiva, fetchResultsLottoActivo, fetchResultsChanceAnimalitos, fetchResultsLottoActivoRD, fetchResultsSelvaPlus, fetchResultsGuacharo, fetch, fetchResultsJunglaMillonaria,fetchResultsSelvaParaiso,fetchResultsLottoRey } = require("./app4.js");

const run = () => {
    cron.schedule("8,10,11,17 * * * *", async () => {
        const junglamillonaria = await fetchResultsJunglaMillonaria();
        const last = junglamillonaria[junglamillonaria.length - 1];
        await fetch('/api/send-results-junglamillonaria', last);
    })

    cron.schedule("8,10,11,17 * * * *", async () => {
        const guacharo = await fetchResultsGuacharo();
        const last = guacharo[guacharo.length - 1];
        await fetch('/api/send-results-guacharo', last);
    })

    cron.schedule("8,10,11,17 * * * *", async () => {
        const selvaplus = await fetchResultsSelvaPlus();
        const last = selvaplus[selvaplus.length - 1];
        await fetch('/api/send-results-selvaplus', last);
    })

    cron.schedule("7,8,11,17 * * * *", async () => {
        const chanceconanimalitos = await fetchResultsChanceAnimalitos();
        const last = chanceconanimalitos[chanceconanimalitos.length - 1];
        await fetch('/api/send-results-chanceconanimalitos', last);
    })

    cron.schedule("6,9,15,17 * * * *", async () => {
        const ruletaactiva = await fetchResultsRuletaActiva();
        const last = ruletaactiva[ruletaactiva.length - 1];
        await fetch('/api/send-results-ruletaactiva', last);
    })

    cron.schedule("38,40,45,50 * * * *", async () => {
        const lottoActivoRD = await fetchResultsLottoActivoRD();
        const last = lottoActivoRD[lottoActivoRD.length - 1];
        await fetch('/api/send-results-lottoactivord', last);
    })

    // la granjita
    cron.schedule("10,12,13 * * * *", async () => {
        const laGranjita = await fetchResultsLaGranjita();
        const last = laGranjita[laGranjita.length - 1];
        await fetch("/api/send-results-granjita", last);
    })

    //lotto activo 
    cron.schedule("8,10,12,13 * * * *", async () => {
        const lottoactivo = await fetchResultsLottoActivo();
        const last = lottoactivo[lottoactivo.length - 1];
        await fetch("/api/send-results-lottoactivo", last);
    })

    // lotto rey
    cron.schedule("33,35,39 * * * *", async () => {
        const lotteRey = await fetchResultsLottoRey();
        const last = lotteRey[lotteRey.length - 1];
        await fetch("/api/send-results-lottorey", last);
    })

    // selva paraiso
    cron.schedule("2,4,13 * * * *", async () => {
        const selvaParaiso = await fetchResultsSelvaParaiso();
        const last = selvaParaiso[selvaParaiso.length - 1];
        await fetch("/api/send-results-selvaParaiso", last);
    })
}

module.exports = {
    run
}