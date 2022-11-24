import './App.css';
import TodoPanel from './components/TodoPanel';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';

import { useState,useForm } from 'react';
import { FileUploader } from './FileUploader';

function App() {
  // const obj = {
  //   file:''  }
  // const [img, setImg] = useState({})
  // let formData = new FormData();
  //  const onFileChange = (e) => {
  //   if(e.target && e.target.files[0]){
  //     formData.append('file', e.target.files[0]);
  //   }
  //  }

  //  const SubmitFileData = () =>{
  //   axios.post(
  //     'https://v2.convertapi.com/upload',
  //     {formData}
  //   )
  //   .then(res => res.json())
  //   .then(data => setImg(data))
  //   .catch(error=>console.log(error))
  //  }
  return (
    <div className="App " >
      {/* <input type="file" name="file_upload" onChange={onFileChange} />
      <button onClick={SubmitFileData}>Submmit</button>
      */}
      <TodoPanel />
      {/* <FileUploader /> */}
    </div>
  );
}

export default App;
