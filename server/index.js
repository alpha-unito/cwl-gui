const express = require('express');
const cwlTsAuto = require('cwl-ts-auto');
const fs = require('fs');
const url = require('url');
const yaml = require('js-yaml');

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
        if(file.id == file.loadingOptions.fileUri) {
            fileString = file.save();
            delete fileString.id
            fileAsString = yaml.dump(fileString);
        }else{
            fileAsString = yaml.dump(file.save());
        }
        fileAsString = fileAsString.replaceAll(file.loadingOptions.fileUri+"#","")
        res.json({ result: true, string: fileAsString, object: file.save()});
    })
    .catch((e) => {
        if(e instanceof cwlTsAuto.ValidationException) {
            res.json({ result: false, message: e.toString() });
        } else {
            res.json({ result: false, message: e });
        }
    })
});

app.post('/api/general', (req, res) => {
    let cwl = req.body.content
    let docAsString = yaml.dump(cwl)
    cwlTsAuto.loadDocumentByString(docAsString, url.pathToFileURL('/').toString())
    .then((file) => {
        if(file.id == file.loadingOptions.fileUri) {
            fileString = file.save();
            delete fileString.id
            fileAsString = yaml.dump(fileString);
        }else{
            fileAsString = yaml.dump(file.save());
        }
        fileAsString = fileAsString.replaceAll(file.loadingOptions.fileUri+"#","")
        res.json({ result: true, string: fileAsString, object: file.save()});

    })
    .catch((e) => {
        if(e instanceof cwlTsAuto.ValidationException) {
            res.json({ result: false, message: e.toString() });
        } else {
            res.json({ result: false, message: e.toString() });
        }
    })
});

app.post('/api/node', (req, res) => {
    let cwl = req.body.content
    let docAsString = yaml.dump(cwl)
    cwlTsAuto.loadDocumentByString(docAsString, url.pathToFileURL('/').toString())
    .then((file) => {
        if(file.id == file.loadingOptions.fileUri) {
            fileString = file.save();
            delete fileString.id
            fileAsString = yaml.dump(fileString);
        }else{
            fileAsString = yaml.dump(file.save());
        }
        fileAsString = fileAsString.replaceAll(file.loadingOptions.fileUri+"#","")
        res.json({ result: true, string: fileAsString, object: file.save()});

    })
    .catch((e) => {
        if(e instanceof cwlTsAuto.ValidationException) {
            res.json({ result: false, message: e.toString() });
        } else {
            res.json({ result: false, message: e.toString() });
        }
    })
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

