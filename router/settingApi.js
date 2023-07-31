const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const router = express.Router()
const auth = require("../middleware/auth");
var ObjectID = require('mongodb').ObjectID;
const HesabFaApiCall = require('../AdminPanel/components/hesabFaApiCall');

const ColorSchema = require('../model/products/color');
const sepidarstocks = require('../model/Order/sepidarstock');
const XtraSchema = require('../model/products/xtra');
const MirrorSchema = require('../model/products/mirror');
const CoverSchema = require('../model/products/cover');
const stockService = require('../model/Params/stockServices');
const PagesSchema = require('../model/pages');
const RXSchema = require('../model/Order/rx');
const PostSchema = require('../model/products/Post');
const logSchema = require('../model/Params/logs')
const orderLogSchema = require('../model/Params/logsOrder')
const SliderSchema = require('../model/slider');
const CategorySchema = require('../model/products/category');
const ProductSchema = require('../model/products/Product');
const fs = require('fs');
const mime = require('mime');
const user = require('../model/user');
const FireBase = require('../model/fireBase');
const orders = require('../model/Order/orders');

router.post('/upload',jsonParser, async(req, res, next)=>{
    ////console.log("UploadApi")
    try{
    // to declare some path to store your converted image
    var matches = req.body.base64image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
    response = {};
    if (matches.length !== 3) {
    return new Error('Invalid input string');
    }
     
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.extension(type);
    let fileName = `MGM-${Date.now().toString()+"-"+req.body.imgName}`;
    ////console.log(fileName)
   
    fs.writeFileSync("./uploads/setting/" + fileName, imageBuffer, 'utf8');
    return res.send({"status":"success",url:"/uploads/setting/"+fileName});
    } catch (e) {
        res.send({"status":"failed",error:e});
    }
})

