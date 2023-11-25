const cron = require("node-cron");

const { fetchResultsRuletaActiva,
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
    fetch } = require("./app4.js");

const run = () => {
    console.log('CRON IS RUNNING')
    cron.schedule("5,15 * * * *", async () => {
        const junglamillonaria = await fetchResultsJunglaMillonaria();
        const last = junglamillonaria[junglamillonaria.length - 1];
        await fetch('/api/send-results-junglamillonaria', last);
    })

    cron.schedule("6,16 * * * *", async () => {
        const guacharo = await fetchResultsGuacharo();
        const last = guacharo[guacharo.length - 1];
        await fetch('/api/send-results-guacharo', last);
    })

    cron.schedule("7,17 * * * *", async () => {
        const selvaplus = await fetchResultsSelvaPlus();
        const last = selvaplus[selvaplus.length - 1];
        await fetch('/api/send-results-selvaplus', last);
    })

    cron.schedule("8,18 * * * *", async () => {
        const chanceconanimalitos = await fetchResultsChanceAnimalitos();
        const last = chanceconanimalitos[chanceconanimalitos.length - 1];
        await fetch('/api/send-results-chanceanimalitos', last);
    })

    cron.schedule("9,19 * * * *", async () => {
        const ruletaactiva = await fetchResultsRuletaActiva();
        const last = ruletaactiva[ruletaactiva.length - 1];
        await fetch('/api/send-results-ruletaactiva', last);
    })

    cron.schedule("35,40 * * * *", async () => {
        const lottoActivoRD = await fetchResultsLottoActivoRD();
        const last = lottoActivoRD[lottoActivoRD.length - 1];
        await fetch('/api/send-results-lottoactivord', last);
    })

    // la granjita
    cron.schedule("10,20 * * * *", async () => {
        const laGranjita = await fetchResultsLaGranjita();
        const last = laGranjita[laGranjita.length - 1];
        await fetch("/api/send-results-granjita", last);
    })

    //lotto activo 
    cron.schedule("4,11 * * * *", async () => {
        const lottoactivo = await fetchResultsLottoActivo();
        const last = lottoactivo[lottoactivo.length - 1];
        await fetch("/api/send-results-lottoactivo", last);
    })

    // lotto rey
    cron.schedule("36,39 * * * *", async () => {
        const lotteRey = await fetchResultsLottoRey();
        const last = lotteRey[lotteRey.length - 1];
        await fetch("/api/send-results-lottorey", last);
    })

    // tropi gana
    cron.schedule("5,12 * * * *", async () => {
        const tropigana = await fetchResultsTropiGana();
        const last = tropigana[tropigana.length - 1];
        await fetch("/api/send-results-tropigana", last);
    })

    // selva paraiso
    cron.schedule("2,5,9 * * * *", async () => {
        const selvaParaiso = await fetchResultsSelvaParaiso();
        const last = selvaParaiso[selvaParaiso.length - 1];
        await fetch("/api/send-results-selvaParaiso", last);
    })
}

const init = async function () {
    let selvaParaiso = await fetchResultsSelvaParaiso();
    let lottorey = await fetchResultsLottoRey();

    let laGranjita = await fetchResultsLaGranjita();
    let lottoActivo = await fetchResultsLottoActivo();
    let lottoActivoRd = await fetchResultsLottoActivoRD();

    let chanceconanimalitos = await fetchResultsChanceAnimalitos();
    let junglamillonaria = await fetchResultsJunglaMillonaria();

    let selvaPlus = await fetchResultsSelvaPlus();
    let ruletaActiva = await fetchResultsRuletaActiva();
    let guacharo = await fetchResultsGuacharo();

    console.log({ selvaParaiso }, { lottorey }, { laGranjita }, { lottoActivo }, { chanceconanimalitos }, { lottoActivoRd }, { selvaPlus }, { ruletaActiva }, { guacharo }, { junglamillonaria })
}

run();