import { readFile } from "node:fs/promises";

import express from 'express';
import bodyParser from 'body-parser';

import { html } from "satori-html";
import satori from 'satori'
import { Resvg } from "@resvg/resvg-js";

const app = express();
const port = 3000;

const options = {
    width: 750,
    height: 430,
    fonts: [
        {
            name: "Roboto",
            data: await readFile("./Quicksand-Bold.ttf"),
            weight: 900,
            style: "normal",
        },
        {
            name: "Roboto",
            data: await readFile("./Quicksand-SemiBold.ttf"),
            weight: 600,
            style: "normal",
        },
        {
            name: "Roboto",
            data: await readFile("./RobotoMono-Light.ttf"),
            weight: 100,
            style: "normal",
        },
    ],
}

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.post('/', async (req, res) => {
    try {
        const template = req.body.template;
        console.log(`Received template: ${template}`);

        const svg = await satori(html(template), options);

        const resvg = new Resvg(svg);
        const pngData = resvg.render();
        const pngBuffer = pngData.asPng();
        
        res.type('image/png');
        res.send(pngBuffer);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
