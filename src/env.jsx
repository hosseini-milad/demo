const env={
    //siteApi:'http://localhost:4000/api',
    siteApi:'https://demoadmin.dkmehr.com/api',
    
    //siteApiUrl:'http://localhost:4000',
    siteApiUrl:'https://demoadmin.dkmehr.com',
 
    vapidKey:"BLJqoTFEFUUMH8A18rChn3C5J3T2YcORJI4XDVH56IBCgqymaUV5th0ScSYU1Lel0qFgOXyVWcH1GSsUeD4V9A8",
    loader:<img className="imgLoader" src="/img/loaderMGM.gif"/>,
    touch:<img className="touchLoader" src="/img/loaderMGM.gif"/>,
    wait:<img className="waitLoader" src="/img/loaderMGM.gif"/>,

}
export default env
export const hesabfa={
  customerList:"/contact/getcontacts",
  itemsList:"/item/getitems"
}

export function normalPrice(priceText,xtra){
    if(!priceText||priceText === null||priceText === undefined) return("")
    
    try{priceText =priceText.split(' ')[0];}catch{}
    if(priceText === "0"||priceText === 0)return("رایگان");
    var rawPrice = priceText.toString().replace(/\D/g,'')
    //console.log(rawPrice,priceText)
    return(
      (rawPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace( /^\D+/g, '')+(xtra?xtra:''))
    )
}
export function purePrice(priceText){
  if(!priceText)return(0)
  var rawPrice = priceText.toString().replaceAll(',', '')
  //console.log(rawPrice,priceText)
  return(
    (rawPrice.toString().replace( /^\D+/g, ''))
  )
}
export function sumPrice(priceText){
  
  if(priceText === null||priceText === undefined) return(priceText)
  var rawPrice = priceText.toString().replaceAll(',', '')
  var tempSum = rawPrice.split('+');
  var TotalSum = 0
  for(var i=0;i<tempSum.length;i++)
    TotalSum += tempSum[i]?parseInt(tempSum[i])|| 0:0;
  return(
    (TotalSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace( /^\D+/g, ''))
  )
}
export function minusPrice(priceText){
  //console.log(priceText)
  if(priceText === null||priceText === undefined) return(priceText)
  var rawPrice = priceText.toString().replaceAll(',', '')
  var tempSum = rawPrice.split('-');
  var TotalSum = parseInt(tempSum[0])
  for(var i=1;i<tempSum.length;i++)
    TotalSum -= tempSum[i]?parseInt(tempSum[i]):0
  return(
    (TotalSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace( /^\D+/g, ''))
  )
}

