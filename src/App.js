import './App.css';
import TodoPanel from './components/TodoPanel';
import 'font-awesome/css/font-awesome.min.css';
import axios from 'axios';
import { useEffect } from 'react';
import { useState,useForm } from 'react';
import { FileUploader } from './FileUploader';
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import CustomParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
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

//   const date = {firstdate: "2022-12-22",
//   seconddate: "2022-10-22"}
//   dayjs(date.firstdate).format('llll')
  
//   const today = dayjs(new Date());
// const pastDate = dayjs(date.seconddate);
// const futureDate = dayjs(date.firstdate);
// console.log(futureDate)

// // => true
// console.log(futureDate.isBefore(today));

  
//   const [expired, setExpired ] = useState(false)
//   const [past, setPast] = useState(false)
//   useEffect(() => {
//     setExpired(futureDate.isBefore(today));
//     setPast(pastDate.isBefore(today));
//   }, [date])
  return (
    <div className="App " >
      {/* <input type="file" name="file_upload" onChange={onFileChange} />
      <button onClick={SubmitFileData}>Submmit</button>
      */}
      <TodoPanel />
      {/* <FileUploader /> */}
      {/* <h3 style={( expired)  ? {textDecoration: "line-through"} : {color: "red"}} >hell no</h3>
      <h3 style={( past)  ? {textDecoration: "line-through"} : {color: "red"}} >hell no</h3> */}
    </div>
  );
}

export default App;
