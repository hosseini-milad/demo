const fetch = require('node-fetch');
const sepidarstock = require('../../model/Order/sepidarstock');
const HesabFaApiCall = require('./hesabFaApiCall');
const OffersStock = require('../../model/Order/OffersStock');

const sendToInvoiceHesabFa=async(oldStockData,userData)=>{
    var items=[];
    var services=[]
    for(var index=0;index<oldStockData.stockFaktor.length;index++){
        var discount = 0;
        const pair =oldStockData.stockFaktor[index].align==="pair"?1:0;
        var stockDetail = await sepidarstock.findOne(
            {sku:(pair&&oldStockData.stockFaktor[index].sku)?
                oldStockData.stockFaktor[index].sku.split('|')[0]:
            oldStockData.stockFaktor[index].sku})
        discount = await findDiscount(userData._id,"S",
            stockDetail.brandName,
            stockDetail.material,oldStockData.stockFaktor[index].price,
            oldStockData.stockFaktor[index].count)   
        items.push({
            Description: (stockDetail&&stockDetail.title)+
                " ("+oldStockData.stockFaktor[index].align+")",
            productCode:oldStockData.stockFaktor[index].sku,
            ItemCode: oldStockData.stockFaktor[index].hesabfa,
            Unit: 'لنگه',
            Discount:discount,
            Quantity: oldStockData.stockFaktor[index].count,
            UnitPrice: oldStockData.stockFaktor[index].price,
        })
        
    }
    if(oldStockData.stockService)
    for(var j=0;j<oldStockData.stockService.length;j++){
        var stockItem = oldStockData.stockService[j]
        services.push({
            Description:" برند:"+(stockItem.brand),
            productCode:stockItem.hesabfa,
            ItemCode: stockItem.hesabfa,
            Unit: 'لنگه',
            Quantity: 1,
            UnitPrice: stockItem.colorPrice.replace(/\D/g,''),
        })
    }
    //console.log(items.concat(services))
    const setFaktor = await HesabFaApiCall("/invoice/save",{invoice:{
        Date: new Date(Date.now()),
        DueDate: new Date(Date.now()),
        ContactCode: userData.cCode&&userData.cCode.replace( /^\D+/g, ''),
        ContactTitle: userData.cName,
        Reference:oldStockData.stockOrderNo,
        InvoiceType: 0,
        Status: 2,
        InvoiceItems: items.concat(services)
    }})
    return(setFaktor)
}
const findDiscount=async(user,RS,brand,material,price,count)=>{
    //console.log(user.toString(),RS,sku,brand,material)
    const discount = await OffersStock.findOne({userId:user.toString(),
        brandName:brand})
    const discountValue = (parseInt(discount?discount.discountPercent.replace("%",''):0)
            *parseInt(price)*parseInt(count)/100)
    //console.log(discountValue)
    return(discountValue) 
}
module.exports = sendToInvoiceHesabFa