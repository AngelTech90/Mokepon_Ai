import { google } from '@ai-sdk/google'
import { generateObject } from 'ai'
import { object, z } from 'zod'
import  dotenv  from 'dotenv'
import { request } from 'express'
import { response } from 'express'

dotenv.config();

let aiResponse:object;

const express = require('express')
const cors = require('cors')

let amountOfMokeponsGenerated:number = 1;

async function main(){
    const objectAi = await generateObject({
        model: google('models/gemini-1.5-pro-latest'),
        schema:z.object({
            mokepon: z.object({
                image: z.string(),
                input: z.string(),
                atacks: z.array(z.string()),
                label: z.string(),
                name: z.string(),
                type: z.array(z.string()),
                x: z.number(),
                y: z.number(),
                width: z.number(),
                height: z.number(),
                idMk: z.number()
            })
        }),

        prompt:`Generate to me ${amountOfMokeponsGenerated} objects in javascript like this structure:

                    class Mokepon {

                    constructor(image,input,label,name,x,y,width,height,idMk){
                        this.image =image;
                        this.input = input;
                        this.atacks = [];
                        this.label = label;
                        this.name = name;
                        this.type = [];
                        this.x = x;
                        this.y = y;
                        this.width = 70;
                        this.height = 70;
                        this.idMk = Math.random();
                    }
                }`

    });

    aiResponse = objectAi.object.mokepon;

    console.log(aiResponse);

    JSON.stringify(aiResponse);
}

if(amountOfMokeponsGenerated > 0){
    main().catch(console.error);
}
    

const app = express();

app.use(cors());
app.use(express.json());

app.get("/join", (req: request, res: response) => {

    res.setHeader("Access-Control-Allow-Origin", "*");

    setInterval(()=>{
        res.send(aiResponse)
    },10000)

});

app.listen(5500, () => {
    console.log("server Running");
});


