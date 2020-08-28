const puppeteer = require('puppeteer');
//const fs = require('fs');

organizeData();

async function organizeData() {
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
    console.log(jogos);
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
