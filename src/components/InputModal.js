
import React,{ useEffect, useState,useRef, useCallback, useLayoutEffect } from 'react'
import {v4 as uuid} from 'uuid' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'


function InputModal({ clicked, setClicked, data, onRemove,  onAdd ,newValue, isEdit, setNewValue, onEdited, setEdit, upload, setUploaded, completed, setCompleted, }) {
  const [isValid, setValid] = useState(false)
  const editInputRef = useRef(null)
  const filePicker = useRef(null)
  const [error, setError] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedId, setSelectedId] = useState('')
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState({
    id: uuid(),
    date: '',
    title: '',
    description: '',
    file: {}
  })
  const idRef = useRef(null)
  const errRef = useRef('')
  const textRef = useRef('')

  const validate = () => {
   if (inputValue.date.length != 0 && inputValue.title.length != 0 && inputValue.description.length != 0 ){ 
    return true
   }else { 
    return false
   }        
  }

  useEffect(() => {
    setValid(validate())
  })  

  
  
  const handleChange = (event) => {
    const {name, value} = event.target  
    setInputValue(prevState => ({
      ...prevState,
      [name]:value
    }))    
  }
  const handleNewChange = (event) => {
    const {name, value} = event.target  
    setNewValue(prevState => ({
      ...prevState,
      [name]:value
    }))  
    
  }

  const onClose = ()=>{
    setClicked(false);  
    setEdit(false);
  }

  const handleDelete = () => {
      onRemove(newValue.id);
      setEdit(false);
    }
 
const handleUpload = async() => {
 if (!selectedFile) {
   alert("Please select file");
   return
 };
 const formData = new FormData();
 formData.append('file', selectedFile)
 const res = await fetch('https://v2.convertapi.com/upload', {
   method: "POST",
   body: formData
 });
 const data = await res.json()
 console.log("data", data)
 setUploaded(data)
}

 const handleFile = async (event) => {   
  setSelectedFile(event.target.files[count])
  await handleUpload();
  setCount(prevState=>prevState+1)
  
}
const handleNewFile = async (event) => {    
  setSelectedFile(event.target.files[count])
  await handleUpload()
  setCount(prevState=>prevState+1)
}

useEffect(() => {
  setNewValue(prevState => ({
    ...prevState,
    file: {...upload}
  }))
  console.log("upload", upload)
}, [upload])

useEffect(() => {
  setInputValue(prevState => ({
    ...prevState,
    file: {...upload}
  }))
}, [upload])

const onAddMemo = useCallback(() => {  
  if (isValid){
    (onAdd(inputValue));
    setClicked(false);
    setError('');
  } else {
    console.log(isValid)
  setError('Fill all the fields');
  }
  console.log(data)
}, [inputValue, isValid, onAdd, setError,setClicked,data])

const onSaveMemo = useCallback(() => {    
  onEdited(newValue.id, newValue) 
  setClicked(false);  
  setEdit(false);
}, [ newValue])
  return (
    <div className=' bg-black bg-opacity-40 fixed inset-0 flex justify-center items-center h-full' >
        <button onClick={onClose} className='absolute top-[25%] bg-white border  w-[50px] h-[50px]'><FontAwesomeIcon icon={faXmark}/></button>
        <div className='content'>   
          {isEdit ? 
          <div key={newValue.id} ref={idRef}>
            <label htmlFor="">Date <input type="date" required="required" ref={editInputRef}  name="date" value={newValue.date || ''} onChange={handleNewChange}/></label>
            <label htmlFor="">Title<input type="text" name="title" required="required" ref={editInputRef} value={newValue.title || ''}  onChange={handleNewChange}/></label>
            <label htmlFor="">Description</label>
            <input type="file" ref={filePicker} name="file"  onChange={handleNewFile} />
            <div className="flex flex-col">
              <textarea  id="" cols="30" rows="5" ref={editInputRef}  required="required" name="description"  value={newValue.description || ''} onChange={handleNewChange}></textarea>
              <button className='mt-[30px] border border-black p-1' onClick={onSaveMemo}> Save</button>
            </div>
          </div>
            : 
            <div key={inputValue.id}> 
            
              <label htmlFor="">Date <input type="date" required="required" name="date"  value={inputValue.date || ''} onChange={handleChange}/></label>
              <label htmlFor="">Title<input type="text" required="required" name="title" ref={textRef} value={inputValue.title || ''}  onChange={handleChange}/></label>
              <label htmlFor="">Description</label>
              <input type="file"  ref={filePicker} name="file" onChange={handleFile} />
             <div className="flex flex-col">
              <textarea  id="" cols="30" rows="5" name="description" required="required" ref={errRef} value={inputValue.description || ''} onChange={handleChange}></textarea>
              <button className='mt-[30px] border border-black p-1 block' onClick={onAddMemo}> Add task</button>
             </div>
              <span className='block'>{error}</span>
              
            </div> 
          }
          <div className="btns-panel flex justify-around w-full h-full my-3">
              <button onClick= {handleDelete}>Delete</button>
          </div>
         
      </div>
      

    </div>
  )
}

export default InputModal