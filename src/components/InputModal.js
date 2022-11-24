
import React,{ useEffect, useState,useRef, useCallback, useLayoutEffect } from 'react'
import {v4 as uuid} from 'uuid' 

function InputModal({ clicked, setClicked, data, onRemove,  onAdd ,newValue, isEdit, setNewValue, onEdited, setEdit, upload, setUploaded, completed, setCompleted}) {
  const [isValid, setValid] = useState(false)
  const editInputRef = useRef(null)
  const filePicker = useRef(null)
  const [error, setError] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  
  const [inputValue, setInputValue] = useState({
    id: uuid(),
    date: '',
    title: '',
    description: '',
    file: {}
  })
  
  const errRef = useRef('')
  const textRef = useRef('')
  const validate = () => {
   if (inputValue.date.length != 0 && inputValue.title.length != 0 && inputValue.description.length != 0 ){ 
    return true
   }else { 
    return false
   }        
  }

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0])
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
    setUploaded(data)
   }
   
  useEffect(() => {
    setValid(validate())
  })

  const handlePick = () => {
    filePicker.current.click()
    handleUpload()
   }

  const onAddMemo = useCallback(() => {  
    console.log(isValid)
    if (isValid){
      (onAdd(inputValue));
      setClicked(false);
      setError('');
    } else {
      console.log(isValid)
    setError('Fill all the fields');
    }
}, [inputValue, isValid, onAdd, setError,setClicked])
 

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

  const onSaveMemo = useCallback(() => {    
    onEdited(newValue.id, newValue) 
    setClicked(false);  
    setEdit(false);
}, [ newValue])

  const onClose = ()=>{
    setClicked(false);  
    setEdit(false);
  }

  return (
    <div className=' bg-black bg-opacity-40 fixed inset-0 flex justify-center items-center h-full' key={newValue.id}>
        <button onClick={onClose} className='absolute top-[25%] bg-white border  w-[50px] h-[50px]'><i className="fa-solid fa-xmark"></i></button>
        <div className='content'>   
          {isEdit ? 
          <div>
            <label htmlFor="">Date <input type="date" required="required" ref={editInputRef}  name="date" value={newValue.date || ''} onChange={handleNewChange}/></label>
            <label htmlFor="">Title<input type="text" name="title" required="required" ref={editInputRef} value={newValue.title || ''}  onChange={handleNewChange}/></label>
            <label htmlFor="">Description</label>
            <input type="file" className='w-0 h-0 bg-transparent' ref={filePicker} name="file"  onChange={handleFile} />
            <div className="flex flex-col">
              <textarea  id="" cols="30" rows="5" ref={editInputRef}  required="required" name="description"  value={newValue.description || ''} onChange={handleNewChange}></textarea>
              <button className='mt-[30px] border border-black p-1' onClick={onSaveMemo}> Save</button>
            </div>
          </div>
            : 
            <div>
              <label htmlFor="">Date <input type="date" required="required" name="date"  value={inputValue.date || ''} onChange={handleChange}/></label>
              <label htmlFor="">Title<input type="text" required="required" name="title" ref={textRef} value={inputValue.title || ''}  onChange={handleChange}/></label>
              <label htmlFor="">Description</label>
              <input type="file" className='w-0 h-0 bg-transparent' ref={filePicker} name="file"  onChange={handleFile} />
             <div className="flex flex-col">
              <textarea  id="" cols="30" rows="5" name="description" required="required" ref={errRef} value={inputValue.description || ''} onChange={handleChange}></textarea>
              <button className='mt-[30px] border border-black p-1 block' onClick={onAddMemo}> Add task</button>
             </div>
              <span className='block'>{error}</span>
            </div> 
          }
          <div className="btns-panel flex justify-around w-full h-full my-3">
              <button onClick={() => {setCompleted(!completed)}}>Done</button>
              <button className='w-fit' onClick={handlePick}>Attach file</button>
              <button onClick={() => {onRemove(inputValue.id); setClicked(false)}}>Delete</button>
          </div>
         
      </div>
      

    </div>
  )
}

export default InputModal
