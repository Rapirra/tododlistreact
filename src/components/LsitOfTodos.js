import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function LsitOfTodos({id, date, title, description, onRemove, setClicked, setInputValue,data, inputValue, modalInfo, setModalInfo}) {
  const [completed, setCompleted] = useState(false)
  return (
    <div>      
        <div className="task-panel flex flex-row justify-between" key={id}>
        <label>Date<input style={completed ? {textDecoration: "line-through"} : null} type="text" readOnly={true} value={date}/></label>
        <label>Title<input type="text" readOnly={true}  value={title} /></label>
        <label>Description <input type="text" readOnly={true}  value={description}/></label>
        <div className="btn-panel flex justify-center items-center ">
            <button onClick={() => {setCompleted(!completed)}}><FontAwesomeIcon icon={faCheck} /></button>
            <button onClick={() => {setClicked(true); const gg = data.filter((task) => task.id === id); console.log(gg); setInputValue(gg); console.log(inputValue)}}><FontAwesomeIcon icon={faPencil} /></button>
            <button onClick={() => {onRemove(id)} }><FontAwesomeIcon icon={faTrash} /></button>
        </div>
      </div>
    </div>
  )
}

export default LsitOfTodos
