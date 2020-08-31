const puppeteer = require('puppeteer');
const fs = require('fs');

const rodadas = {
    alvorada: [],
    dia: [],
    noite: [],
    preferida: []
}

run();

async function run() {
    console.log("INÍCIO:");

    const resultados = await buscarResultadosDoSite();
    const rodadas = separaArrayPorRodadas(resultados);
    //console.dir(rodadas);
    const formatadoParaJSON = JSON.stringify(rodadas);
    armazenaResultados(formatadoParaJSON);
    console.log("Processo finalizado!");
}


async function buscarResultadosDoSite() {
    const scrapULR = "https://www.resultadofacil.com.br/resultado-do-jogo-do-bicho/MG/de-hoje";

    console.log("Executando API de webscraping...");
    const browser = await puppeteer.launch();
    console.log("OK!");

    console.log("Instanciando novo browser...");
    const page = await browser.newPage();
    console.log("Ok!");

    console.log("Acessando o site: " + scrapULR);
    await page.goto(scrapULR);
    console.log("Ok");

    console.log("Coletando informações do site...");
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
    console.log("Ok!")

    browser.close();
    console.log("Processo de webscraping finalizado.");
    return resultados;
} 

function separaArrayPorRodadas(resultados) {
    
    console.log("Formatando os dados coletados...");
    console.log("-- Organizando rodadas...");

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

    console.log("-- Organizando prêmios")

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


function armazenaResultados(resultados) {
    console.log("Armazenando os dados formatados na base de dados...")
    fs.writeFile('db.json', resultados, (error) => {
        if(error) {
            console.error("Ocorreu um erro: " + error);
        } else {
            console.log("Resultados armazenados com sucesso!");
        }
    });
}