const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto('https://www.resultadofacil.com.br/resultado-do-jogo-do-bicho/MG/de-hoje');
    await page.screenshot({ path: 'screenshot.png' });

    await browser.close();
})();