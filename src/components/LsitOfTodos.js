import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import CustomParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
function LsitOfTodos({id, date, title, description, onRemove, setClicked, selectedId,setSelectedId, onEdit}) {
  const [completed, setCompleted] = useState(false)
  const [expired, setExpired ] = useState(false)
  dayjs.extend(LocalizedFormat)
  dayjs.extend(CustomParseFormat)
  const currentDate = dayjs().format('llll')
  const t = date

  useEffect(() => {
    if (currentDate > date){
      return setExpired(true)
      }
  }, [date])

  return (
    <div>      
        <div className="task-panel flex flex-row justify-between" key={id}>
        <label>Date<h3 style={(completed || expired)  ? {textDecoration: "line-through"} : null} >{date}</h3></label>
        <label>Title<h3 style={(completed || expired)  ? {textDecoration: "line-through"} : null}>{title}</h3></label>
        <label>Description <h3 style={(completed || expired)  ? {textDecoration: "line-through"} : null}>{description}</h3></label>
        <div className="btn-panel flex justify-center items-center ">
            <button onClick={() => {setCompleted(!completed)}}><FontAwesomeIcon icon={faCheck} /></button>
            <button onClick={() => { onEdit(id)}}><FontAwesomeIcon icon={faPencil} /></button>
            <button onClick={() => {onRemove(id)} }><FontAwesomeIcon icon={faTrash} /></button>
        </div>
      </div>
    </div>
  )
}

export default LsitOfTodos
