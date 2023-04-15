const puppeteer = require('puppeteer');
const fs = require('fs');

async function _generatePDF(html, opts) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf(opts);
    await browser.close();

    return pdf;
}

const downloadBrowser = async () => {
    if (!fs.existsSync('./node_modules/puppeteer/.local-chromium')) {
        const {
            downloadBrowser,
        } = require('puppeteer/lib/cjs/puppeteer/node/install.js');
        await downloadBrowser();
    }
};

module.exports = { _generatePDF, downloadBrowser };
