import { fileURLToPath } from 'url';
import { dirname } from 'path';

// สร้าง __dirname สำหรับโมดูล ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import * as fs from "fs";
import express from "express";

var app = express();

app.get('/index.json', function(req, res){
    res.send(fs.readFileSync(__dirname + "/SDKServer/index.json")) // ใช้ __dirname ที่เรากำหนดไว้
    console.log("SDK Server respond to /index.json");
});

app.get('/api/login', function(req, res){
    res.send({code:0,token:req.query.token,userData:Number(req.query.userData),host:"127.0.0.1",port:1337,hasRpc:true}, null, 4);
    console.log("SDK Server respond to /api/login");
});

app.listen(process.env.SDKSERVERPORT || 5500);

console.log(`SDK Server is running on port ${process.env.SDKSERVERPORT || 5500}`);
