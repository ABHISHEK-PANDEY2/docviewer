import styles from "./styles.module.css"
import { useState, useEffect} from "react"
import Loader from "../loader/Loader";
const SideNav = (props) => {
    const [isSignedIn, setSignedIn] = useState(props.isSignedIn);
    const [id,setId] = useState();
    const [data,setData] = useState();

    useEffect( ()=>{
        if(props.token){
          fetch("https://www.googleapis.com/drive/v3/files?fields=*",{
            method:"GET",
            headers:{
              "Authorization" : `Bearer ${props.token}`
            }
          }).then((res)=>res.json()).then((res)=>{
            let fileId = [];
            let fileData = [];
            res.files.filter((files) => files.mimeType === "application/vnd.google-apps.document").map((file)=>{
              fileId.push(file.id);
              fileData.push(file)
            })
            setId(fileId)
            setData(fileData)
            console.log(data);
          })
        }
       },[props.token])

       function fileClicked(file){
            props.setSelectedId(file.id)
            console.log(file.id);
       }

    return ( 
        <div className={styles.sidenav}>
            {
                (data?.length > 0) ? (
                    data.map((file,i) => {
                        return (
                        <p className={styles.fileTitle} key={i} onClick={()=>fileClicked(file)}>{file.name}</p>
                        )
                    })
                ) : (
                    <Loader/>
                )
            }
        </div>
     );
}
 
export default SideNav;