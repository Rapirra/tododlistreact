import React, { useState, useEffect } from 'react'
import {v4 as uuid} from 'uuid' 
import InputModal from './InputModal'
import LsitOfTodos from './LsitOfTodos'
function TodoPanel() {
  const [modalInfo, setModalInfo] = useState({

  })
  const [clicked, setClicked] = useState(false)
  const [data, setData] = useState([{
    id:uuid(),
    date: "2022-11-08",
    title: 'First Task',
    description: "It's first Task",
  }])
  console.log(data)
  const [inputValue, setInputValue] = useState({
    id: uuid(),
    date: '',
    title: '',
    description: ''
  })

  const handleClick = () =>{
      setClicked(!clicked)
  }
 
  const onRemove = (value) => {
    setData(data.filter((task) => task.id !== value))
  }
    
  return (
    <div className='container mt-[15%] mx-auto  border rounded-3xl text-center p-7 bg-white '>
      <button onClick={handleClick} className='text-lg border rounded-lg p-1'>Create</button>

     {
        clicked ? <InputModal 
          clicked={clicked} 
          setClicked={setClicked} 
          data={data} setData={setData}
          onRemove={onRemove}
          inputValue={inputValue}
          setInputValue={setInputValue}
          /> : <div>No panel</div>
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
          
          inputValue={inputValue}
          setInputValue={setInputValue}
          />

        ))
      }
      

    </div>
  )
}

export default TodoPanel
