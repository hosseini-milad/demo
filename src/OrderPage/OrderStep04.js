import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useDebugValue, useEffect, useState } from 'react';
import AutoComplete from '../Components/AutoComplete';
import ImageSelect from '../Components/ImageSelect';
import ImageUpload from "../Components/ImageUpload";
import env, { checkNull } from '../env';
import StockPop from './Stock/Stock01/StockPop';
const wWidth = window.innerWidth;

function OrderStep04(props){
    const helps = props.helps;
    const [defaultData,setDef]=useState();
    const [selectedCoridor,setCoridor] = useState(props.def.coridor?props.def.coridor:'')
    useEffect(()=>{
      setDef(props.def.frameSize?props.def.frameSize.split(','):[])
    },[props.def])
    const needCoridor = props.def&&props.def.rxLenz&&
    props.def.rxLenz.split(',')[3];
    var frameType = [];
    var HBOXA=[];
    var DBL=[];
    var VBOXB=[];
    var FH=[];
    var IPD=[];
    try{
        HBOXA=(props.params.find(item=>item.title==="HBOX(A)").paramValue).split(',');
        frameType=(props.params.find(item=>item.title==="FrameType").paramValue).split(',');
        VBOXB=(props.params.find(item=>item.title==="VBOX(B)").paramValue).split(',');
        DBL=(props.params.find(item=>item.title==="DBL").paramValue).split(',');
        FH =(props.params.find(item=>item.title==="FH").paramValue).split(',');
        IPD =(props.params.find(item=>item.title==="IPD").paramValue).split(',')
    }catch{}
    const options = [{title:"HBOX(A)",options:HBOXA},
    {title:"VBOX(B)",options:VBOXB},
    {title:"DBL",options:DBL},
    {title:"FH",options:FH},
    {title:"IPD",options:IPD}];
    
    var BVD=[];
    var PT=[];
    var FFA=[];
    var ED=[];
    var Base=[];
    var coridorOptions=['14','16','18','انتخاب خودکار']
    //console.log(props.def.odMain)
    try{
        BVD=  (props.params.find(item=>item.title==="BVD").paramValue).split(',');
        PT =  (props.params.find(item=>item.title==="PT").paramValue).split(',');
        FFA = (props.params.find(item=>item.title==="FFA").paramValue).split(',');
        ED =  (props.params.find(item=>item.title==="ED").paramValue).split(',');
        Base = (props.params.find(item=>item.title==="Base").paramValue).split(',')
    }
    catch{}
    const moreData = [{title:"BVD",options:BVD},
    {title:"PT",options:PT},
    {title:"FFA",options:FFA},
    {title:"ED",options:ED},
    {title:"Base",options:Base}];

    const [image,setImage]= useState();
    const [image1,setImage1]= useState();
    const [image2,setImage2]= useState();
    const defaultImage = props.def.frameImg?props.def.frameImg.split(','):['','','']
    const [imageUrl,setImageUrl] = useState(defaultImage&&defaultImage[0])
    const [imageUrl1,setImageUrl1] = useState(defaultImage&&defaultImage[1])
    const [imageUrl2,setImageUrl2] = useState(defaultImage&&defaultImage[2])
    const[frameSize,setFrameSize] =useState(defaultData&&defaultData.length?
      defaultData:Array(10).fill(""))
    const[iDisplay,setIDisplay] =useState(-1)
    const[error,setError] = useState('')
    const [spin,setSpin] = useState();

    const[errorClass,setErrorClass] = useState('')
    const[allField,setAllFields] = useState('')
    const [frame,selectFrame] = useState(props.def.frameType);
    const galleryImageList = [
      env.siteApiUrl+"/uploads/gallery/gallery01.jpg",
      env.siteApiUrl+"/uploads/gallery/gallery02.jpg",
      env.siteApiUrl+"/uploads/gallery/gallery03.jpg",
      env.siteApiUrl+"/uploads/gallery/gallery04.jpg",
      env.siteApiUrl+"/uploads/gallery/gallery05.jpg",
      env.siteApiUrl+"/uploads/gallery/gallery06.jpg"
      ];
    //console.log(props.def)
    const updateFrame=(index,value)=>{
        
        if(index === 1){
          if(parseInt(value)>parseInt(frameSize[0])){
            setError("error");setErrorClass("errorClass"); 
          }
          else{
            setError("");setErrorClass("");
          }
        }
        if(index===0){
          if(parseInt(value)<parseInt(frameSize[1])){
            setError("error");setErrorClass("errorClass"); 
          }else{
            setError("");setErrorClass("");
          }
        }
        //setError("");
        setFrameSize(pItems => {return [
          ...pItems.slice(0, index),value,...pItems.slice(index + 1),
        ]})
      //window.alert(imageUrl)
    }
    useEffect(()=>{
      const sizeActive =(props.def.odMain&&props.def.odMain.split(',')[4]!==''||
      props.def.osMain&&props.def.osMain.split(',')[4]!=='')
        //console.log(sizeActive)
      //(checkNull(frameSize)!==10&&!selectedCoridor&&needCoridor)?
      if(checkNull(frameSize[0])&&checkNull(frameSize[1])&&
      checkNull(frameSize[2])&&checkNull(frameSize[4])||sizeActive)//selectedCoridor)
        setAllFields('');
      else setAllFields(" فیلدهای مشخص شده باید پر شوند یا سایز عدسی انتخاب شود")
    },[props.def.odMain,props.def.osMain,
      frameSize,selectedCoridor])
    useEffect(() => {
      //console.log("part1")
        const postOptions={
            method:'post',
            headers: {
                "content-type": "application/json"
              },
            body:JSON.stringify({base64image:image&&image.base64,
                                 imgName:image&&image.fileName})
          }//URL.createObjectURL(image)
          //console.log(postOptions)
          image&&fetch(env.siteApi+"/image",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                //console.log(result)
                setImageUrl(env.siteApiUrl+"/"+ result.url)
            },
              (error) => {
                console.log(error);
              }
            )
            .catch((error)=>{
              console.log(error)
            })

        },[image])
    useEffect(() => {
      //console.log("part2")
        const postOptions={
            method:'post',
            headers: {
                "content-type": "application/json"
              },
            body:JSON.stringify({base64image:image1&&image1.base64,
                                  imgName:image1&&image1.fileName})
        }//URL.createObjectURL(image)
        //console.log(postOptions)
        image1&&fetch(env.siteApi+"/image",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                
                setImageUrl1(env.siteApiUrl+"/"+ result.url)
            },
              (error) => {
                console.log(error);
              }
            )
            .catch((error)=>{
              console.log(error)
            })

        },[image1]) 
    useEffect(() => {
        const postOptions={
            method:'post',
            headers: {
                "content-type": "application/json"
              },
            body:JSON.stringify({base64image:image2&&image2.base64,
                                  imgName:image2&&image2.fileName})
          }//URL.createObjectURL(image)
          
          image2&&fetch(env.siteApi+"/image",postOptions)
            .then(res => res.json())
            .then(
              (result) => {
                setImageUrl2(env.siteApiUrl+"/"+ result.url)
            },
              (error) => {
                console.log(error);
              }
            )
            .catch((error)=>{
              console.log(error)
            })

        },[image2])
    return(
        <div className="orderStepsHolder">

            <div className="orderDataHolder"><br/>
                <div className='innerSeprator'>
                    <div className='innerHeader'>ابعاد فریم</div>
                    <div className='orderLenzData'>
                        {options.map((lenz,i)=>(
                            <div className={i===1&&errorClass?'lenzData errorClass':'lenzData'} key={i}>
                                {wWidth>700?<Autocomplete //disabled={selectedCoridor&&needCoridor?true:false}
                                    options={lenz.options||{}}
                                    className={(allField&&!frameSize[i]&&i!==3)?"errorClass":""}
                                    value={frameSize[i]||''}
                                    onChange={(e,value)=>updateFrame(i,value)}
                                    style={{ width: "100%"}}
                                    renderInput={(params) =>
                                    <TextField {...params} label={lenz.title} variant="outlined"/>}/>:
                                  <AutoComplete //disabled={selectedCoridor&&needCoridor?true:false}
                                    options={lenz.options||{}}
                                    value={frameSize[i]||''}
                                    className={allField&&!frameSize[i]&&i!==3?"errorClassMobile":""}
                                    onValueChange={(value)=>updateFrame(i,value)}
                                    label={lenz.title}
                                />}
                            <div className='helpPop' onClick={()=>setIDisplay(lenz.title)}>i</div>
                            </div>
                        ))}
                    </div>
                    <div className="popHolder" style={{visibility:error?"visible":"hidden"}}>
                    <div className="popText" style={{height:"200px"}}>
                        <div className="popClose" onClick={()=>setError(0)}>×</div>
                        <p>مقدار VBOX(B) از 
                          HBOX(A) باید کوچکتر یا مساوی باشد
                        </p>
                        
                    </div>
                </div>
                    <StockPop data={helps} iDisplay={iDisplay} setIDisplay={setIDisplay}/>
                    <div className='orderLenzData'>
                        {moreData.map((lenz,i)=>(
                            <div className='lenzData' key={i}>
                                {wWidth>700?<Autocomplete //disabled={selectedCoridor&&needCoridor?true:false}
                                    options={lenz.options||{}}
                                    value={frameSize[i+5]||''}
                                    onChange={(e,value)=>updateFrame(i+5,value)}
                                    style={{ width: "100%"}}
                                    renderInput={(params) =>
                                    <TextField {...params} label={lenz.title} variant="outlined"/>}
                                />:<AutoComplete //disabled={selectedCoridor&&needCoridor?true:false}
                                    options={lenz.options||{}}
                                    value={frameSize[i+5]||''}
                                    onValueChange={(value)=>updateFrame(i+5,value)}
                                    label={lenz.title}
                                />}
                                <div className='helpPop' onClick={()=>setIDisplay(lenz.title)}>i</div>
                            
                            </div>
                        ))}
                    </div>
                    <div className='lenzData floatParam' 
                      style={{display:props.def&&props.def.rxLenz&&
                        props.def.rxLenz.split(',')[3]?"block":"none"}}>
                        {wWidth>700?<Autocomplete // disabled={checkNull(frameSize)===10?true:false}
                            options={coridorOptions}
                            style={{ width: "100%"}}
                            value={selectedCoridor}
                            onChange={(e,value)=>setCoridor(value)}
                            renderInput={(params) =>
                            <TextField {...params} label="کریدور" variant="outlined"/>}
                        />:<AutoComplete // disabled={checkNull(frameSize)===10?true:false}
                          options={coridorOptions}
                          style={{ width: "83%"}}
                          value={selectedCoridor}
                          onValueChange={(value)=>setCoridor(value)}
                          label="کریدور"
                      />
                        }
                    </div>
                    <div className="priceXtra" style={{flexDirection:"initial"}}>
                      <span>در صورت عدم وجود اطلاعات، مقادیر استاندارد در نظر گرفته می شود.</span></div>
                      <h4 style={{color:"var(--orange-color)",display:
                          needCoridor?"block":"none"}}>{allField}</h4>
                </div>
                <div className='innerSeprator'>
                    <div className='innerHeader'>شکل فریم</div>
                    <div className='frameImageHolder'>
                        {wWidth>700?<Autocomplete
                            options={frameType}
                            style={{ width: "50%",direction:"rtl"}}
                            value={frame}
                            defaultValue={props.def&&props.def.frameType}
                            onChange={(e,value)=>selectFrame(value)}
                            renderInput={(params) =>
                            <TextField {...params} label="Frame Type" variant="outlined" />}
                        />:<AutoComplete
                          options={frameType}
                          style={{ width: "80%",direction:"rtl",margin:"auto"}}
                          value={frame?frame:props.def&&props.def.frameType}
                          onValueChange={(value)=>selectFrame(value)}
                      />}
                        </div>
                    </div>
                <div className='innerSeprator'>
                    <div className='innerHeader'>تصویر فریم</div>
                    <div className='frameImageHolder'>
                        <div className='frameImagePlace'>
                            <span>تصویر از سمت چپ صورت</span>
                            {imageUrl?<img className='clientImage' src={imageUrl} />:
                            image?env.loader:''}
                            <div className='orderLenzData orderImageHolder' style={{justifyContent:"end"}}>
                            <ImageUpload cardName="Input Image" imageGallery={galleryImageList} 
                                setImage={setImage} setImageUrl={setImageUrl} part={1}/>
                            </div>
                        </div>
                        <div className='frameImagePlace'>
                            <span>تصویر از روبروی صورت</span>
                            {imageUrl1?<img className='clientImage' src={imageUrl1} />:
                            image1?env.loader:''}
                            <div className='orderLenzData orderImageHolder' style={{justifyContent:"end"}}>
                            <ImageUpload cardName="Input Image" imageGallery={galleryImageList} 
                                setImage={setImage1} setImageUrl={setImageUrl1} part={2}/>
                            </div>
                        </div>
                        <div className='frameImagePlace'>
                            <span>تصویر از سمت راست صورت</span>
                            {imageUrl2?<img className='clientImage' src={imageUrl2} />:
                            image2?env.loader:''}
                            <div className='orderLenzData orderImageHolder' style={{justifyContent:"end"}}>
                            <ImageUpload imageGallery={galleryImageList} 
                                setImage={setImage2} setImageUrl={setImageUrl2} part={3}/>
                            </div>
                            
                          </div>
                    </div>
                </div>
                <div className="orderContinue">
                    {spin?env.wait:''}
                    {(!errorClass&&!allField)?//||props.def.lenzDid!=="تدریجی"||!needCoridor?
                      <input type="button" className="orderBtn" value="ادامه" 
                    onClick={()=>{setSpin(1);
                      props.saveState({
                        "lastIndex":4,
                        "frameSize":frameSize.toString(),
                        "coridor":selectedCoridor,
                        "frameImg":imageUrl+","+imageUrl1+","+imageUrl2,
                        "frameType":frame})

                      setTimeout(()=>{setSpin(0);props.setTabIndex(4);
                      window.location.href="/order/rx#serviceInfo";},1000)
                      
                    }}/>:<><small>{allField}</small>
                    <input type="button" className="disableBtn" value="ادامه" /></>}
                    <small className="preBtn" onClick={()=>{props.setTabIndex(2);
                        window.location.href="/order/rx#odOsDetail"}} >صفحه قبل</small>
                </div>
            </div>
        </div>
    
    )
}
export default OrderStep04