export function discountPrice(priceText,discountText){
  if(priceText === null||priceText === undefined) return(priceText)
  var rawPrice = priceText.toString().replaceAll(',', '')
  var rawDiscount = discountText&&discountText.toString().replaceAll(',', '')
  //console.log(rawPrice,rawDiscount)
  return(
    ((rawPrice-rawDiscount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",").replace( /^\D+/g, ''))
  )
}
export function discountPriceCount(priceText,discountText,count){
  if(priceText === null||priceText === undefined) return(priceText)
  var rawPrice = priceText.toString().replaceAll(',', '')
  var rawDiscount = discountText.toString().replace('%', '')
  var priceTemp = (rawPrice*parseInt(count)*(100-rawDiscount)/100)
  return(normalPrice(priceTemp?priceTemp.toString().split('.')[0]:""))
}
export function discountPercent(priceText,discountPrice){
  if(priceText === null||priceText === undefined) return(priceText)
  var rawPrice = priceText.toString().replaceAll(',', '')
  var rawDiscount = discountPrice.toString().replaceAll(',', '')
  var priceTemp = (rawDiscount/rawPrice*100)
  return(priceTemp?priceTemp.toString().split('.')[0]:"")
}
export function CalcArray(array){
  var totalCount = 0
  for(var i =0;i<array.length;i++){
    totalCount += array[i]&&parseInt(array[i].toString().replaceAll(',', ''))
  }
  return(totalCount)
}
export function filterResult(itemsList,filterItem){
  //console.log(itemsList,filterItem)
  if(!itemsList.rawData) return({});
  if(!filterItem) return(itemsList?itemsList.rawData:'')
  const resultItems = itemsList.rawData.filter(item=>item.facoryName===filterItem.facoryName)
  //console.log(resultItems)
  const result2Items = filterItem.brand?resultItems.filter(item=>item.brandName===filterItem.brandName):resultItems;
  const result3Items = filterItem.lenzType?result2Items.filter(item=>item.lenzType===filterItem.lenzType):result2Items;
  const result4Items = filterItem.lenzDesign?result3Items.filter(item=>item.lenzDesign===filterItem.lenzDesign):result3Items;
  const result5Items = filterItem.lenzIndex?result4Items.filter(item=>item.lenzIndex===filterItem.lenzIndex):result4Items;
  const result6Items = filterItem.material?result5Items.filter(item=>item.material===filterItem.material):result5Items;
  return(result6Items)
}
export function stockResultFunction(itemsList,filterItem){
  //console.log(itemsList,filterItem)
  if(!filterItem) return(itemsList?itemsList.stock:'')
  const resultItems = filterItem.brand&&itemsList.stock.filter(item=>item.brandName===filterItem.brand.enTitle)
  return(resultItems)
}
export function filterRemain(resultItems){
  //console.log(resultItems)
  if(!resultItems) return;
  if(!resultItems.length) return;
  const brandList = [...new Set(resultItems.map(item => item.brandName))];
  const lenzType = [...new Set(resultItems.map(item => item.lenzType))];
  const lenzDesign = [...new Set(resultItems.map(item => item.lenzDesign))];
  const lenzIndex = [...new Set(resultItems.map(item => item.lenzIndex))];
  const material = [...new Set(resultItems.map(item => item.material))];

  const sortLenzType=manualSort(lenzType,["تکدید","دودید","تدریجی","تدریجی لایف استایل"])
//console.log(sortLenzType,lenzType)
  return({brandList:brandList,lenzType:sortLenzType,lenzDesign:lenzDesign,
          lenzIndex:lenzIndex.sort(),material:material})
}
export const calcTotalItems=(items)=>{
  var sum =0;
  for(var i =0;i<items.length;i++)
    sum += items[i].Quantity
  return(sum)
}

export const manualSort=(plainText,sortArray)=>{
  const plainArray = plainText.toString().split(',')
  //console.log(plainArray,sortArray)
  var defer = plainArray.filter(x => !sortArray.includes(x));
  var outArray=[];
  var outNotList=[];
  for(var index=0;index<sortArray.length;index++)
    for(var sIndex=0;sIndex<plainArray.length;sIndex++)
      if(sortArray[index]===plainArray[sIndex])
        outArray.push(sortArray[index])
  //console.log(outArray.concat(defer).toString())
  return(outArray.concat(defer))
}
export const removeNull=(tempArray)=>{
  if(!tempArray) return tempArray
  for(var i=0;i<tempArray.length;i++)
    if(!tempArray[i]) 
      tempArray.splice(i,1);
  return(tempArray.sort())
}
export const checkNull=(tempArray)=>{
  if(!tempArray) return 0
  var leng = 0
  for(var i=0;i<tempArray.length;i++)
    if(tempArray[i]) 
      leng++
  return(leng)
}
export const isMobile=(phone)=>{
  if(!phone) return 0
  if(!/^\d+$/.test(phone))return 0
  var leng = phone.length
  if(leng<10) return 0
  if(phone.charAt(0)==="0"&&phone.charAt(1)==="9")
    return 1
  if(phone.charAt(0)==="9")return 1
}

