
import React,{ useEffect, useState,useRef, useCallback, useLayoutEffect } from 'react'
import {v4 as uuid} from 'uuid' 

function InputModal({ clicked, setClicked, data, onRemove,  onAdd ,newValue, isEdit, setNewValue, onEdited, setEdit}) {
  const [isValid, setValid] = useState(false)
  const editInputRef = useRef(null);
  const [error, setError] = useState('')
  const [inputValue, setInputValue] = useState({
    id: uuid(),
    date: '',
    title: '',
    description: ''
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
  useEffect(() => {
    setValid(validate())
    console.log(isValid)
  })

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

  useLayoutEffect(() => {
    let input = document.getElementsByTagName('input')
    if (input.length <= 0){
      let span = document.createElement("span")
      input.before(span, 'Field is required')
    }
  })
  
  return (
    <div className=' bg-black bg-opacity-40 fixed inset-0 flex justify-center items-center h-full' key={newValue.id}>
        <button onClick={onClose} className='absolute top-[25%] bg-white border  w-[50px] h-[50px]'><i className="fa-solid fa-xmark"></i></button>
        <div className='content'>   
          {isEdit ? 
          <div  >
            <label htmlFor="">Date <input type="date" required="required" ref={editInputRef}  name="date" value={newValue.date || ''} onChange={handleNewChange}/></label>
          <label htmlFor="">Title<input type="text" name="title" required="required" ref={editInputRef} value={newValue.title || ''}  onChange={handleNewChange}/></label>
          <label htmlFor="">Description</label>
            <div className="flex flex-col">
            <textarea  id="" cols="30" rows="5" ref={editInputRef}  required="required" name="description"  value={newValue.description || ''} onChange={handleNewChange}></textarea>
          <button className='mt-[30px] border border-black p-1' 
          onClick={onSaveMemo}> Save</button>
            </div>
          </div>
            : 
            <div>
              <label htmlFor="">Date <input type="date" required="required" name="date"  value={inputValue.date || ''} onChange={handleChange}/></label>
          <label htmlFor="">Title<input type="text" required="required" name="title" ref={textRef} value={inputValue.title || ''}  onChange={handleChange}/></label>
          <label htmlFor="">Description</label>
          <textarea  id="" cols="30" rows="5" name="description" required="required" ref={errRef} value={inputValue.description || ''} onChange={handleChange}></textarea>
          <button className='mt-[30px]' 
          onClick={onAddMemo}> Add task</button>
          <span className='block'>{error}</span>
            </div> 
          }
          <div className="btn-panel flex justify-around w-full h-full my-3">
              <button ><i className="fa fa-solid fa-check"></i>Done</button>
              <button className='w-fit'><i className="fa-solid fa-file inline mr-[20px]"></i>Attach file</button>
              <button onClick={() => {onRemove(inputValue.id); setClicked(false)}}><i className=" fa fa-solid fa-trash"></i>Delete</button>
          </div>
         
      </div>
      

    </div>
  )
}

export default InputModal
