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
    
    //let aux = resultados.splice(0, 28);
    //rodadas.alvorada = separaPorPremios(aux);

    rodadas.alvorada = resultados.splice(0, 28);
    rodadas.dia = resultados.splice(0, 28);
    rodadas.noite = resultados.splice(0, 28);
    rodadas.preferida = resultados.splice(0, 28);

    //const rodadasSeparadasPorPremios = separaPorPremios(rodadas);

    //return rodadasSeparadasPorPremios;
    return rodadas;
}

function separaPorPremios(rodada) {
    let itens = {
        id: 0,
        numero: 0,
        grupo: 0,
        bicho: '',
    }

    let jogo = [];
    

    itens.id = rodada[0];
    itens.numero = rodada[1];
    itens.grupo = rodada[2];
    itens.bicho = rodada[3];

    return itens;
}
