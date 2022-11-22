
import React, { useEffect, useState,useRef } from 'react'
import {v4 as uuid} from 'uuid' 

function InputModal({ clicked, setClicked, setData, onRemove, inputValue, setInputValue}) {
  const [empty] = useState({
    id: uuid(),
    date: '',
    title: '',
    description: ''  
  })
  const desc = useRef(inputValue.desc)
  console.log(inputValue)

  const handleChange = (event) => {
    const {name, value} = event.target
    setInputValue(prevState => ({
      ...prevState,
      [name]:value
    }))    
  }

  
  return (
    <div className=' bg-black bg-opacity-40 fixed inset-0 flex justify-center items-center h-full' key={inputValue.id}>
        <button onClick={() => setClicked(!clicked)} className='absolute top-[25%] bg-white border  w-[50px] h-[50px]'><i className="fa-solid fa-xmark"></i></button>
        <div className="content">        
          <label htmlFor="">Date <input type="date" name="date" value={inputValue.date} onChange={handleChange}/></label>
          <label htmlFor="">Title<input type="text" name="title" value={inputValue.title}  onChange={handleChange}/></label>
          <label htmlFor="">Description</label>
          <textarea  id="" cols="30" rows="5" name="description" ref={desc} value={inputValue.description || ''} onChange={handleChange}></textarea>
          <div className="btn-panel flex justify-around w-full h-full my-3">
              <button ><i className="fa fa-solid fa-check"></i>Done</button>
              <button className='w-fit'><i className="fa-solid fa-file inline mr-[20px]"></i>Attach file</button>
              <button onClick={() => {onRemove(inputValue.id); setClicked(false)}}><i className=" fa fa-solid fa-trash"></i>Delete</button>
          </div>
          <button className='mt-[30px]' onClick={() => setData(prevState=>[...prevState, {...inputValue}], setClicked(false), setInputValue(empty))}>Add task</button>
      </div>
      

    </div>
  )
}

export default InputModal
