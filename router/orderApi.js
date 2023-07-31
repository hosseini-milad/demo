const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
var ObjectID = require('mongodb').ObjectID;

const lenzStockSchema = require('../model/Order/stock');
const ManSchema = require('../model/Order/manufacture');
const OrdersSchema = require('../model/Order/orders');
const ManufactureStateSchema= require('../model/brands/manufacture')
const RXSchema = require('../model/Order/rx');
const ColorSchema = require('../model/products/color');
const MirrorSchema = require('../model/products/mirror');
const CoverSchema = require('../model/products/cover');
const XtraSchema = require('../model/products/xtra');
const userSchema = require('../model/user');
const KharidSchema = require('../model/Order/Kharid')
const userInfo = require('../model/userInfo');
const transferMethod = require('../model/products/transferMethod');
const paymentMethod = require('../model/products/paymentMethod');
const param = require('../model/Params/param');
const orders = require('../model/Order/orders');
const orderLogSchema = require('../model/Params/logsOrder')
const sepidarstock = require('../model/Order/sepidarstock');
const sendSmsUser = require('../AdminPanel/components/sendSms');
const HesabFaApiCall = require('../AdminPanel/components/hesabFaApiCall');
const user = require('../model/user');
const brand = require('../model/brands/brand');
const Cart = require('../model/Order/Cart');
const sendToInvoiceHesabFa = require('../AdminPanel/components/hesabfaInvoice');
const schedulePrice = require('../middleware/Scheduler');
const rx = require('../model/Order/rx');

