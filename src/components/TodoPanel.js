import React, { useState, useEffect } from 'react'
import {v4 as uuid} from 'uuid' 
import InputModal from './InputModal'
import LsitOfTodos from './LsitOfTodos'
function TodoPanel() {
  
  const [clicked, setClicked] = useState(false)
  const [data, setData] = useState([{
    id:uuid(),
    date: "2022-11-08",
    title: 'First Task',
    description: "It's first Task",
  }])
  const [isEdit, setEdit] = useState(false)
  const [selectedId, setSelectedId] = useState('')


  const onAdd = (inputValue ) => {
    setData(prevState=>[...prevState, {...inputValue}]);
    
  }
  const handleClick = () =>{
      setClicked(!clicked)
  }
 
  const onRemove = (value) => {
    setData(data.filter((task) => task.id !== value))
  }
  const [newValue, setNewValue] = useState({})
 
  const onEdit=(id) => {
    setClicked(true)
    setSelectedId(id)
    setEdit(true)
    const req = data.filter((item)=>item.id === id)
    req.forEach(item => (
      setNewValue({...item})
    ))
  }

  const onEdited = (id, value) =>{
    console.log(value)
    let array = data.map((task) => task.id === id ?  task : console.log(0))
    array.forEach(el=>(
      el.date = value.date,
      el.title=value.title,
      el.description=value.description
    ))
    setData(prevState=>
      prevState,
      [...array])   
  }

  console.log(data)

  return (
    <div className='container mt-[15%] mx-auto  border rounded-3xl text-center p-7 bg-white '>
      <button onClick={handleClick} className='text-lg border rounded-lg p-1'>Create</button>

     {
        clicked ? <InputModal 
          clicked={clicked} 
          setClicked={setClicked} 
          data={data} 
          onRemove={onRemove}
          onAdd={onAdd}
          onEdit={onEdit}
          selectedId={selectedId}
          newValue={newValue}
          isEdit={isEdit}
          onEdited ={onEdited}
          setNewValue={setNewValue}
          setEdit={setEdit}
          /> : 
          <div></div>
      }

      {
        data.map((el) => (
          <LsitOfTodos 
          id={el.id}
          date={el.date}
          title={el.title}
          description={el.description}
          onRemove={onRemove}
          setClicked={setClicked}
          data={data}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          onEdit={onEdit}
          />

        ))
      }
      

    </div>
  )
}

export default TodoPanel