export const standardPassword=(password)=>{
  if(!password) return({error:"پسورد نمی تواند خالی باشد"})
  if(password.length<4) return({error:"حداقل طول پسورد 4 کاراکتر"})
  return(password)
}
export const orderStatus=(e)=>{
  if(e==="initial")return("در حال ثبت")
  if(e==="inprogress")return("ثبت شده")
  if(e==="accept")return("تایید شده")
  if(e==="inproduction")return("در حال تولید")
  if(e==="faktor")return("تولید شده")
  if(e==="sending")return("ارسال از کارخانه")
  if(e==="store")return("انبار")
  if(e==="delivered")return("تحویل به انبار")
  if(e===/suspend/)return("معلق")
  if(e==="shop")return("فروشگاه")
  if(e==="storeSent")return("ارسال به فروشگاه")
  if(e==="completed")return("ارسال به مشتری")
  if(e==="cancel")return("انصراف")
  else return(e)
}
export const orderStatusRev=(e)=>{
  if(e==="در حال ثبت")return("initial")
  if(e==="ثبت شده")return("inprogress")
  if(e==="تایید شده")return("accept")
  if(e==="در حال تولید")return("inproduction")
  if(e==="تولید شده")return("faktor")
  if(e==="معلق")return("suspend")
  if(e==="ارسال از کارخانه")return("sending")
  if(e==="ارسال از فروشگاه")return("storeSent")
  if(e==="انبار")return("store")
  if(e==="تحویل به انبار")return("delivered")
  if(e==="فروشگاه")return("shop")
  if(e==="ارسال به مشتری")return("completed")
  if(e==="انصراف")return("cancel")
  
}

export function gregorian_to_jalali(gy, gm, gd) {
  var g_d_m, jy, jm, jd, gy2, days;
  g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  gy2 = (gm > 2) ? (gy + 1) : gy;
  days = 355666 + (365 * gy) + ~~((gy2 + 3) / 4) - ~~((gy2 + 99) / 100) + ~~((gy2 + 399) / 400) + gd + g_d_m[gm - 1];
  jy = -1595 + (33 * ~~(days / 12053));
  days %= 12053;
  jy += 4 * ~~(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += ~~((days - 1) / 365);
    days = (days - 1) % 365;
  }
  if (days < 186) {
    jm = 1 + ~~(days / 31);
    jd = 1 + (days % 31);
  } else {
    jm = 7 + ~~((days - 186) / 30);
    jd = 1 + ((days - 186) % 30);
  }
  return [jy, jm, jd];
}

export function jalali_to_gregorian(jy, jm, jd) {
  var sal_a, gy, gm, gd, days;
  jy += 1595;
  days = -355668 + (365 * jy) + (~~(jy / 33) * 8) + ~~(((jy % 33) + 3) / 4) + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
  gy = 400 * ~~(days / 146097);
  days %= 146097;
  if (days > 36524) {
    gy += 100 * ~~(--days / 36524);
    days %= 36524;
    if (days >= 365) days++;
  }
  gy += 4 * ~~(days / 1461);
  days %= 1461;
  if (days > 365) {
    gy += ~~((days - 1) / 365);
    days = (days - 1) % 365;
  }
  gd = days + 1;
  sal_a = [0, 31, ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  for (gm = 0; gm < 13 && gd > sal_a[gm]; gm++) gd -= sal_a[gm];
  return [gy, gm, gd];
}

export function hesabfaError(errorCode){
  //console.log(errorCode)
  if(errorCode===100) return("خطای داخلی در نرم افزار" )
  if(errorCode===101) return("تعداد در خواست ها در دقیقه از حد مجاز بیشتر شده است" )

  if(errorCode===103) return("	در درخواست ارسالی پارامتر Data وجود ندارد" )
  if(errorCode===104) return("پارامترهای ضروری ارسال نشده است" )
  if(errorCode===105) return("API غیرفعال است" )
  if(errorCode===106) return("کاربر، صاحب کسب و کار نیست" )
  if(errorCode===107) return("کسب و کار پیدا نشد" )
  if(errorCode===108) return("کسب و کار منقضی شده است" )
  if(errorCode===109) return("سال مالی پیدا نشد" )
  if(errorCode===190) return("خطای حسابفا" )
  else{
    return ''
  }
}