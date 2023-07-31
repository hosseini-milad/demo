const user =require("../../model/user");
const userInfo =require("../../model/userInfo");
var Kavenegar = require('kavenegar');
var api = Kavenegar.KavenegarApi({
    apikey: process.env.SMS_API
});
//console.log(process.env.SMS_API)
async function sendSmsUser(userId,template,message,token2,token3){
    const userData= await user.findOne({_id:userId});
    const userInfoData= await userInfo.findOne({userId: userId });
     
    var phoneNumber=""
    if(userInfoData&&userInfoData.mobile){
      phoneNumber= userInfoData.mobile
    }
    else{
      if(isMobile(userData.phone))phoneNumber=userData.phone;
    }
    /*console.log({
        token: parseInt(message.replace(/^\D+/g, '')),
        template: template,//"mgmVerify",
        receptor: phoneNumber
    }) */
    if(phoneNumber){
      if(phoneNumber.includes("0096")&&template!=="login") 
        return;
      const verifySms = api.VerifyLookup({
        token: message,//parseInt(message.replace(/^\D+/g, '')),
        //token2:parseInt(token2.replace(/^\D+/g, '')),
        template: template,//"mgmVerify",
        receptor: phoneNumber
      },function(response,status) {
        //console.log(response);
        console.log(status);
        }) 
        return (verifySms)
    }
  }
  const isMobile=(phone)=>{
    if(!phone) return 0
    if(!/^\d+$/.test(phone))return 0
    var leng = phone.length
    if(leng<10) return 0
    if(phone.charAt(0)==="0"&&phone.charAt(1)==="9")
      return 1
    if(phone.charAt(0)==="9")return 1
  }
  module.exports = sendSmsUser