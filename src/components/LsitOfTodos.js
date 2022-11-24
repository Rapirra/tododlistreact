import React, {useState, useEffect,useCallback, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
function LsitOfTodos({id, date, title, description, onRemove, upload, onEdit, completed, setCompleted}) {
  const [expired, setExpired ] = useState(false)
  const today = dayjs(new Date());
  const keyDivRef = useRef(id)
  const checkRef = useRef(null)
  const gotDate = dayjs(date);
  const keyRef = useRef()

  useEffect(() => {
    setExpired(gotDate.isBefore(today))
  }, [date])

  const handleCheck = () => {
    if (checkRef.current.checked ){
     setCompleted(true)
    } else {
      setCompleted(false)
    }}

 
 useEffect(() => {  
    if (completed|| expired ){
      keyDivRef.current.style.textDecoration = "line-through"
    }
  })

  return (
    <div className='flex  flex-col'>
        <div className="flex justify-between w-[75%]">
          <label>Date</label>
          <label>Title</label>
          <label>Description</label>
          <label htmlFor="">File</label>
        </div>
        <div className="task-panel flex flex-row justify-between" key={id} ref={keyDivRef} id={id}>
        <h3 ref={keyRef}>{date}</h3>
        <h3 ref={keyRef}>{title}</h3>
        <h3 ref={keyRef}>{description}</h3>
         {!upload ? <h2 ref={keyRef}>File</h2> : <h2 ref={keyRef}>{upload.FileName}</h2> }
         <div className="btn-panel flex justify-center items-center ">
            <input type="checkbox" className='' ref={checkRef} onChange={handleCheck}/>
            <button onClick={() => { onEdit(id)}}><FontAwesomeIcon icon={faPencil} /></button>
            <button onClick={() => {onRemove(id)} }><FontAwesomeIcon icon={faTrash} /></button>
        </div>
      </div>
      
    </div>
  )
}

export default LsitOfTodos
