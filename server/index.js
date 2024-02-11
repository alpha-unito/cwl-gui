const express = require('express');
const cwlTsAuto = require('cwl-ts-auto');
const fs = require('fs');
const url = require('url');


const app = express();
const port = 5000;

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post('/api/data', (req, res) => {
    let docAsString = req.body.content
    cwlTsAuto.loadDocumentByString(docAsString, url.pathToFileURL('/').toString())
    .then((file) => {
        res.json({ message: file });
    })
    .catch((e) => {
        if(e instanceof cwlTsAuto.ValidationException) {
            res.json({ message: e.toString() });
        } else {
            res.json({ message: e });
        }
    })
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
