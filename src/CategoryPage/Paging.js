
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";

const theme = createTheme();

function Paging(props){
    //console.log(props.pageNumber,props.content.size)
    return(
        <div className="paging">
            {props.content.size?<MuiThemeProvider theme={theme}>
                <Pagination
                    limit={props.perPage}
                    offset={props.pageNumber>props.content.size?
                        0:props.pageNumber}
                    otherPageColor={"default"}
                    currentPageColor={"primary"}
                    total={props.content.size}
                    onClick={(e, offset) => props.setPageNumber(offset)}
                    />
            </MuiThemeProvider>:<></>}
        </div>
    )
}
export default Paging