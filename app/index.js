const express = require('express');
const { _generatePDF, downloadBrowser } = require('./pupp.js');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/generatePDF', async (req, res) => {
    try {
        const data = req.body;
        const html = data.html;
        const opts = data.opts;
        const pdf = await _generatePDF(html, opts);

        res.send(pdf);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('There was an error generating the PDF.');
    }
});

app.listen(port, async () => {
    await downloadBrowser();

    console.log(`App started on port ${port}`);
});
