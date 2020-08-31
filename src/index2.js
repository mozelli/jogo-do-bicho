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
    
    aux = resultados.splice(0, 28);
    rodadas.alvorada = separaPorPremios(aux);

    aux = resultados.splice(0, 28);
    rodadas.dia = separaPorPremios(aux);

    aux = resultados.splice(0, 28);
    rodadas.noite = separaPorPremios(aux);

    aux = resultados.splice(0, 28);
    rodadas.preferida = separaPorPremios(aux);

    return rodadas;
}

function separaPorPremios(rodada) {

    let premios = {
        primeiro: [],
        segundo: [],
        terceiro: [],
        quarto: [],
        quinto: []
    }
    let aux = [];

    aux = rodada.splice(0, 4);
    aux.shift();
    premios.primeiro = aux;

    aux = rodada.splice(0, 4);
    aux.shift();
    premios.segundo = aux;

    aux = rodada.splice(0, 4);
    aux.shift();
    premios.terceiro = aux;

    aux = rodada.splice(0, 4);
    aux.shift();
    premios.quarto = aux;

    aux = rodada.splice(0, 4);
    aux.shift();
    premios.quinto = aux;

    return premios;
}

