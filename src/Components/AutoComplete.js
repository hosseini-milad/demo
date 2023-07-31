import React, { useState } from 'react';

function AutoComplete(props){
   const label = props.label;
   const value = props.value;
   const options = props.options
   const getOptionLabel = props.getOptionLabel?
      props.getOptionLabel:(e)=>{return(e)};
   const[popUp,setPopUp] = useState(0)
   const disabled = props.disabled;
   const itemSelect=(option)=>{
      props.onValueChange(option)
      setPopUp(0)
   }
   return(<>
      <div className={disabled?'reyhamComplete reyhamDisabled':
         props.active?'reyhamComplete reyhamActiveItem':
         ('reyhamComplete '+props.className)} 
         onClick={()=>!disabled&&setPopUp((popUp+1)%2)}
         style={props.style&&props.style}>
         <div className='reyhamPlaceHolder' style={{left:props.dir?"auto":"25px"}}>
            {getOptionLabel(label)}
         </div>
         <div className='reyhamTextBox'>
            {value}
         </div>
      </div>
      <div className='reyhamPopUp' style={{display:popUp?"block":"none"}}
         onClick={()=>setPopUp(0)}>
         <div className='reyhamPopBox'>
            <div className='reyhamItemHolder'>
               <div className='reyhamItem' onClick={()=>itemSelect("")}>انتخاب کنید</div>
               {options&&options.map((opt,i)=>(
               <div className={getOptionLabel(opt)===value?
                  'reyhamItem reyhamItemActive':'reyhamItem'} 
               onClick={()=>itemSelect(getOptionLabel(opt))} key={i}>  
                  {getOptionLabel(opt)}
               </div>))}
            </div>
         </div>
      </div>
      </>
   )
}
export default AutoComplete