router.post('/color',async (req,res)=>{
    ////console.log("ColorApi")
    try{
        const colorData = await ColorSchema.find(req.body.id&&{_id:req.body.id}).sort({"sort":1});
        res.json({data:colorData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/color/update',async (req,res)=>{
    ////console.log("ColorUpdateApi")
    const data = {
        id:req.body.id,
        imageUrl: req.body.imageUrl,
        colorCode: req.body.colorCode,
        colorPrice:req.body.colorPrice,
        title:req.body.title
    }
    try{
        //var colorData = ''
        const colorData = data.id? await ColorSchema.updateOne({_id:data.id},{$set:data})
        :await ColorSchema.create(data);
        res.json({data:colorData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/mirror',async (req,res)=>{
    //console.log("MirrorApi")
    try{
        const mirrorData = await MirrorSchema.find(req.body.id&&{_id:req.body.id}).sort({"sort":1});
        res.json({data:mirrorData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/mirror/update',async (req,res)=>{
    //console.log("MirrorUpdateApi")
    const data = {
        id:req.body.id,
        imageUrl: req.body.imageUrl,
        colorCode: req.body.colorCode,
        colorPrice:req.body.colorPrice,
        title:req.body.title
    }
    try{
        //var colorData = ''
        const colorData = data.id? await MirrorSchema.updateOne({_id:data.id},{$set:data})
        :await MirrorSchema.create(data);
        res.json({data:colorData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/cover',async (req,res)=>{
    ////console.log("ColorApi")
    try{
        const colorData = await CoverSchema.find(req.body.id&&{_id:req.body.id}).sort({"sort":1});
        res.json({data:colorData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/cover/update',async (req,res)=>{
    ////console.log("ColorUpdateApi")
    const data = {
        id:req.body.id,
        brand: req.body.brand,
        content: req.body.description,
        price:req.body.colorPrice,
        option:req.body.title
    }
    try{
        //var colorData = ''
        const coverData = data.id? await CoverSchema.updateOne({_id:data.id},{$set:data})
        :await CoverSchema.create(data);
        res.json({data:coverData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/stockservices',async (req,res)=>{
    try{
        const stockServiceData = await stockService.find(req.body.id&&{_id:req.body.id})
            .find(req.body.brand&&{brand:req.body.brand})
            .sort({"sort":1});
        res.json({data:stockServiceData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/stockservices/update',async (req,res)=>{
    //console.log("MirrorUpdateApi")
    const data = {
        id:req.body.id,
        imageUrl: req.body.imageUrl,
        brand: req.body.brand,
        colorPrice:req.body.colorPrice,
        description:req.body.description,
        title:req.body.title,
        hesabfa:req.body.hesabfa
    }
    try{
        //var colorData = ''
        const stockServiceData = data.id? await stockService.updateOne({_id:data.id},{$set:data})
        :await stockService.create(data);
        res.json({data:stockServiceData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/xtra',async (req,res)=>{
    //console.log("XtraApi")
    try{
        const xtraData = await XtraSchema.find(req.body.id&&{_id:req.body.id}).sort({"sort":1});
        res.json({data:xtraData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/xtra/update',async (req,res)=>{
    //console.log("XtraUpdateApi")
    const data = {
        id:req.body.id,
        imageUrl: req.body.imageUrl,
        colorCode: req.body.colorCode,
        colorPrice:req.body.colorPrice,
        title:req.body.title
    }
    try{
        //var colorData = ''
        const xtraData = data.id? await XtraSchema.updateOne({_id:data.id},{$set:data})
        :await XtraSchema.create(data);
        res.json({data:xtraData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/category',async (req,res)=>{
    //console.log("CategoryApi")
    try{
        const categoryData = await CategorySchema.find(req.body.id&&{_id:req.body.id}).sort({"sort":1});
        res.json({data:categoryData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/category/update',async (req,res)=>{
    //console.log("CategoryUpdateApi")
    const data = {
        id:req.body.id,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        title:req.body.title
    }
    try{
        const ctegoryData = data.id? await CategorySchema.updateOne({_id:data.id},{$set:data})
        :await CategorySchema.create(data);
        res.json({data:ctegoryData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/product',async (req,res)=>{
    //console.log("ProductApi")
    try{
        const productData = await ProductSchema.find(req.body.id&&{_id:req.body.id}).sort({"sort":1});
        res.json({data:productData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/productEN',async (req,res)=>{
    //console.log("ProductEnApi")
    try{
        const productData = await ProductSchema.findOne(
            req.body.enTitle&&{enTitle:req.body.enTitle}).sort({"sort":1});
        res.json({data:productData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/product/update',async (req,res)=>{
    //console.log("ProductUpdateApi")
    const data = {
        id:req.body.id,
        imageUrl: req.body.imageUrl,
        imgGalleryUrl:req.body.imgGalleryUrl,
        description: req.body.description,
        fullDesc:req.body.fullDesc,
        config:req.body.config,
        title:req.body.title,
        enTitle:req.body.enTitle,
    }
    try{
        const productData = data.id? await ProductSchema.updateOne({_id:data.id},{$set:data})
        :await ProductSchema.create(data);
        res.json({data:productData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/pages',async (req,res)=>{
    //console.log("PagesApi")
    try{
        const pagesData = await PagesSchema.find(req.body.id&&{_id:req.body.id}).sort({"sort":1});
        res.json({data:pagesData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/pages/update',async (req,res)=>{
    //console.log("PageUpdateApi")
    const data = {
        id:req.body.id,
        imageUrl: req.body.imageUrl,
        url: req.body.url,
        title: req.body.title,
        description:req.body.description,
        fullDesc:req.body.fullDesc
    }
    try{
        //var colorData = ''
        const pagesData = data.id? await PagesSchema.updateOne({_id:data.id},{$set:data})
        :await PagesSchema.create(data);
        res.json({data:pagesData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/blog',async (req,res)=>{
    //console.log("BlogApi")
    try{
        const postData = await PostSchema.find(req.body.id&&{_id:req.body.id}).sort({"sort":1});
        res.json({data:postData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/blog/update',async (req,res)=>{
    //console.log("BlogUpdateApi")
    const data = {
        id:req.body.id,
        imageUrl: req.body.imageUrl,
        url: req.body.url,
        title: req.body.title,
        description:req.body.description,
        fullDesc:req.body.fullDesc
    }
    try{
        //var colorData = ''
        const postData = data.id? await PostSchema.updateOne({_id:data.id},{$set:data})
        :await PostSchema.create(data);
        res.json({data:postData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/slider',async (req,res)=>{
    //console.log("SliderApi")
    try{
        const sliderData = await SliderSchema.find(req.body.id&&{_id:req.body.id});
        res.json({data:sliderData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/slider/update',async (req,res)=>{
    //console.log("SliderUpdateApi")
    const data = {
        id:req.body.id,
        imageUrl: req.body.imageUrl,
        title: req.body.title,
        description:req.body.description
    }
    try{
        const sliderData = data.id? await SliderSchema.updateOne({_id:data.id},{$set:data})
        :await SliderSchema.create(data);
        res.json({slider:sliderData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
 
router.post('/log',async (req,res)=>{
    //console.log("LogApi")
    try{
        if(req.body.kind==='')res.json({log:[]})
        const logsData = await logSchema.find(req.body.status&&
            {status:req.body.status}).find(req.body.kind&&{kind:req.body.kind})
        res.json({log:logsData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/log/update',async (req,res)=>{
    //console.log("LogUpdateApi")
    try{
    const data = {
        id:req.body.id,
        title: req.body.title,
        user: req.body.user,
        phone: req.body.phone,
        kind:req.body.kind,
        description: req.body.description,
        status: req.body.status,
        date:Date.now(),
        modifyDate:req.body.modifyDate
    } 
        
        const logsData = data.id? await logSchema.updateOne({_id:data.id},{$set:data})
        :await logSchema.create(data);
        res.json({log:logsData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/orderlog',async (req,res)=>{
    //console.log("LogApi")
    
    try{
        var orderData = await RXSchema.findOne({rxOrderNo:req.body.rxOrderNo})
        if(!orderData)
        var orderData = await orders.findOne({stockOrderNo:req.body.rxOrderNo})
        const userData = await user.findOne({_id:orderData.userId})
    //console.log(userData)
        const logsData = await orderLogSchema.find({rxOrderNo:req.body.rxOrderNo})
        res.json({log:logsData,user:userData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/orderlog/update',async (req,res)=>{
    //console.log("LogUpdateApi")
    try{
    const data = {
        id:req.body.id,
        title: req.body.title,
        user: req.body.user,
        phone: req.body.phone,
        kind:req.body.kind,
        description: req.body.description,
        status: req.body.status,
        date:Date.now(),
        modifyDate:req.body.modifyDate
    } 
        
        const logsData = data.id? await logSchema.updateOne({_id:data.id},{$set:data})
        :await logSchema.create(data);
        res.json({log:logsData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.post('/duplicate',async (req,res)=>{
    //console.log("LogApi")
    try{
        const stockData = await sepidarstocks.find({cyl:"0.00"})
        for(var i=0;i<70/*stockData.length*/;i++){
            const repData = stockData.filter(item=>item.title===stockData[i].title)
            if(repData.length>4)
                console.log(repData)
        }
        if(stockData)
         res.json({data:stockData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/fix-title',async (req,res)=>{
    const sku = req.body.sku
    try{
        const stockData = await sepidarstocks.find(sku?{sku:sku}:{})
        for(var i=0;i<stockData.length;i++){
            var sepidarData = ''
            try{sepidarData = await sepidarstocks.updateOne(
                {_id:stockData[i]._id},{$set:{title:
            stockData[i].brandName+" "+
            stockData[i].lenzIndex+" "+
            stockData[i].material+" "+
            (stockData[i].coating?(stockData[i].coating+" "):"")+
            "("+(stockData[i].sph?stockData[i].sph:"0.00")+"|"+
            (stockData[i].cyl?stockData[i].cyl:"0.00")+")"
            }})}
            catch{sepidarData = await sepidarstocks.updateOne(
                {_id:stockData[i]._id},{$set:{title:
            stockData[i].brandName+" "+
            stockData[i].lenzIndex+" "+
            stockData[i].material+" "+
            (stockData[i].coating?(stockData[i].coating+" "):"")+
            "("+(stockData[i].sph?stockData[i].sph:"0.00")+"|"+
            (stockData[i].cyl?stockData[i].cyl:"0.00")+")" + "-duplicate"
            }})}
        }
        if(stockData)
         res.json({data:stockData})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


var admin = require("firebase-admin");
var serviceAccount = require("../firebase-adminsdk.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
router.post('/getToken', jsonParser,auth,async (req, res) => {
    const data = {
        userID: req.headers["userid"],
        fireBase: req.body.token,
        date:Date.now()
    }
    const tokenCheck = await FireBase.findOne({fireBase:data.fireBase})
    
    if(!tokenCheck){
        const tokenData = await FireBase.create(data)
        res.json({ message: 'success' ,status:tokenData})
        return
    }
    else{
        res.json({ message: 'already set'})
        return
    }
})
router.get('/sendMessage', async (req, res) => {
    const tokenData = await FireBase.find({})
    //console.log(tokenData.length)
    const registrationToken = tokenData.map(item=>item.fireBase).filter(item=>item)
    //console.log(registrationToken)
  const message = {
    data: {
      score: '850',
      time: '2:45'
    },
    tokens: registrationToken
  };
  
  // Send a message to the device corresponding to the provided
  // registration token.
  admin.messaging().sendMulticast(message)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
  
    res.json({ message: registrationToken })
  })

module.exports = router;