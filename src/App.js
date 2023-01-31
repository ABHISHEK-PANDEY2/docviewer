import "./App.css";
import { useState,useEffect } from "react";
import { gapi } from 'gapi-script';
import ReactMarkdown from 'react-markdown';
// import rtfToHtml from '@iarna/rtf-to-html'
import { Document, Page, pdfjs } from 'react-pdf';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from "./navbar/Navbar";
import SideNav from "./sidenav/SideNav";
import Viewer from "./viewer/Viewer";
import Landing from "./Landing/Landing";

const clientId = "73858745093-907hvi4gtubhhkuvu7c0470ui6qd4tl2.apps.googleusercontent.com"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
function App() {

  const [isSignedIn,setSignedIn] = useState(false)
  const [selectedId, setSelectedId ] = useState();
  const [data,setData] = useState();
  const [links,setLinks] = useState();
  const [id,setId] = useState([]);
  const [token,setToken] = useState();
  const [pdfUrl, setPdfUrl] = useState();

  useEffect( ()=>{
    async function start(){
      await gapi.client.init({
        clientId: clientId,
        scope:"https://www.googleapis.com/auth/drive"
      })

      setSignedIn(true);
       
    }

   gapi.load('client:auth2',start)
  },[])

 useEffect( ()=>{
  if(isSignedIn){
  const accessToken =  gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token
    setToken(accessToken);
    console.log(accessToken);
  }
 },[isSignedIn])


 useEffect(()=>{
  async function fetchStream(){
    if(id.length>0){
      const rawres = await fetch(`https://www.googleapis.com/drive/v3/files/${id[0]}/export?mimeType=application/pdf`,{
        method:"GET",
        headers:{
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/pdf"
        }
      })

      const res = await rawres.arrayBuffer()
      setPdfUrl(new Uint8Array(res));
    }
  }
  fetchStream();
 },[id])

  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/login" element={<Landing/>}/>
        <Route path="/" element={
        <>
          <Navbar/>
      {isSignedIn && token &&
        <>
          <div style={{height : "80px"}}></div>
          <div className="container">
            <SideNav token={token} isSignedIn={isSignedIn} setSelectedId = {setSelectedId}/>
            <Viewer token={token} selectedId = {selectedId}/>
            </div>
        </>
        }
        </>
        }/>
      
      {/* <Navbar/>
      {isSignedIn && token &&
        <>
          <div style={{height : "80px"}}></div>
          <div className="container">
            <SideNav token={token} isSignedIn={isSignedIn} setSelectedId = {setSelectedId}/>
            <Viewer token={token} selectedId = {selectedId}/>
            </div>
        </>
} */}
    </Routes>
    </div>
    </Router>
  );
}

export default App;
