import styles from "./styles.module.css"
import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useState} from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Viewer = (props) => {

    const [pdf, setPdf] = useState();

    useEffect(()=>{
        async function fetchStream(){
          if(props.selectedId){
            const rawres = await fetch(`https://www.googleapis.com/drive/v3/files/${props.selectedId}/export?mimeType=application/pdf`,{
              method:"GET",
              headers:{
                "Authorization": `Bearer ${props.token}`,
                "Content-Type": "application/pdf"
              }
            })
      
            const res = await rawres.arrayBuffer()
            setPdf(new Uint8Array(res));
          }
        }
        fetchStream();
       },[props.selectedId])

       

       

    return ( 
        <div className={styles.viewer}>
            {
                    (pdf) ? (
                      <Document
                        file={{data:pdf}}
                        // onLoadSuccess={onDocumentLoadSuccess}
                      >
                      <Page pageNumber={1}/>
                      <br />
                      <Page pageNumber={2}/>
                      <br />
                      <Page pageNumber={3}/>
                      <br />
                      <Page pageNumber={4}/>
                      <br />
                      <Page pageNumber={5}/>
                      <br />
                      <Page pageNumber={6}/>
                      <br />
                      <Page pageNumber={7}/>
                      <br />
                      <Page pageNumber={8}/>
                      <br />
                      </Document>
                    ) : (
                      <p style={{margin:"auto",opacity:0.7}}>Please select a file to Preview</p>
                    )
                  }
        </div>
     );
}
 
export default Viewer;