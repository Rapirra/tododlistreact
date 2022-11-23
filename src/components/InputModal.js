
import React, { useEffect, useState,useRef, useCallback } from 'react'
import {v4 as uuid} from 'uuid' 

function InputModal({ clicked, setClicked, data, onRemove,  onAdd ,newValue, isEdit, setNewValue, onEdited, setEdit}) {
  
  const [inputValue, setInputValue] = useState({
    id: uuid(),
    date: '',
    title: '',
    description: ''
  })
  const editInputRef = useRef(null);
  const onAddMemo = useCallback(() => {    
      onAdd(inputValue);
      setClicked(false);   
  }, [inputValue, onAdd,setClicked])

  const onSaveMemo = useCallback(() => {    
    onEdited(newValue.id, newValue) 
    setClicked(false);  
    setEdit(true);
}, [onEdited,setClicked, newValue])

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
    console.log(newValue)  
  }
  
  return (
    <div className=' bg-black bg-opacity-40 fixed inset-0 flex justify-center items-center h-full' key={newValue.id}>
        <button onClick={() => setClicked(!clicked)} className='absolute top-[25%] bg-white border  w-[50px] h-[50px]'><i className="fa-solid fa-xmark"></i></button>
        <div className="content">   
          {isEdit ? 
          <div>
            <label htmlFor="">Date <input type="date" ref={editInputRef}  name="date" value={newValue.date || ''} onChange={handleNewChange}/></label>
          <label htmlFor="">Title<input type="text" name="title" ref={editInputRef} value={newValue.title || ''}  onChange={handleNewChange}/></label>
          <label htmlFor="">Description</label>
            <div className="flex flex-col">
            <textarea  id="" cols="30" rows="5" ref={editInputRef}  name="description"  value={newValue.description || ''} onChange={handleNewChange}></textarea>
          <button className='mt-[30px] border border-black p-1' 
          onClick={onSaveMemo}> Save</button>
            </div>
          </div>
            : 
            <div>
              <label htmlFor="">Date <input type="date" name="date" value={inputValue.date || ''} onChange={handleChange}/></label>
          <label htmlFor="">Title<input type="text" name="title" value={inputValue.title || ''}  onChange={handleChange}/></label>
          <label htmlFor="">Description</label>
          <textarea  id="" cols="30" rows="5" name="description" value={inputValue.description || ''} onChange={handleChange}></textarea>
          <button className='mt-[30px]' 
          onClick={onAddMemo}> Add task</button>
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
