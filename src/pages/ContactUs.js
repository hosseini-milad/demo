import {FormControlLabel, Checkbox } from '@material-ui/core';
import SimpleFetch from '../Components/simpleFetch';
import env from '../env';

function ContactUs(){
    const contactOption=["مسئول فنی","واحد پشتیبانی","واتساپ","تلگرام","اینستاگرام"]
    const contactRaw = SimpleFetch(env.siteApi+"/product/pages");
    console.log(contactRaw)
    return(
        <main className="pagesMain">
            <div className="contactBanner">
                <div className="bannerImg">
                    <img src={contactRaw&&(env.siteApiUrl+contactRaw.pages.find(item=>item.url==="contact").imageUrl)} alt="contact us" />
                </div>
                <div className="bannerText">
                    <img src="/logo.png" alt="logo" />
                    <h1>تماس با ما</h1>
                    <div className="breadCrumbContact">
                        <a href="" >خانه / </a>
                        <span>تماس با ما</span>
                    </div>
                </div>
            </div>
            <div className="contactIconHolder">
                {contactOption.map((contactIcon,i)=>(
                <div className="contactIcon" key={i}>
                    <img src="/img/Polygon.png" alt="contact" />
                    <span className="iconText">{contactIcon}</span>
                </div>
                ))}
            </div>
            
            <div className="aboutText">
                <p dangerouslySetInnerHTML={{__html:contactRaw&&contactRaw.pages.find(item=>item.url==="contact").description}}>
                </p></div>
            <div className="sendMail">
                <input type="text" placeholder="ایمیل" />
                <textarea className='textAreaForm' placeholder="متن پیام" />
                {/*<FormControlLabel label="شرایط خدمات و سیاست حفظ خصوصی را می پذیرم." control={<Checkbox />} />*/}
                <input className='contactSendMail' type="button" value="ارسال" />
            </div>
        </main>
    )
}
export default ContactUs