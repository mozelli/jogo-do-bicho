const puppeteer = require('puppeteer');
//const fs = require('fs');

const rodadas = {
    alvorada: [],
    dia: [],
    noite: [],
    preferida: []
}

run();

async function run() {
    const resultados = await buscarResultadosDoSite();
    const rodadas = separaArrayPorRodadas(resultados);
    console.dir(rodadas);
}


async function buscarResultadosDoSite() {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto('https://www.resultadofacil.com.br/resultado-do-jogo-do-bicho/MG/do-dia/2020-08-27');

    const resultados = await page.evaluate(() => {
        let premios = [];
        document.querySelectorAll('div > table > tbody > tr > td')
            .forEach((premio) => {
                if (premio.innerText !== '') {
                    premios.push(premio.innerText);
                } else {
                    premios.push(null);
                }
            });
        return premios;
    });

    browser.close();
    return resultados;
} 

function separaArrayPorRodadas(resultados) {
    
    let aux = {};
    //rodadas.alvorada = separaPorPremios(aux);

    
    aux = resultados.splice(0, 28);
    rodadas.alvorada = separaPorPremios(aux);

    aux = resultados.splice(0, 28);
    rodadas.dia = separaPorPremios(aux);

    aux = resultados.splice(0, 28);
    rodadas.noite = separaPorPremios(aux);

    aux = resultados.splice(0, 28);
    rodadas.preferida = separaPorPremios(aux);

    //const rodadasSeparadasPorPremios = separaPorPremios(rodadas);

    //return rodadasSeparadasPorPremios;
    return rodadas;
}

function separaPorPremios(rodada) {
    let premios = {
        primeiro: rodada.splice(0, 4),
        segundo: rodada.splice(0, 4),
        terceiro: rodada.splice(0, 4),
        quarto: rodada.splice(0, 4),
        quinto: rodada.splice(0, 4)
    }

    return premios;
}