const reyhamConcat = (osArray,odArray) =>{
    var result = [];
    if(osArray.length===0&&odArray.length===0)return(result)
    //const brand = osArray[0]?osArray[0]:odArray[0];
    var osStockArray = JSON.stringify(osArray).replace(/sph/g,'osSPH');
        osStockArray = JSON.parse(osStockArray.replace(/cyl/g,'osCYL').replace(/price/g,'osPrice'));
        
    var odStockArray = JSON.stringify(odArray).replace(/sph/g,'odSPH');
        odStockArray = JSON.parse(odStockArray.replace(/cyl/g,'odCYL').replace(/price/g,'odPrice'));
 
    if(!osStockArray.length)return(odStockArray)
    if(!odStockArray.length)return(osStockArray)
    for(var i=0;i<osStockArray.length;i++){
        for(var j=0;j<odStockArray.length;j++){
            if(osStockArray[i].brandName === odStockArray[i].brandName&&
                osStockArray[i].material === odStockArray[i].material//&&
                //osStockArray[i].lenzIndex === odStockArray[i].lenzIndex&&
                //osStockArray[i].coating === odStockArray[i].coating
                ){
                const rep = result.find(item=>item.sku===osStockArray[i].sku+"|"+odStockArray[i].sku)
                !rep&&result.push({ 
                sku:osStockArray[i].sku+"|"+odStockArray[i].sku,
                hesabfa:osStockArray[i].hesabfa+"|"+odStockArray[i].hesabfa,
                brandName:osStockArray[i].brandName,
                material:osStockArray[i].material,
                lenzIndex:osStockArray[i].lenzIndex,
                coating:osStockArray[i].coating,
                
                osSPH:osStockArray[i].osSPH,
                osCYL:osStockArray[i].osCYL,
                osPrice:osStockArray[i].osPrice,

                odSPH:odStockArray[i].odSPH,
                odCYL:odStockArray[i].odCYL,
                odPrice:odStockArray[i].odPrice,
            
            })}
        }
    }
    return(result)
}
router.post('/stock/list',jsonParser,async (req,res)=>{
    try{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
 
    const data={
        brand:req.body.brand,
        lenzIndex:req.body.lenzIndex,
        material:req.body.material,
        coating:req.body.coating,
        offset:req.body.page,

        odSph:req.body.odSph,
        odCyl:req.body.odCyl,
        osSph:req.body.osSph,
        osCyl:req.body.osCyl,
        dia:req.body.dia,
        add:req.body.add,
        design:req.body.design,
        align:req.body.align,
        price:req.body.price,
        
        
    } 
        var sortPhrase=JSON.parse(
            `{"${req.body.sort?req.body.sort:"sku"}"
            :${req.body.sortAsc?1:-1}}`);
        const stockData = await sepidarstock
        .find(data.brand?{brandName:data.brand}:{})
        .find(data.lenzIndex?{lenzIndex:data.lenzIndex}:{})
        .find(data.material?{material:data.material}:{})
        .find(data.coating?{coating:data.coating}:{})
        .find(data.design?{design:data.design}:{})
        .find(data.price?{price:{$gte: data.price[0]*10000, $lte: data.price[1]*10000}}:{})
        //.find(data.price?{price:{$gte: data.price[0]*10000, $lte: data.price[1]*10000}}:{})
        .find(data.align?{align:data.align}:{})
        const odStock = stockData.filter(item=>(
            ((data.odSph||data.odCyl)&&(item.sph===(data.odSph?data.odSph:"0.00")))&&
                item.cyl===(data.odCyl?data.odCyl:"0.00")));
        const osStock = stockData.filter(item=>(
            ((data.osSph||data.osCyl)&&(item.sph===(data.osSph?data.osSph:"0.00")))&&
                item.cyl===(data.osCyl?data.osCyl:"0.00")));
        const stockResult = reyhamConcat(osStock,odStock); 
        const stockOffset = stockResult.slice(data.offset,data.offset+10)   
            //console.log(stockData)
        const brandList = stockResult?[...new Set(stockResult.map(item=>item.brandName))]:[];
        //const brandList = await ManSchema.distinct('brandName')
        const lenzIndexList = [...new Set(stockResult.map(item=>item.lenzIndex))];
        const materialList = [...new Set(stockResult.map(item=>item.material))];
        const coatingList = [...new Set(stockResult.map(item=>item.coating))];
        const designList = [...new Set(stockData.map(item=>item.design))];
        const alignList = [...new Set(stockData.map(item=>item.align))];
        const priceStatus= await param.findOne({title:"price"})
        
        res.json({stock:stockOffset,stockOD:odStock,stockOS:osStock,
            brandList:brandList,lenzIndexList:lenzIndexList,
            materialList:materialList,coatingList:coatingList,size:stockResult.length,
            alignList:alignList,designList:designList,priceStatus:priceStatus
        })
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/stock/sku',jsonParser,async (req,res)=>{
    try{
        const stockData = await sepidarstock
            .findOne({sku:req.body.sku})
        res.json(stockData)
    }
    catch(error){
        res.status(500).json({message: error})
    }
})
router.post('/stock/adminlist',jsonParser,async (req,res)=>{
    try{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    const data={
        brand:req.body.brand,
        sku:req.body.sku,
        lenzIndex:req.body.lenzIndex,
        material:req.body.material,
        coating:req.body.coating,
        offset:req.body.page,

        sph:req.body.sph,
        cyl:req.body.cyl,
        dia:req.body.dia,
        add:req.body.add,
        sphF:req.body.sphF?req.body.sphF:0,
        sphT:req.body.sphT,
        sphFix:req.body.sphFix,
        cylFix:req.body.cylFix,
        align:req.body.align,
        design:req.body.design,
        
    }
    var cylArr=[];
    for(var i=0;i<8;i++)
        cylArr.push(parseFloat(parseFloat(data.cyl)+.25*i).toFixed(2))
    
        var sortPhrase=JSON.parse(
            `{"${req.body.sort?req.body.sort:"sku"}"
            :${req.body.sortAsc?1:-1}}`);
        const stockData = await sepidarstock
        .find(data.brand?{brandName:data.brand}:{})
        .find(data.lenzIndex?{lenzIndex:data.lenzIndex}:{})
        .find(data.material?{material:data.material}:{})
        .find(data.coating?{coating:data.coating}:{})
        .find(data.dia?{dia:data.dia}:{})
        .find(data.add?{add:data.add}:{})
        .find(data.align?{align:data.align}:{})
        .find(data.design?{design:data.design}:{})
        .find(data.sphFix?{sph:data.sphFix}:{})
        .find(data.cylFix?{cyl:data.cylFix}:{})
        .find(data.sku?{sku:{$regex:data.sku}}:{})

        //.find(data.sph?{sph:{$in:data.sph}}:{})
        .find(data.cyl?{cyl:{$in:cylArr}}:{})
        .find(data.sphT&&{"sph" : {$ne: ""},"$expr" : 
            {$and:[{$lte: [ { $toDouble: "$sph" }, data.sphT ]}, 
                  {$gte: [ { $toDouble: "$sph" }, data.sphF ]}] }})
                  
    
    const pagingData = await sepidarstock
        .find(data.brand?{brandName:data.brand}:{})
        .find(data.lenzIndex?{lenzIndex:data.lenzIndex}:{})
        .find(data.material?{material:data.material}:{})
        .find(data.coating?{coating:data.coating}:{})
        .find(data.cyl?{cyl:{$in:cylArr}}:{})
        .find(data.dia?{dia:data.dia}:{})
        .find(data.add?{add:data.add}:{})
        .find(data.align?{align:data.align}:{})
        .find(data.design?{design:data.design}:{})
        .find(data.sphFix?{sph:data.sphFix}:{})
        .find(data.cylFix?{cyl:data.cylFix}:{})
        .find(data.sku?{sku:{$regex:data.sku}}:{})
        //.find(data.sphP?{sph:{$gt:"+5.25"}}:{})
        
        
        .find(data.sphT?{"sph" : {$ne: ""},"$expr" : 
            {$and:[{$lte: [ { $toDouble: "$sph" }, data.sphT ]}, 
                  {$gte: [ { $toDouble: "$sph" }, data.sphF ]}] }}:{})
        
        .sort(sortPhrase)
        .skip(data.offset<stockData.length?data.offset:0)
        .limit(parseInt(pageSize))

        const brandList = [...new Set(stockData.map(item=>item.brandName))];
        //const brandList = await ManSchema.distinct('brandName')
        const lenzIndexList = [...new Set(stockData.map(item=>item.lenzIndex))];
        const materialList = [...new Set(stockData.map(item=>item.material))];
        const coatingList = [...new Set(stockData.map(item=>item.coating))];
        const skuList=stockData.map(item=>item.sku);
        
        const designList = [...new Set(stockData.map(item=>item.design))];
        const alignList = [...new Set(stockData.map(item=>item.align))];

        res.json({stock:pagingData,brandList:brandList,lenzIndexList:lenzIndexList,
            materialList:materialList,coatingList:coatingList,size:stockData.length,
            allStock:skuList,in:data, designList:designList,alignList:alignList
        })
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}) 
router.post('/stock/add',jsonParser,async (req,res)=>{
    try{
    const data = {
        id:req.body.id,
        sku: req.body.sku,
        hesabfa: req.body.hesabfa,
        od: req.body.od,
        count:req.body.count,
        sph:req.body.sph,
        cyl:req.body.cyl,
        dia:req.body.dia,
        add:req.body.add,
        design:req.body.design,
        align:req.body.align,

        brandName:req.body.brandName,
        lenzIndex:req.body.lenzIndex,
        material:req.body.material,
        coating:req.body.coating,
 
        price:req.body.price&&req.body.price.replace( /,/g, ''),
        price1:req.body.price1&&req.body.price1.replace( /,/g, ''),
        discount:req.body.discount&&req.body.discount.replace( /,/g, ''),
        purchase:req.body.purchase&&req.body.purchase.replace( /,/g, ''),
    } 
        //const existStock = await sepidarstock.find({_id:data.id});
        const lensTitle=data.brandName+" "+data.lenzIndex+" "+
            data.material+" "+(data.coating?(data.coating+" "):"")+
            "("+data.sph+"|"+data.cyl+") ";
        if(data.id){
            const existStockData = await sepidarstock.findOne({_id:data.id})
             
            saveHesabFa = await HesabFaApiCall("/item/save",{item:{
                Name:lensTitle,
                ProductCode:existStockData.sku,
                Barcode:existStockData.sku,
                Code:existStockData.hesabfa,
                BuyPrice:existStockData.price,//*(off&&off.purchase?(100-off&&off.purchase)/100:.9),
                SellPrice:existStockData.price
            }})
            const stockData = await sepidarstock.updateOne({_id:data.id},{$set:data})
            res.json({stock:saveHesabFa,message:"update"})
        }
        else{
            
            var hesabFa =await HesabFaApiCall("/item/save",{item:{
                Name:lensTitle,
                ItemType: 0,
                ProductCode:req.body.sku,
                Barcode:req.body.sku,
                BuyPrice:data.price,//*(off&&off.purchase?(100-off&&off.purchase)/100:.9),
                SellPrice:data.price
            }
            })
            console.log(hesabFa)
            if(hesabFa&&hesabFa.Result){
            await sepidarstock.create(
                {...data,title:lensTitle,sku:req.body.sku,
                    hesabfa:hesabFa.Result&&hesabFa.Result.Code})
                    res.json({stock:hesabFa,message:"new"})
            }
            else{
                res.json({error:hesabFa.ErrorCode,message:hesabFa.ErrorMessage})
            }
            //const stockData = await sepidarstock.create(data)
            
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/stock/remove',jsonParser,async (req,res)=>{
    const data = {
        id:req.body.id,
        sku:req.body.sku
    }
    try{
        const existOrder = await OrdersSchema.findOne({stockFaktor:{$elemMatch:{sku:data.sku}}})
        if(!existOrder){
            const existStock = await sepidarstock.deleteOne({_id:data.id});
            res.json({message:"deleted"})
        }
        else(
            res.status(400).json({error:"item in faktor",orderNo:existOrder.stockOrderNo}) 
        )
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/stock/price',jsonParser,async (req,res)=>{

    var priceSet = {};
    if(req.body.price1){
        priceSet={price1:req.body.price1}
    }
    if(req.body.purchase){
        priceSet={purchase:req.body.purchase}
    }
    if(req.body.price){
        priceSet={price:req.body.price}
    }
    try{
        const stockData = await sepidarstock.updateMany({sku:{$in:req.body.sku}},
            {$set:priceSet})
        res.json({stock:stockData,message:"update"})
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/stock/activePrice',jsonParser,async(req,res)=>{
    const priceNewState = req.body.priceState
    const currentPrice = await param.findOne({title:"price"})
    const dateFrom = req.body.dateFrom;
    const dateTo = req.body.dateTo
    //console.log(dateFrom,dateTo)
    if(dateFrom){
        schedulePrice(dateFrom,"active","price")
        dateTo&&schedulePrice(dateTo,"deactive","price")
    }
    
    if(!dateFrom&&priceNewState&&currentPrice)
        await param.updateOne({title:"price"},{$set:{paramValue:priceNewState}})
    if(!currentPrice){
        await param.create({title:"price",paramValue:priceNewState})
    }
    const newStatePrice = await param.findOne({title:"price"})
    res.json({status:newStatePrice})
})
router.post('/rx/activePrice',jsonParser,async(req,res)=>{
    const priceNewState = req.body.priceState
    const currentPrice = await param.findOne({title:"rxPrice"})
    const dateFrom = req.body.dateFrom;
    const dateTo = req.body.dateTo
    //console.log(dateFrom,dateTo)
    if(dateFrom){
        schedulePrice(dateFrom,"active","rxPrice")
        dateTo&&schedulePrice(dateTo,"deactive","rxPrice")
    }
    
    if(!dateFrom&&priceNewState&&currentPrice)
        await param.updateOne({title:"rxPrice"},{$set:{paramValue:priceNewState}})
    if(!currentPrice){
        await param.create({title:"rxPrice",paramValue:priceNewState})
    }
    const newStatePrice = await param.findOne({title:"rxPrice"})
    res.json({status:newStatePrice})
})
router.post('/stock/purchase',jsonParser,async (req,res)=>{
    try{
        
        const stockData = await sepidarstock.updateMany({sku:{$in:req.body.sku}},{$set:{purchase:req.body.purchase}})
        res.json({stock:stockData,message:"update"})
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/stock/find',jsonParser,async (req,res)=>{
    try{
    const stockList = req.body.sku.split('|');
        const stockData = await sepidarstock.find({sku:{$in:stockList}});
        res.json(stockData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/manufacture/list',jsonParser,async (req,res)=>{
    //const brandFilter=["ESSENCE","KODAK","MGMPlus","REVO"]
    try{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    const data={ 
        facoryName:req.body.facoryName,
        brand:req.body.brand,
        lenzType:req.body.lenzType,
        lenzDesign:req.body.lenzDesign,
        lenzIndex:req.body.lenzIndex,
        material:req.body.material,
        sku:req.body.sku,
        offset:req.body.page
    }
    const activeMan=await ManufactureStateSchema.find({state:"فعال"}).distinct("enTitle")
    const userData = await userSchema.findOne({_id:req.headers["userid"]})
    const userGroup = (userData&&userData.group)?userData.group.split('|'):[]
    //console.log(userGroup)
        var sortPhrase=JSON.parse(
            `{"${req.body.sort?req.body.sort:"sku"}"
            :${req.body.sortAsc?1:-1}}`);
        const manData = await ManSchema.find(!req.body.access?{active:{$not:/false/}}:{})
        .find(data.facoryName?{facoryName:data.facoryName}:
            req.body.access?{}:
            {$or:[{facoryName : {$in: activeMan }},{facoryName :{$in:userGroup}}]}
        )
        .find(data.brand?{brandName:data.brand}:{})//{brandName:{$in:brandFilter}})
        .find(data.lenzType?{lenzType:data.lenzType}:{})
        .find(data.lenzDesign?{lenzDesign:data.lenzDesign}:{})
        .find(data.lenzIndex?{lenzIndex:data.lenzIndex}:{})
        .find(data.material?{material:data.material}:{})
        .find(data.sku?{sku:{$regex: data.sku}}:{});
        const pageData = await ManSchema.find(!req.body.access?{active:{$not:/false/}}:{})
        .find(data.facoryName?{facoryName:data.facoryName}:
            req.body.access?{}:{ 
            facoryName : { $in: activeMan } 
        })
        .find(data.brand?{brandName:data.brand}:{})
        .find(data.lenzType?{lenzType:data.lenzType}:{})
        .find(data.lenzDesign?{lenzDesign:data.lenzDesign}:{})
        .find(data.lenzIndex?{lenzIndex:data.lenzIndex}:{})
        .find(data.material?{material:data.material}:{})
        .find(data.sku?{sku:{$regex: data.sku}}:{})
        .sort(sortPhrase) 
        .skip(data.offset<manData.length?data.offset:0)
        .limit(parseInt(pageSize));
        const manufactureList = //req.body.access?
            [...new Set(manData.map(item=>item.facoryName))]
        const brandList = [...new Set(manData.map(item=>item.brandName))];
        //const brandList = await ManSchema.distinct('brandName')
        const lenzTypeList = [...new Set(manData.map(item=>item.lenzType))];
        const lenzDesignList = [...new Set(manData.map(item=>item.lenzDesign))];
        const lenzIndexList = [...new Set(manData.map(item=>item.lenzIndex))];
        const materialList = [...new Set(manData.map(item=>item.material))];
        const coridorList = [...new Set(manData.map(item=>item.coridor))];

        const priceStatus= await param.findOne({title:"rxPrice"})

        res.json({manData:pageData,manufacture:manufactureList,
            brandList:brandList,lenzType:lenzTypeList,
            lenzDesign:lenzDesignList,lenzIndex:lenzIndexList,
            material:materialList,coridor:coridorList,
            size:manData.length,rawData:manData,activeMan:activeMan,
            priceStatus:priceStatus
        })
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}) 
router.post('/manufacture/listHesabfa',jsonParser,async (req,res)=>{
    try{
        const manData = await ManSchema.find() 
        
        res.json({data:manData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}) 
router.post('/manufacture/find',jsonParser,async (req,res)=>{
    try{
        const manData = await ManSchema.findOne({sku:req.body.sku});
        res.json(manData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}) 
router.post('/manufacture/add',jsonParser,async (req,res)=>{
    try{
    const data = {
        lensCode: req.body.lensCode,
        id:req.body.id,
        facoryName:req.body.facoryName,
        brandName:req.body.brandName,
        lenzIndex:req.body.lenzIndex,
        material:req.body.material,
        lenzType:req.body.lenzType,
        lenzDesign:req.body.lenzDesign,
        coridor:req.body.coridor,
        active:req.body.active,
        lenzPrice:req.body.lenzPrice&&req.body.lenzPrice.replace( /,/g, ''),
        lenzPrice1:req.body.lenzPrice1&&req.body.lenzPrice1.replace( /,/g, ''),
        lenzPurchase:req.body.lenzPurchase&&req.body.lenzPurchase.replace( /,/g, ''),
    }
    const existMan = await ManSchema.find({_id:data.id});
    const brandOff = await brand.find();
    const off = brandOff.find(item=>item.enTitle===(data.brandName?data.brandName:existMan[0].brandName))
    var saveHesabFa={}
    const lensTitle=data.brandName+" "+data.lenzIndex+" "+data.material+" "+
                data.lenzDesign+" "+data.lenzType
    if(existMan.length){ 
            const manData = await ManSchema.updateOne({_id:req.body.id},{$set:data})
            saveHesabFa = await HesabFaApiCall("/item/save",{item:{
                Name:lensTitle,
                ProductCode:existMan[0].sku,
                Barcode:existMan[0].sku,
                Code:existMan[0].hesabfa,
                BuyPrice:existMan[0].lenzPrice*(off&&off.purchase?(100-off&&off.purchase)/100:.9),
                SellPrice:existMan[0].lenzPrice
            }
            })
            res.json({manufacture:manData,message:"update",saveHesabFa:saveHesabFa})
        }
        else{
            if(req.body.sku){
                const oldData = await ManSchema.find({sku:req.body.sku})
            
                if(oldData.length){
                    res.json({error: "شناسه محصول تکراری است"})
                    return;
                }
                hesabFa =await HesabFaApiCall("/item/save",{item:{
                    Name:lensTitle,
                    ItemType: 0,
                    ProductCode:req.body.sku,
                    Barcode:req.body.sku,
                    BuyPrice:data.lenzPrice*(off&&off.purchase?(100-off&&off.purchase)/100:.9),
                    SellPrice:data.lenzPrice
                }
                })
                if(hesabFa.errno==="ENOTFOUND"){
                    res.json({error: "سرور حسابفا در دسترس نیست"})
                    return;
                }
                const manData = await ManSchema.create(
                    {...data,title:lensTitle,sku:req.body.sku,
                        hesabfa:!hesabFa.errno?hesabFa.Result.Code:req.body.sku})
                res.json({manufacture:manData,message:"new"})
            }
            else{
                var lastItem = await ManSchema.findOne().sort({"sku":-1})
                var lastSku = (parseInt(lastItem.sku)+1).toString();

                const hesabFa =await HesabFaApiCall("/item/save",{item:{
                    Name:lensTitle,
                    ItemType: 0,
                    ProductCode:lastSku,
                    Barcode:lastSku,
                    BuyPrice:data.lenzPrice*(off&&off.purchase?(100-off&&off.purchase)/100:.9),
                    SellPrice:data.lenzPrice
                }
                })
                const manData = await ManSchema.create({...data,sku:lastSku,hesabfa:hesabFa.Result.Code})
                res.json({manufacture:manData,message:lastSku +" created"}) 
            }

        } 
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/manufacture/priceAll',jsonParser,async (req,res)=>{
    const data = req.body.data
    var updateBody = []
    const brandOff = await brand.find();
    
    try{
        for(var i =0;i<data.length;i++){
            const off = brandOff.find(item=>item.enTitle===data[i][3])
            const rxData = await ManSchema.updateOne({sku:data[i][0]},
                {$set:{lenzPrice:parseInt(data[i][1].replace( /,/g, ''))}})
            if(data[i][2])
            updateBody.push({
                Code:data[i][2],
                BuyPrice:parseInt(data[i][1].replace( /,/g, ''))*(off&&off.purchase?(100-off&&off.purchase)/100:.9),
                SellPrice:parseInt(data[i][1].replace( /,/g, '')),

            })
            
        }
        const hesabFaUpdate =  HesabFaApiCall("/item/batchsave",{items:updateBody})
        res.json({rx:data,message:"ذخیره شد",saveHesabFa : hesabFaUpdate})
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/manufacture/price',jsonParser,async (req,res)=>{

    var priceSet = {};
    if(req.body.price1){
        priceSet={lenzPrice1:req.body.price1}
    }
    if(req.body.purchase){
        priceSet={lenzPurchase:req.body.purchase}
    }
    if(req.body.price){
        priceSet={lenzPrice:req.body.price}
    } 
    try{
        const rxData = await ManSchema.updateMany({sku:{$in:req.body.sku}},
            {$set:priceSet})
        res.json({RX:rxData,message:"update"})
        
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/color',async (req,res)=>{
    try{
        const colorData = await ColorSchema.find().sort({"sort":1});
        const mirrorData = await MirrorSchema.find().sort({"sort":1});
        const coverData = await CoverSchema.find().sort({"sort":1});
        const xtraData = await XtraSchema.find()
        res.json({color:colorData,mirror:mirrorData,cover:coverData,xtra:xtraData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/params',async (req,res)=>{
    try{
        const paramData = await param.find()
        res.json(paramData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/addItem',jsonParser, auth,async (req,res)=>{
    try{const data = {
        id:req.body.id, 
        userId:req.headers["userid"],
        manageId:req.headers["manageId"],
        stockId: req.body.stockId,
        stockOrderNo: req.body.stockOrderNo,

        stockOrderPrice: req.body.stockOrderPrice,
        stockFaktor: req.body.stockFaktor,
        
        status:req.body.status,
        date: Date.now()
    } 
    const stockData = await lenzStockSchema.findOne({_id:data.stockId});
    const price={
        extraPrice:SumPrices([data.framePrice,data.colorPrice,
                   data.coverPrice,data.mirrorPrice]),
        lenzPrice:SumPrices([stockData.priceOD,stockData.priceOS]),
        totalDiscount:stockData.discountOS,
        
    }
    const totalPrice=SumPrices([price.extraPrice,price.lenzPrice,-price.totalDiscount]);
    
        const existOrderItem = await OrdersSchema.find({_id:data.id});
        if(existOrderItem.length){
            const orderData = await OrdersSchema.updateOne({_id:data.id},{$set:data})
            res.json({order:orderData,message:"update"})
        }
        else{
            const orderData = await OrdersSchema.create({...data,...price,totalPrice:totalPrice})
            res.json({order:orderData,message:"new"})
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/updateItem',jsonParser, auth,async (req,res)=>{
    try{
    const data = {
        status:req.body.status,
    } 
        const orderData = await OrdersSchema.updateOne({_id:req.body.id},{$set:data})
            res.json({order:orderData,message:"update"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

const checkRep=async(userNo,dateYear,RS)=>{
    var newUserNo=userNo?parseInt(userNo%100):"00";
    if(newUserNo.toString().length===1)newUserNo="0"+newUserNo
    var rxTemp = '';
    while(1){
        const foundRx = rxTemp&&await RXSchema.findOne({rxOrderNo:rxTemp});
        
        if(rxTemp&&!foundRx)break
        else rxTemp=RS+faNumtoEn(dateYear[3])+newUserNo +
            (Math.floor(Math.random() * 10000) + 10000)
    }
    return(rxTemp)

}

const faNumtoEn=(faNum)=>{
    var outPut = ''
    const faDigits = ['۱','۲','۳','۴','۵','۶','۷','۸','۹','۰'];
    const enDigits = ['1','2','3','4','5','6','7','8','9','0'];
    for(index=0;faDigits.length;index++)
        if(faDigits[index]===faNum)
            return(enDigits[index])
    return(0)
}
router.post('/addrx',jsonParser, auth,async (req,res)=>{
    const fromUser = req.body.fromUser
    try{
        const data = {
            id:req.body.id,
            userId:fromUser?fromUser:req.headers["userid"],
            manageId:req.headers["manageid"],
            consumer: req.body.consumer,
            brand: req.body.brand,
            rxLenz: req.body.rxLenz,
            //rxOrderNo:req.body.rxOrderNo,
            rxFaktorNo:req.body.rxFaktorNo,
            lastIndex:req.body.lastIndex,
            lenzDid:req.body.lenzDid,
            odMain:req.body.odMain,
            odMore:req.body.odMore,
            
            osMore:req.body.osMore,
            osMain:req.body.osMain,
            copyLeftRight:req.body.copyLeftRight,
            singleLens:req.body.singleLens,

            frameSize:req.body.frameSize,
            frameType:req.body.frameType,
            frameImg:req.body.frameImg,

            colorCode:req.body.colorCode,
            colorPrice:req.body.colorPrice,

            coverCode:req.body.coverCode,
            coverPrice:req.body.coverPrice,
            coverDesc:req.body.coverDesc,
            coridor:req.body.coridor,

            mirrorCode:req.body.mirrorCode,
            mirrorPrice:req.body.mirrorPrice,

            lanti:req.body.lanti,
            NazokTigh:req.body.NazokTigh,
            NazokTighPrice:req.body.NazokTighPrice,
            extraInformation:req.body.extraInformation,
            viewValue:req.body.viewValue,
            studyDistance:req.body.studyDistance,
            job:req.body.job,
            moreInformation:req.body.moreInformation,
            
            expressPrice:req.body.expressPrice,
            totalPrice:req.body.totalPrice,
            totalDiscount:req.body.totalDiscount,
            status:req.body.status,
            date: Date.now()
        }
        //return('')
        const userData = await user.findOne({_id:fromUser?fromUser:data.userId})
        const existOrderItem = await RXSchema.findOne({userId:req.headers["userid"],status:"initial"});
        const dateNow = new Date().toLocaleString('fa-IR', { timeZone: 'Asia/Tehran' });
        //console.log(existOrderItem)
        if(existOrderItem){
            var rxData = '';
            if(data.status === "inprogress"){
                //console.log("start from here")
                if(fromUser)
                    data.userId = fromUser
                const orderNo = await checkRep(userData.cCode&&userData.cCode.replace( /^\D+/g, ''),
                dateNow.split('/')[0],"R")
                data.manufacture = await findManufacture(existOrderItem.brand)
                if(data.totalPrice==='0') data.totalPrice = data.rxLenz.split(',')[0]
                var errors=0
                if(!existOrderItem.brand)errors=1
                if(!existOrderItem.odMain&&!existOrderItem.osMain)errors=2
                if(!existOrderItem.coverCode)errors=3
                if(!errors){rxData = await RXSchema.updateOne({userId:req.headers["userid"],
                    status:"initial"},{$set:{...data,rxOrderNo:orderNo}})
                const smsResult =await sendSmsUser(data.userId,process.env.regOrder,orderNo,"rxOrderNo",data.status)
                //console.log(smsResult)
                var logSet = await orderLogSchema.create({status:data.status,rxOrderNo:orderNo,date:Date.now(),user:data.manageId})}
                //console.log(logSet,data.manageId) 
                res.json({rx:rxData,message:!errors?"done":errors,new:1})
            }
            else{
                rxData = await RXSchema.updateOne({userId:req.headers["userid"],status:"initial"},
                    {$set:data})
                res.json({rx:rxData,message:"done"})
            } 
            //
            
        } 
        if(!existOrderItem){
            //data.rxOrderNo = await checkRep(data.rxOrderNo)
            const rxData = await RXSchema.create(data)
            res.json({rx:rxData,message:"new order"})
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
const findManufacture= async(brand)=>{
    const brandField = await ManSchema.findOne({brandName:brand})
    return brandField.facoryName
}
router.post('/addstock',jsonParser, auth,async (req,res)=>{
    const fromUser = req.body.fromUser;
    const status = req.body.status
    try{ 
    const data = {
        userId:fromUser?fromUser:req.headers["userid"],
        manageId:req.headers["manageid"],
        stockOrderNo:req.body.stockOrderNo,
        stockOrderPrice:req.body.stockOrderPrice,
        stockFaktor:req.body.stockFaktor,
        stockFaktorOrg:req.body.stockFaktor,
        stockService:req.body.stockService,
        stockGurantee:req.body.stockGurantee,
        stockGuranteeName:req.body.stockGuranteeName,
        status:req.body.status,
        date: Date.now()
    } 
    const userData = await user.findOne({_id:fromUser?fromUser:data.userId})
    const dateNow = new Date().toLocaleString('fa-IR', { timeZone: 'Asia/Tehran' });
    const adminData = await user.findOne({_id:req.headers["userid"]})
    const orderNo = await checkRep(userData.cCode&&userData.cCode.replace( /^\D+/g, ''),
        dateNow.split('/')[0],"S")
    
    const stockHesabFa = (status&&fromUser)&&
        await sendToInvoiceHesabFa({...data,stockOrderNo:orderNo},userData)            
    //console.log(stockHesabFa)
    if((status&&stockHesabFa.Success&&fromUser)){
        var logSet = await orderLogSchema.create({status:data.status,rxOrderNo:orderNo,date:Date.now(),user:fromUser})
        const stockData = await OrdersSchema.create({...data,stockOrderNo:orderNo,
        hesabfaFaktor:stockHesabFa.Result&&stockHesabFa.Result.Number})
        res.json({stock:stockHesabFa,
            hesabfaCode:stockHesabFa.Result&&stockHesabFa.Result.Reference,
            message:"order register"})
    }
    if(status&&!fromUser){
        var logSet = await orderLogSchema.create({status:data.status,rxOrderNo:orderNo,date:Date.now()})
        const stockData = await OrdersSchema.create({...data,stockOrderNo:orderNo})
        res.json({stock:stockHesabFa,message:"order register"})
        return;
    } 
    if(status&&!stockHesabFa.Success)
        res.json({error:stockHesabFa.ErrorMessage,message:"error"})
     
    
        if(!status){
            var logSet = await orderLogSchema.create({status:data.status,rxOrderNo:orderNo,date:Date.now(),
                user:fromUser?adminData.phone:""})
            const stockData = await OrdersSchema.create({...data,stockOrderNo:orderNo})
        
            res.json({message:"order register"})
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/rxList',jsonParser,auth,async(req,res)=>{
    try{
        const rxData = await RXSchema.find({ userId:req.headers["userid"]});
        const stockData = await OrdersSchema.find({ userId:req.headers["userid"]});
        const userData = await userInfo.findOne({userId:req.headers['userid']})
        const userRaw = await userSchema.findOne({_id:req.headers['userid']})
        res.json({rxData:rxData,stockData:stockData,userInfo:userData,userRaw:userRaw})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
const checkOverTime=async()=>{
    const QCOrders = await RXSchema.find({status:"inproduction"});
    const nowDate = new Date(Date.now())
    for(var i=0;i<QCOrders.length;i++)
        if(DefferTime(nowDate,QCOrders[i].progressDate)>4){
            await orderLogSchema.create({status:"faktor",rxOrderNo:QCOrders[i].rxOrderNo,date:Date.now(),user:"سیستمی"})
            await RXSchema.updateOne({rxOrderNo:QCOrders[i].rxOrderNo},
                {$set:{status:"faktor"}})
            }
    const adelOrders = await RXSchema.find({manufacture:"عادل لنز",status:{$in:["faktor","qc"]}});
    for(var i=0;i<adelOrders.length;i++)
        if(DefferTime(nowDate,adelOrders[i].progressDate)>4){
            await orderLogSchema.create({status:adelOrders[i].status==="faktor"?"sending":"inproduction",
                rxOrderNo:adelOrders[i].rxOrderNo,date:Date.now(),user:"سیستمی"})
            await RXSchema.updateOne({rxOrderNo:adelOrders[i].rxOrderNo},
                {$set:{status:adelOrders[i].status==="faktor"?"sending":"inproduction"}})
            }
    //console.log(nowDate.toString())
}
const DefferTime = (date1,date2)=>{
    const time1 = date1.getTime()
    const time2 = date2.getTime()
    var difference_seconds = time1 - time2;
    return(difference_seconds/3600000)
}
router.get('/rxListAll',jsonParser,async(req,res)=>{
    try{
    var time = (new Date(Date.now())).getHours();
    
        const userData = await userSchema.findOne({_id:req.headers['userid']})
        
        const rxData = await RXSchema.find();
        const stockData = (userData.access==="manager"||(time<17&&time>7))?
            await OrdersSchema.find():'';
        
        res.json({rxData:rxData,stockData:stockData,userInfo:userData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}) 
router.get('/rxSeprate',jsonParser,async(req,res)=>{
    try{
        var time = (new Date(Date.now())).getHours();
        checkOverTime()
        const userData = await userSchema.findOne({_id:req.headers['userid']})
        const access = userData.access
        const group = userData.group
        const rxDataInitial = await RXSchema.find({status:"initial"}).count();
        const rxDataInprogress = await RXSchema.find({status:"inprogress"}).count();
        const rxDataAccepted = await RXSchema.find(access==="factory"?{status:"accept",manufacture:group}:{status:"accept"}).count();
        
        const rxDataQC = await RXSchema.find(access==="factory"?{status:"qc",manufacture:group}:{status:"qc"}).count();
        const rxDataInproduction = await RXSchema.find(access==="factory"?{status:"inproduction",manufacture:group}:{status:"inproduction"}).count();
        const rxDataFaktor = await RXSchema.find(access==="factory"?{status:"faktor",manufacture:group}:{status:"faktor"}).count();
        const rxDataSending = await RXSchema.find(access==="factory"?{status:"sending",manufacture:group}:{status:"sending"}).count();
        const rxDataDelivered = await RXSchema.find({status:"delivered"}).count();
        const rxDataStoreSent = await RXSchema.find({status:"storeSent"}).count();
        const rxDataCompleted = access==="manager"? await RXSchema.find({status:"completed"}).count():"-";
        const rxDataCancel = await RXSchema.find(access==="factory"?{status:/cancel/,manufacture:group}:{status:/cancel/}).count();
        const rxDataHold = await RXSchema.find({status:"hold"}).count();
        
        res.json({rxDataInitial:rxDataInitial,
            rxDataInprogress:rxDataInprogress,
            rxDataAccepted:rxDataAccepted,
            rxDataQC:rxDataQC,
            rxDataInproduction:rxDataInproduction,
            rxDataFaktor:rxDataFaktor,
            rxDataSending:rxDataSending,
            rxDataDelivered:rxDataDelivered,
            rxDataStoreSent:rxDataStoreSent,
            rxDataCompleted:rxDataCompleted,
            rxDataCancel:rxDataCancel,
            rxDataHold:rxDataHold,
        userInfo:userData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/rxSeprateCustomer',jsonParser,async(req,res)=>{
    try{
        const rxDataInitial = await RXSchema.find({status:"initial",userId:ObjectID(req.headers["userid"])}).count();
        const rxDataInprogress = await RXSchema.find({status:"inprogress",userId:ObjectID(req.headers["userid"])}).count();
        const rxDataAccepted = await RXSchema.find({status:"accept",userId:ObjectID(req.headers["userid"])}).count();
        const rxDataQC = await RXSchema.find({status:"qc",userId:ObjectID(req.headers["userid"])}).count();

        const rxDataInproduction = await RXSchema.find({status:"inproduction",userId:ObjectID(req.headers["userid"])}).count();
        const rxDataFaktor = await RXSchema.find({status:"faktor",userId:ObjectID(req.headers["userid"])}).count();
        const rxDataSending = await RXSchema.find({status:"sending",userId:ObjectID(req.headers["userid"])}).count();
        const rxDataDelivered = await RXSchema.find({status:"delivered",userId:ObjectID(req.headers["userid"])}).count();
        const rxDataStoreSent = await RXSchema.find({status:"storeSent",userId:ObjectID(req.headers["userid"])}).count();
        const rxDataCompleted = await RXSchema.find({status:"completed",userId:ObjectID(req.headers["userid"])}).count();
        const rxDataCancel = await RXSchema.find({status:/cancel/,userId:ObjectID(req.headers["userid"])}).count();
        const rxDataHold = await RXSchema.find({status:"hold",userId:ObjectID(req.headers["userid"])}).count();

        res.json({rxDataInitial:rxDataInitial,
            rxDataInprogress:rxDataInprogress,
            rxDataAccepted:rxDataAccepted,
            rxDataQC:rxDataQC,
            rxDataInproduction:rxDataInproduction,
            rxDataFaktor:rxDataFaktor,
            rxDataSending:rxDataSending,
            rxDataDelivered:rxDataDelivered,
            rxDataStoreSent:rxDataStoreSent,
            rxDataCompleted:rxDataCompleted,
            rxDataCancel:rxDataCancel,
            rxDataHold:rxDataHold})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}) 
router.post('/rxSeprate/search',jsonParser,async(req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var offset = req.body.offset?req.body.offset:0;
    const search = req.body.search?req.body.search:'';
    try{
        const manData = await userSchema.findOne({_id:req.headers["userid"]})
        /*const rxDataOld = req.body.userId?await 
         RXSchema.find({status:{$regex:req.body.status},
            rxOrderNo:{$regex: search},
            userId:ObjectID(req.body.userId)})
            .sort((req.body.status==="completed"||req.body.status.includes("cancel"))?
                {date:-1}:{date:1})
            .skip(req.body.offset).limit(parseInt(pageSize)):
          await RXSchema.find(req.body.status?{status:{$regex:req.body.status}}:{})
            .find(search?{rxOrderNo:{$regex: search}}:{})
            .find({status:{$ne:"cancel"}})
            .find(manData.access==="factory"&&manData.group?{manufacture:manData.group}:{})
            .sort((req.body.status==="completed")?//||req.body.status.includes("cancel"))?
                {date:-1}:{date:1}) 
        .skip(req.body.offset).limit(parseInt(pageSize))*/
        const rxDataRaw = await 
         RXSchema.aggregate([
            { $match : req.body.status?{ status : {$regex:req.body.status}}:{} },
            { $match : req.body.userId?
                { userId : ObjectID(req.body.userId)}:{} },
            { $match : manData.access==="factory"&&manData.group?
                { manufacture : manData.group } :{}},
            { $match : search?{ rxOrderNo : {$regex: search} }:{} },
            { $addFields: { "userId": { "$toObjectId": "$userId" }}},
        
            {$lookup:{
                from : "users", 
                localField: "userId", 
                foreignField: "_id", 
                as : "userDetail"
            }},
            //{ $limit : parseInt(pageSize) },
            //{ $skip : parseInt(offset)}
        ])
        var rxData=[]
        for(var i =offset;i<offset+parseInt(pageSize);i++){
            if(i===rxDataRaw.length)break
            const sku = rxDataRaw[i].rxLenz&&rxDataRaw[i].rxLenz.split(',')[2]
            const orderLog = await orderLogSchema.find({rxOrderNo:rxDataRaw[i].rxOrderNo})
            const manufactureData = await ManSchema.findOne({sku:sku})
            rxData.push({...rxDataRaw[i],rxData:manufactureData,logData:orderLog})
        }
        res.json(rxData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}) 

router.get('/stockSeprate',jsonParser,async(req,res)=>{
    const access = req.body.access
    try{
    var time = (new Date(Date.now())).getHours();
        const userData = await userSchema.findOne({_id:req.headers['userid']})
        
        const stockDataInprogress = await OrdersSchema.find({status:"inprogress"}).count();
        const stockDataSending = await OrdersSchema.find({status:"sending"}).count();
        const stockDataDelivered = await OrdersSchema.find({status:"delivered"}).count();
        const stockDataWaitGu = await OrdersSchema.find({stockGurantee:"request"}).count();
        const stockDataPrintGu = await OrdersSchema.find({stockGurantee:"printed"}).count();
        const stockDataStoreSent = await OrdersSchema.find({status:"storeSent"}).count();
        const stockDataCompleted = await OrdersSchema.find({status:"completed"}).count();
        const stockDataCancel = await OrdersSchema.find({status:/cancel/}).count();

    
        res.json({stockDataInprogress:stockDataInprogress,
            stockDataSending:stockDataSending,
            stockDataDelivered:stockDataDelivered,
            stockDataWaitGu:stockDataWaitGu,
            stockDataPrintGu:stockDataPrintGu,
            stockDataStoreSent:stockDataStoreSent,
            stockDataCompleted:stockDataCompleted,
            stockDataCancel:stockDataCancel,
        userInfo:userData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/stockSeprateCustomer',jsonParser,async(req,res)=>{
    try{
        const stockDataInprogress = await OrdersSchema.find({status:"inprogress",userId:ObjectID(req.headers["userid"])}).count();
        const stockDataDelivered = await OrdersSchema.find({status:"delivered",userId:ObjectID(req.headers["userid"])}).count();
        const stockDataCompleted = await OrdersSchema.find({status:"completed",userId:ObjectID(req.headers["userid"])}).count();
        const stockDataCancel = await OrdersSchema.find({status:/cancel/,userId:ObjectID(req.headers["userid"])}).count();
        
        res.status(200).json({stockDataInprogress:stockDataInprogress,
            stockDataDelivered:stockDataDelivered,
            stockDataCompleted:stockDataCompleted,
            stockDataCancel:stockDataCancel})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/stockSeprate/search',jsonParser,async(req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    var offset = req.body.offset?req.body.offset:0;
    const search = req.body.search?req.body.search:'';
    try{
        /*const stockDataOld = req.body.userId?await 
         OrdersSchema.find({status:{$regex:req.body.status},
            stockOrderNo:{$regex: search},
            userId:ObjectID(req.body.userId)}):
          await OrdersSchema.find({status:{$regex:req.body.status},
            stockOrderNo:{$regex: search}})
        .skip(req.body.offset).limit(parseInt(pageSize))
        */
        const stockDataRaw = await 
        OrdersSchema.aggregate([
            { $match : req.body.status?{ status : {$regex:req.body.status}}:{} },
            { $match : req.body.userId?
                { userId : ObjectID(req.body.userId)}:{} },
            { $match : search?{ stockOrderNo : {$regex: search} }:{} },
            { $addFields: { "userId": { "$toObjectId": "$userId" }}},
        
            {$lookup:{
                from : "users", 
                localField: "userId", 
                foreignField: "_id", 
                as : "userDetail"
            }},
            //{ $limit : parseInt(pageSize) },
            //{$skip:parseInt(req.body.offset)}
        ])
        var stockData=[]
        for(var i =offset;i<offset+parseInt(pageSize);i++){
            if(i===stockDataRaw.length)break
            const sku = stockDataRaw[i].stockFaktor&&stockDataRaw[i].stockFaktor.map((e)=>(e.sku))
            const orderLog = await orderLogSchema.find({rxOrderNo:stockDataRaw[i].stockOrderNo})
            const stockDataInfo = await sepidarstock.find({sku:{$in:sku}})
            var totalPrice = calcTotalPriceStock(stockDataInfo,stockDataRaw[i])
            stockData.push({...stockDataRaw[i],stockData:stockDataInfo,
                logData:orderLog,totalPrice:totalPrice})
        }
        res.json(stockData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
const calcTotalPriceStock=(items,orders)=>{
    var totalPrice = 0
    for(var i=0;i<items.length;i++)
        totalPrice+= items[i].price*
        parseInt(orders.stockFaktor[i].count)
    //console.log(orders.stockService&&orders.stockService.length)
    for(var j=0;j<(orders.stockService&&orders.stockService.length);j++){
        totalPrice+= parseInt(orders.stockService[j].colorPrice&&
            orders.stockService[j].colorPrice.replace(/\D/g,''))
    }
    return(totalPrice)
}
router.post('/stockGurantee/search',jsonParser,async(req,res)=>{
    var pageSize = req.body.pageSize?req.body.pageSize:"10";
    const search = req.body.search?req.body.search:'';
    try{
        const stockData = await 
         OrdersSchema.find({stockGurantee:search})
          
        .skip(req.body.offset).limit(parseInt(pageSize))
        
        res.json(stockData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/stockGurantee/update',jsonParser,async(req,res)=>{
    const stockOrderNo = req.body.orderNo;
    const guranteeState = req.body.state;
    try{
        const stockData = await 
         OrdersSchema.updateOne({stockOrderNo:stockOrderNo},{$set:{stockGurantee:guranteeState}})
        
        res.json(stockData)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/rxKharid/search',jsonParser,async(req,res)=>{
    const search = req.body.search?(req.body.search).toUpperCase():'';
    try{ 
        const rxData = await RXSchema//.find({$or:[{status:"sending"},{status:"faktor"}]}).
            .find({rxOrderNo:search})
        if(rxData&&!rxData.length){
            res.status(500).json({error: "شماره سفارش موجود نیست" })
            return;
        }
        if((rxData[0].status==="sending"||rxData[0].status==="faktor"||
            rxData[0].status==="accept"||rxData[0].status==="inproduction"||
            rxData[0].status==="qc"))
            res.json(rxData)
        else
            res.status(500).json({error: rxData[0].status })
        
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
})
router.post('/rxSuspend',jsonParser,async(req,res)=>{
    try{
        const rxData = await RXSchema.aggregate([{$match:{status:/suspend/}},
        {$lookup:{
            from : "users", 
            localField: "userId", 
            foreignField: "_id", 
            as : "userDetail"
        }}])
        var rxSuspend = []
        
        for(var i=0;i<rxData.length;i++){
            const sku = rxData[i].rxLenz&&rxData[i].rxLenz.split(',')[2]
            const skuDetail = await ManSchema.findOne({sku:sku})
            rxSuspend.push({...rxData[i],sku:skuDetail})
        }
        
        res.json(rxSuspend)
                
    }
    catch(error){
        res.status(500).json({error: error.message})
    }
})

function findServices(rxList,productCode,Discount){
    var rxServices =[]
    if(!rxList)return 0;
    var quantity=1;
    try{quantity=(rxList.odMain.split(',')[0]&&rxList.osMain.split(',')[0])?2:1}
    catch{}
    rxServices.push({
        RowNumber: 1,
        Description: productCode&&productCode.title,
        productCode:rxList.rxLenz&&rxList.rxLenz.split(',')[2],
        ItemCode: productCode&&productCode.hesabfa,//existOrderItem.rxLenz.split(',')[2],
        Unit: 'لنگه',
        Discount:disPrice(rxList.rxLenz&&rxList.rxLenz.split(',')[0],
                            Discount,quantity),
        Quantity: quantity,
        UnitPrice: rxList.rxLenz&&rxList.rxLenz.split(',')[0],
    })
    if(rxList.colorCode)rxServices.push({
        Description:"کد رنگ: "+rxList.colorCode,
        ItemCode: "500002",
        Quantity:1,
        Discount:disPrice(rxList.colorPrice,Discount),
        UnitPrice:rxList.colorPrice
    }) 
    if(rxList.mirrorCode)rxServices.push({
        Description:"کد میرور: "+rxList.mirrorCode,
        ItemCode: "500003",
        Quantity:1,
        Discount:disPrice(rxList.mirrorPrice,Discount),
        UnitPrice:rxList.mirrorPrice
    })
    if(rxList.coverCode)rxServices.push({
        Description:"پوشش: "+rxList.coverCode,
        ItemCode: "500001",
        Quantity:1,
        Discount:disPrice(rxList.coverPrice,Discount),
        UnitPrice:rxList.coverPrice.includes("رایگان")?"0":rxList.coverPrice
    }) 
    if(rxList.NazokTigh)rxServices.push({
        Description:"خدمات بیشتر: "+rxList.NazokTigh,
        ItemCode: "500004",
        Quantity:1,
        Discount:disPrice(rxList.NazokTighPrice,Discount),
        UnitPrice:rxList.NazokTighPrice
    })
    return(rxServices)
}
const disPrice=(price,discount,quantity)=>{
    if(!discount)return(0)
    if(!price)return(0)
    else{
        return((price.replace( /,/g, '')*(parseInt(discount.split('%')[0])))
        *(quantity?quantity:1)/100)
    }
}
router.post('/manage/addrx',jsonParser, auth,async (req,res)=>{
    var data = {
            status:req.body.status,
            progressDate: Date.now()
        } 
        const rx = await RXSchema.find({rxOrderNo:req.body.rxOrderNo})
        //console.log(rx)
        if(rx.length>1) {
            res.status(500).json({error: "کد سفارش تکراری است، لطفا با پشتیبانی تماس بگیرید"})
            return; 
        }
    try{    
        const userData = await userSchema.findOne({_id:rx[0].userId})
        const adminData = await userSchema.findOne({_id:req.headers["userid"]})
        const productCode = await ManSchema.findOne({sku:rx[0].rxLenz&&rx[0].rxLenz.split(',')[2]})
        var setFaktor = {}
        var rxData ={}
        if(data.status === "initial"){
            data = {...data, rxOrderNo:""}
        } 
        if(data.status === "accept"){
            userData&&await sendSmsUser(userData._id,process.env.acceptOrder,req.body.rxOrderNo,"rxOrder",data.status)
            //console.log(rx[0])
            if(!rx[0].manufacture){
                const result = await RXSchema.updateOne({rxOrderNo:req.body.rxOrderNo},{$set:{manufacture:"MGM Lens"}})
                console.log(!rx[0].manufacture)
            }
            
        }
        if(data.status.includes("cancel"))
            userData&&await sendSmsUser(userData._id,process.env.cancelOrder,req.body.rxOrderNo,
                `https://mgmlens.com/print/${req.body.rxOrderNo}`,data.status)
        if(data.status === "completed") 
            userData&&await sendSmsUser(userData._id,process.env.sendOrder,req.body.rxOrderNo,"rxOrder",data.status)
        if(data.status ==="delivered"){
            const invoiceData = {
                Date: new Date(Date.now()),
                DueDate: new Date(Date.now()),
                ContactCode: userData&&userData.cCode&&userData.cCode.replace( /^\D+/g, ''),
                ContactTitle: userData&&userData.cName,
                Reference:rx[0].rxOrderNo, 
                InvoiceType: 0, 
                Status: 2,
                InvoiceItems: findServices(rx[0],productCode,rx[0].totalDiscount)
                
            }
            setFaktor =await HesabFaApiCall("/invoice/save",{invoice:invoiceData}) 
            //console.log(invoiceData)
            //console.log(setFaktor.Result)
            if(setFaktor.Success){
                //console.log(setFaktor.Result&&setFaktor.Result.Number)
                await RXSchema.updateOne({
                rxOrderNo:req.body.rxOrderNo},{$set:{...data,
                    hesabfaFaktor:setFaktor.Result&&setFaktor.Result.Number}})}
            else{
                var errorOut = "خطایی رخ داده است"+"|"+setFaktor.ErrorCode;
                if(setFaktor.errno)
                    errorOut="خطا در ارتباط با حسابفا";
                if(setFaktor.ErrorCode===112)
                    errorOut="کد کالا در حسابفا مغایرت دارد"
                if(setFaktor.ErrorCode===104)
                    errorOut="پارامتر ضروری ارسال نشده است | "+setFaktor.ErrorMessage;
                await RXSchema.updateOne({
                        rxOrderNo:req.body.rxOrderNo},{$set:{status:("suspend|"+errorOut)}})
                res.status(500).json({error: errorOut,errorDetail:setFaktor});
                return
            }
        } 
        rxData = (data.status!=="delivered")&&
            await RXSchema.updateOne({
            rxOrderNo:req.body.rxOrderNo},{$set:data})
        await orderLogSchema.create({status:data.status,rxOrderNo:req.body.rxOrderNo,
            date:Date.now(),user:adminData&&adminData.phone})
         res.json({rx:rxData,message:"update",setFaktor:setFaktor})
    } 
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/manage/addstock',jsonParser, auth,async (req,res)=>{
    try{
    const data = {
        status:req.body.status,
        progressDate: Date.now()
    } 
    const oldStockData = await OrdersSchema.findOne({stockOrderNo:req.body.stockOrderNo})
    const userData = await userSchema.findOne({_id:oldStockData.userId})
    var stockData = ''
    if(data.status ==="delivered"){
        var items=[];
        for(var index=0;index<oldStockData.stockFaktor.length;index++){
            const pair =oldStockData.stockFaktor[index].align==="pair"?1:0;
            var stockDetail = await sepidarstock.findOne(
                {sku:(pair&&oldStockData.stockFaktor[index].sku)?
                    oldStockData.stockFaktor[index].sku.split('|')[0]:
                oldStockData.stockFaktor[index].sku})
            
        items.push({
            Description: (stockDetail&&stockDetail.title)+
                " ("+oldStockData.stockFaktor[index].align+")",
            productCode:oldStockData.stockFaktor[index].sku,
            ItemCode: oldStockData.stockFaktor[index].hesabfa,
            Unit: 'لنگه',
            Discount:oldStockData.stockFaktor[index].discount,
            Quantity: oldStockData.stockFaktor[index].count,
            UnitPrice: oldStockData.stockFaktor[index].price,
        })
        
    }
    
        setFaktor = await HesabFaApiCall("/invoice/save",{invoice:{
            Date: new Date(Date.now()),
            DueDate: new Date(Date.now()),
            ContactCode: userData.cCode&&userData.cCode.replace( /^\D+/g, ''),
            ContactTitle: userData.cName,
            Reference:oldStockData.stockOrderNo,
            InvoiceType: 0,
            Status: 2,
            InvoiceItems: items
        }})
        console.log(oldStockData.stockOrderNo)
        console.log(setFaktor)
        if(setFaktor.Success){
        stockData = await OrdersSchema.updateOne({
            stockOrderNo:req.body.stockOrderNo},{$set:{...data,
                hesabfaFaktor:setFaktor.Result&&setFaktor.Result.Number}})
        }
        else{
            var errorOut = "خطایی رخ داده است";
            if(setFaktor.errno)
                errorOut="خطا در ارتباط با حسابفا";
            if(setFaktor.ErrorCode===112)
                errorOut="کد کالا در حسابفا مغایرت دارد"
            if(setFaktor.ErrorCode===104)
                errorOut="کد مشتری در حسابفا مغایرت دارد"
            await RXSchema.updateOne({
                    rxOrderNo:req.body.rxOrderNo},{$set:{status:("suspend|"+errorOut)}})
            res.status(500).json({error: errorOut,errorDetail:setFaktor});
            return
        }
    }
    stockData = data.status !=="delivered"&&await OrdersSchema.updateOne({
        stockOrderNo:req.body.stockOrderNo},{$set:data})
        res.json({stock:stockData,message:"update"})
    } 
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/manage/editstock',jsonParser, auth,async (req,res)=>{
    try{
    const data = {
        newItem:req.body.newItem,
        oldID:req.body.oldID
    } 
    const oldStockData = await OrdersSchema.findOne({stockOrderNo:req.body.stockOrderNo})
    var stockFaktor = oldStockData.stockFaktor;
    if(data.newItem){
        if(data.oldID){
            for(var index=0;index<stockFaktor.length;index++)
            {
                if(stockFaktor[index].sku===data.oldID){
                    stockFaktor[index]=data.newItem
                    break
                }
            } 
        }
        else{
            stockFaktor.push(data.newItem)  
        }
    }
    else{
        for(var index=0;index<stockFaktor.length;index++)
            {
                if(stockFaktor[index].sku===data.oldID){
                    stockFaktor.splice(index, 1);
                    break
                }
            }

    }
    var stockData = await OrdersSchema.updateOne({
        stockOrderNo:req.body.stockOrderNo},{$set:{stockFaktor:stockFaktor}})
    
    const deliveredList = await OrdersSchema.findOne({stockOrderNo:req.body.stockOrderNo})
    
    if(deliveredList.status==="sending"){
        var statusCount= 0
        for(var index=0;index<deliveredList.stockFaktor.length;index++)
        {
            if(deliveredList.stockFaktor[index].status==="delivered"){
                statusCount++;
            }
        } 
        if(statusCount===deliveredList.stockFaktor.length)
        await OrdersSchema.updateOne({
            stockOrderNo:req.body.stockOrderNo},{$set:{status:"delivered"}})
    }
    const newStockData = await OrdersSchema.findOne({stockOrderNo:req.body.stockOrderNo})
        res.json({stock:newStockData,message:"update"})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/manage/rxList',jsonParser,auth,async(req,res)=>{
    try{
        const inprogressList = await RXSchema.find({ status:"inprogress"});
        const acceptList = await RXSchema.find({ status:"accept"});
        const QCList = await RXSchema.find({ status:"qc"});
        const inproductionList = await RXSchema.find({ status:"inproduction"});
        const faktorList = await RXSchema.find({ status:"faktor"});
        const sendingList = await RXSchema.find({ status:"sending"});
        const deliveredList = await RXSchema.find({ status:"delivered"});
        const sentStoreList = await RXSchema.find({ status:"sentStore"});
        const cancelList = await RXSchema.find({ status:{$regex :"cancel"}});
        
        const userData = await userSchema.findOne({_id:req.headers['userid']})
        res.json({inprogress:inprogressList,accept:acceptList,qc:QCList,
            inproduction:inproductionList,faktor:faktorList,sending:sendingList,
            delivered:deliveredList,cancel:cancelList,sentStore:sentStoreList,
        userInfo:userData})
    }
    catch{
        res.status(500).json({message: error.message})
    }
})

router.post('/addKharid',jsonParser, auth,async (req,res)=>{
    try{
    const data = {
        id:req.body.id,
        rxLenz: req.body.rxLenz,
        rxCount: req.body.rxCount,
        rxOrderNo:req.body.rxOrderNo,
        rxFaktorNo:req.body.rxFaktorNo,
        rxFaktorName:req.body.rxFaktorName,

        date: Date.now()
    } 
        const existKharidItem = await KharidSchema.findOne({rxLenz:data.rxLenz,rxFaktorNo:data.rxFaktorNo});
        
        if(existKharidItem){
            
            res.json({message:"error"})
        }
        else{
            const rxKharid = await KharidSchema.create(data)
            res.json({Kharid:rxKharid,message:"new"})
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/kharidList', auth,async(req,res)=>{
    try{
        const kharidList = await KharidSchema.find();
        res.json(kharidList)
    }
    catch{
        res.status(500).json({message: error.message})
    }
})

router.post('/fetch-order',jsonParser, async (req,res)=>{
    const data = {
        rxOrderNo: req.body.rxOrderNo,
    } 
    try{
        const existOrder = await RXSchema.findOne({rxOrderNo:data.rxOrderNo});
        const userData = await userSchema.findOne({_id:existOrder.userId})
        if(existOrder){
            
            res.json({data:existOrder,user:userData})
        }
        else{
            res.status(500).json({message: "not found"})
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/fetch-stockOrder',jsonParser, async (req,res)=>{
    const data = {
        stockOrderNo: req.body.orderNo,
    } 
    try{
        const existOrder = await OrdersSchema.findOne({stockOrderNo:data.stockOrderNo});
        const userData = await userSchema.findOne({_id:existOrder.userId})
        var stockDetailArray=[]
        for(var i=0;i<existOrder.stockFaktor.length;i++)
            stockDetailArray.push(await sepidarstock.findOne({sku:existOrder.stockFaktor[i].sku}))
        if(existOrder){
            
            res.json({data:existOrder,user:userData,detail:stockDetailArray})
        }
        else{
            res.status(500).json({message: "not found"})
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/fetch-orders',jsonParser, async (req,res)=>{
    const data = {
        rxOrderNo: req.body.rxOrderNo,
    } 
    try{
        const orderList = data.rxOrderNo
        var orderListDetail = []
        for(var i=0;i<orderList.length;i++){
            const existOrder = await RXSchema.findOne({rxOrderNo:orderList[i]});
            var userData =''
            var lenzData=''
            if(existOrder){
                lenzData = await ManSchema.findOne({sku:existOrder.rxLenz.split(',')[2]})
                userData = await userSchema.findOne({_id:existOrder.userId})
                orderListDetail.push({data:existOrder,user:userData,lenzData:lenzData})
            }
        }
        
        
        if(orderListDetail.length){
            
            res.json({data:orderListDetail})
        }
        else{
            res.status(500).json({message: "not found"})
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/fetch-stock',jsonParser, async (req,res)=>{
    const data = {
        stockOrderNo: req.body.stockOrderNo,
    } 
    try{
        const existOrder = await OrdersSchema.findOne({stockOrderNo:data.stockOrderNo});
        if(existOrder){
            res.json(existOrder)
        }
        else{
            res.status(500).json({message: "not found"})
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.get('/cart', auth,async (req,res)=>{
    try{
        const cartData = await OrdersSchema.aggregate([
            { $match : { userId : ObjectID(req.headers["userid"]) } },
            { $match : { status : "initial" } },
            {$lookup:{
                from : "stocks", 
                localField: "stockId", 
                foreignField: "_id", 
                as : "stockDetail"
            }},
        ])
        var totalPrice = "0";
        var totalDiscount = "0";
        for(var indx=0;indx<cartData.length;indx++){
            totalPrice= SumPrices([totalPrice,cartData[indx].totalPrice])
            totalDiscount=SumPrices([totalDiscount,cartData[indx].totalDiscount])
        }
        res.json({cart:{items:cartData,totalPrice:totalPrice,totalDiscount:totalDiscount,orderId:"MGM1401"+Date.now()}})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/addCart', auth,async (req,res)=>{
    const data={
        userId: req.headers["userid"],
        sku:req.body.sku,
        hesabfa:req.body.hesabfa,
        align:req.body.align,
        store:req.body.store,
        sph:req.body.sph,
        cyl:req.body.cyl,
        add:req.body.add,
        axis:req.body.axis,
        count:req.body.count?req.body.count:1,
        price:req.body.price,
    } 
    var status='undone'
    try{
        const ItemExists = await sepidarstock.findOne({sku:data.sku})
        
        if(!ItemExists){
            res.json({message: "کالا موجود نیست"})
            return}
        const cartData = await Cart.findOne({ userId : ObjectID(req.headers["userid"]),
             sku : data.sku, align:data.align} )
        if(cartData){
            const newCount=SumCount([cartData.count,data.count])
            await Cart.updateOne({_id:cartData._id},
                {$set:{count:newCount,price:data.price}})
            status="updateCart"
        }
        else{
            await Cart.create(data)
            status="newCart"
        }
        const cartOut = await Cart.aggregate([
            { $match : { userId : (req.headers["userid"]) } },
            {$lookup:{
                from : "sepidarstocks", 
                localField: "sku", 
                foreignField: "sku", 
                as : "stockDetail"
            }}])
            var count = 0;
            for(var i =0;i<cartOut.length;i++){
                count+= parseInt(cartOut[i].count)
            }
            var singleOrder=checkSingle(cartOut,count);
        res.json({cart:cartOut,status:status,count:count,singleOrder:singleOrder})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}) 
router.post('/removeCart', auth,async (req,res)=>{
    const data={
        userId: req.headers["userid"],
        sku:req.body.sku,
        align:req.body.align
    }
    var status='undone'
    try{
        const cartData = await Cart.findOne({ userId : ObjectID(req.headers["userid"]),
             sku : data.sku, align:data.align} )
        if(cartData&&data.sku&&data.align){
            await Cart.deleteOne({_id:cartData._id})
            status="deleteCart"
        }
        if(!data.sku&&!data.align){
            await Cart.deleteMany({userId:data.userId})
            status="deleteAll"
        }
        const cartOut = await Cart.aggregate([
            { $match : { userId : (req.headers["userid"]) } },
            {$lookup:{
                from : "sepidarstocks", 
                localField: "sku", 
                foreignField: "sku", 
                as : "stockDetail"
            }}])
        res.json({cart:cartOut,status:status})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/editCart', auth,async (req,res)=>{
    const data={
        userId: req.headers["userid"],
        sku:req.body.sku,
        align:req.body.align,
        store:req.body.store,
        count:req.body.count
    } 
    try{
        const cartData = await Cart.updateOne({ userId : ObjectID(req.headers["userid"]),
             sku : data.sku, align:data.align},{$set:{count:data.count}} )
        const cartOut = await Cart.aggregate([
            { $match : { userId : (req.headers["userid"]) } },
            {$lookup:{
                from : "sepidarstocks", 
                localField: "sku", 
                foreignField: "sku", 
                as : "stockDetail"
            }}])
            var count = 0;
            for(var i =0;i<cartOut.length;i++){
                count+= parseInt(cartOut[i].count)
            }
            var singleOrder=checkSingle(cartOut,count);
        
        res.json({cart:cartOut,status:"edited",count:count,singleOrder:singleOrder})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}) 
const checkSingle=(order,count)=>{
    try{
    if(count===2&&order.length===2){
        if(order[0].align===order[1].align)
            return(0)
        else{
            if(order[0].stockDetail[0].brandName===order[1].stockDetail[0].brandName)
            return(order[0].stockDetail[0].brandName)
        }
    }
    return(0)
    }
    catch{return(0)}
} 
router.get('/getCart', auth,async (req,res)=>{
    const cartOut = await Cart.aggregate([
        { $match : { userId : (req.headers["userid"]) } },
        {$lookup:{
            from : "sepidarstocks", 
            localField: "sku", 
            foreignField: "sku", 
            as : "stockDetail"
        }}])
    var count = 0;
    for(var i =0;i<cartOut.length;i++){

        count+= parseInt(cartOut[i].count)
    } 
    var singleOrder=checkSingle(cartOut,count);
    
    const currentPrice = await param.findOne({title:"price"})
    res.json({cart:cartOut,priceState :currentPrice,
    count:count,singleOrder:singleOrder})
}) 
router.get('/cartside', async (req,res)=>{
    const transData = await transferMethod.find().sort({"sort":1});
    const paymentData = await paymentMethod.find().sort({"sort":1});
    res.json({transferMethod:transData,paymentMethod:paymentData})
})




const SumPrices =(prices)=>{
    var outResult = 0;
    for(var index=0;index<prices.length;index++){
        if(prices[index]){
            try{outResult+=parseInt(prices[index].toString().replace(/,/g,''))}
		catch{}
		}
    }
    return(outResult.toString())
}
const SumCount =(count)=>{
    var outResult = 0;
    for(var index=0;index<count.length;index++){
        if(count[index]){
            try{outResult+=parseInt(count[index].toString().replace(/,/g,''))}
		catch{}
		}
    }
    return(outResult.toString())
}
module.exports = router;