const puppeteer = require('puppeteer');
//const fs = require('fs');

const premioObject = {
    sort: null,
    number: null,
    group: null,
    animal: null
};

const jogoObject = [];

const jogos = [];

organizeByGames();

function organizeInObjects(games) {
    for(let i = 0; i < games.length; i++) {
        const teste = games[i];
        for(let j = 0; j < teste.length; j++) {
            teste2 = teste[j];
            premioObject.sort = teste2[0];
            premioObject.number = teste2[1];
            premioObject.group = teste2[2];
            premioObject.animal = teste2[3];
            jogoObject.push(premioObject);
            //console.log(gameObject);
        }
        jogos.push(jogoObject);
    }
    console.log(jogos);
}

async function organizeByGames() {
    const premios = await scrape();

    let jogo = [];
    const jogos = [];

    let counter = 0;

    premios.map(premio => {
        if(counter < 7) {
            jogo.push(premio);
            counter = counter + 1;
        } else {
            jogos.push(jogo);
            jogo = [];
            jogo.push(premio)
            counter = 0;
        }
    });
    jogos.push(jogo);
    //console.log(jogos);
    organizeInObjects(jogos);
}

async function scrape() {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto('https://www.resultadofacil.com.br/resultado-do-jogo-do-bicho/MG');

    const result = await page.evaluate(() => {
        const premios = [];
        let premio = []
        let validCounter = 0;
        let count = 0;
        document.querySelectorAll('div > table > tbody > tr td')
            .forEach((item) => {
                if (count < 4){
                    premio.push(item.innerText);
                    count = count + 1;
                } else {
                    premios.push(premio);
                    premio = [];
                    premio.push(item.innerText);
                    count = 1;
                }
                
            });
        return premios;
    });

    browser.close();
    
    return result;
} 

/*
/*fs.writeFile('jogos.json', result, (error) => {
        if(error) {
            console.error("Ocorreu um erro no filesystem: " + error);
        } else {
            console.log("Ok!!");
        }
    })
*/
