const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 8080;

app.get('/data', (req, res) => {
    const fileName = req.query.n;
    const lineNumber = req.query.m;

    if (!fileName) {
        return res.status(400).send("Missing 'n' parameter");
    }

    const filePath = `/tmp/data/${fileName}.txt`;

    if (lineNumber) {
        try {
            const content = fs.readFileSync(filePath, 'utf-8').split('\n')[lineNumber - 1];
            return res.send(content);
        } catch (error) {
            return res.status(400).send("'m' parameter is invalid");
        }
    }

    if (!fs.existsSync(filePath)) {
        return res.status(404).send('File not found');
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    return res.send(content);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});