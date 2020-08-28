const puppeteer = require('puppeteer');

organizeData();

async function organizeData() {
    const items = await scrape();

    console.log(items);
    
}

async function scrape() {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto('https://www.resultadofacil.com.br/resultado-do-jogo-do-bicho/MG');

    const result = await page.evaluate(() => {
        const games = [];
        let game = []
        let validCounter = 0;
        let count = 0;
        document.querySelectorAll('div > table > tbody > tr td')
            .forEach((item) => {
                if (count < 4){
                    game.push(item.innerText);
                    count = count + 1;
                } else {
                    games.push(game);
                    game = [];
                    game.push(item.innerText);
                    count = 1;
                }
                
            });
        return games;
    });

    browser.close();
    return result;
} 
//let scrape = async () => {
    
//}


//scrape().then((value) => console.log(value));