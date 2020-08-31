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

    await page.goto('https://www.resultadofacil.com.br/resultado-do-jogo-do-bicho/MG/de-hoje');

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
        primeiro: {
            numero: 0,
            grupo: 0,
            bicho: ''
        },
        segundo: {
            numero: 0,
            grupo: 0,
            bicho: ''
        },
        terceiro: {
            numero: 0,
            grupo: 0,
            bicho: ''
        },
        quarto: {
            numero: 0,
            grupo: 0,
            bicho: ''
        },
        quinto: {
            numero: 0,
            grupo: 0,
            bicho: ''
        }
    }
    let aux = [];

    aux = rodada.splice(0, 4);
    aux.shift();

    premios.primeiro.numero = (aux[0] == undefined ? null : parseInt(aux[0]));
    premios.primeiro.grupo = (aux[1] == undefined ? null : parseInt(aux[1]));
    premios.primeiro.bicho = (aux[2] == undefined ? null : aux[2]);

    aux = rodada.splice(0, 4);
    aux.shift();
    premios.segundo.numero = (aux[0] == undefined ? null : parseInt(aux[0]));
    premios.segundo.grupo = (aux[1] == undefined ? null : parseInt(aux[1]));
    premios.segundo.bicho = (aux[2] == undefined ? null : aux[2]);

    aux = rodada.splice(0, 4);
    aux.shift();
    premios.terceiro.numero = (aux[0] == undefined ? null : parseInt(aux[0]));
    premios.terceiro.grupo = (aux[1] == undefined ? null : parseInt(aux[1]));
    premios.terceiro.bicho = (aux[2] == undefined ? null : aux[2]);

    aux = rodada.splice(0, 4);
    aux.shift();
    premios.quarto.numero = (aux[0] == undefined ? null : parseInt(aux[0]));
    premios.quarto.grupo = (aux[1] == undefined ? null : parseInt(aux[1]));
    premios.quarto.bicho = (aux[2] == undefined ? null : aux[2]);

    aux = rodada.splice(0, 4);
    aux.shift();
    premios.quinto.numero = (aux[0] == undefined ? null : parseInt(aux[0]));
    premios.quinto.grupo = (aux[1] == undefined ? null : parseInt(aux[1]));
    premios.quinto.bicho = (aux[2] == undefined ? null : aux[2]);

    return premios;
}
