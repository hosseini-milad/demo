
const express = require('express');
const fetch = require('node-fetch');
const rx = require('../model/Order/rx');
const orders = require('../model/Order/orders');
const router = express.Router();

const hesabfaGetApi=async(req,res)=>{
    //console.log("HesabFaGetApi")
    const url = req.body.url;
    const { hesabServer ,hesabApi,tokenApi} = process.env;
    const headers={
        'Content-Type': 'application/json'
    }
    const initialPost=JSON.stringify({
        apiKey: hesabApi,
        loginToken: tokenApi
    })
    
    const response = await fetch(hesabServer+url,
         {method: 'POST', body: initialPost, headers:headers });
    const data = await response.json();
        
    try{
        res.json({data:data,url:`${hesabServer+url}`,body:initialPost})
    }
    catch(error){
        res.json(error)
    }
}
router.post('/getApi',hesabfaGetApi)


const hesabfaSetApi=async(req,res)=>{
    //console.log("HesabFaSetApi")
    const url = req.body.url;
    const { hesabServer ,hesabApi,tokenApi} = process.env;
    const headers={
        'Content-Type': 'application/json'
    }
    const initialPost=JSON.stringify({
        apiKey: hesabApi,
        loginToken: tokenApi,
        items:req.body.items
    })
    //console.log(initialPost)
    const response = await fetch(hesabServer+url,
         {method: 'POST', body: initialPost, headers:headers });
    const data = await response.json();
        
    try{
        res.json({data:data})
    }
    catch(error){
        res.json(error)
    }
}
router.post('/saveApi',hesabfaSetApi)

router.post('/faktorApi', async (req,res)=>{
    const orderNo = req.body.orderNo;
    var RS = 1
    if(orderNo.includes("S"))RS = 0
    const url = "/invoice/get";
    const contactUrl="/contact/get";
    var hesabfaCode = ''
    const rxData = RS?await rx.findOne({rxOrderNo:orderNo}):
        await orders.findOne({stockOrderNo:orderNo})
    if(rxData){
        hesabfaCode = rxData.hesabfaFaktor;
        const { hesabServer ,hesabApi,tokenApi} = process.env;
        const headers={
            'Content-Type': 'application/json'
        }
        const initialPost=JSON.stringify({
            apiKey: hesabApi,
            loginToken: tokenApi,
            number:hesabfaCode,
            type:"0"
        })
        //console.log(initialPost)
        const response = await fetch(hesabServer+url,
            {method: 'POST', body: initialPost, headers:headers });
        const data = await response.json();
            
        try{
            res.json({data:data})
        }
        catch(error){
            res.json(error)
        }
    }
    else{
        res.json({data:"سفارش پیدا نشد",error:"true"})
    }
})


module.exports = router;