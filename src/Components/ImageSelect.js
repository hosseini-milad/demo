import React from "react";
import Resizer from "react-image-file-resizer";
//Card
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

function ImageSelect(props){
    const resizeFile = (file) =>
        new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,500,500,"JPEG",100,0,
            (uri) => {
            resolve(uri);
            },"base64");
    });
    const handleUploadClick=async(event)=>{
        var fileRaw = event.target.files[0];
        
        //console.log(fileRaw)
        const tempfile = await resizeFile(fileRaw);
        //console.log(fileRaw.name.replaceAll(' ','_'))
        console.log(props.part)
        //this.props.setSender(this.props.sender)
        props.setImage({base64:tempfile,fileName:fileRaw.name.replaceAll(' ','_')});
    }
    const handleSearchClick=()=>{

    }
    const handleGalleryClick=()=>{

    }
    return(
        <React.Fragment>
        <CardContent>
          <Grid container justify="center" alignItems="center">
            <input
              accept="image/*"
              id={"contained-button-file"+props.part}
              multiple
              type="file"
              capture="camera" 
              onChange={handleUploadClick}
              style={{display:"none"}}
            />
            <label htmlFor={"contained-button-file"+props.part} style={{display:"grid"}}>
              <Fab component="span" >
                <i className="uploadSize fas fa-upload"></i>
              </Fab>
            </label>
            <Fab onClick={handleSearchClick}>
                <i className="uploadSize fas fa-search"></i>
            </Fab>
            <Fab onClick={handleGalleryClick}>
                <i className="uploadSize fas fa-th"></i>
            </Fab>
          </Grid>
        </CardContent>
      </React.Fragment>

    )
}
export default ImageSelect