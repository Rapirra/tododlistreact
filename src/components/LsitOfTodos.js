// import React, {useState, useEffect,useCallback, useRef} from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPencil } from '@fortawesome/free-solid-svg-icons'
// import { faTrash } from '@fortawesome/free-solid-svg-icons'
// import dayjs from 'dayjs'
// function LsitOfTodos({id, date, title, file, description, onRemove, upload, onEdit, completed, setCompleted}) {
//   const [expired, setExpired ] = useState(false)
//   const today = dayjs(new Date())
//   const checkRef = useRef(null)
//   const gotDate = dayjs(date);
//   const keyRef = useRef()
//   const [isChecked, setIsChecked] = useState(false);

//   useEffect(() => {
//     setExpired(gotDate.isBefore(today))
//   }, [date])

  

 

//   return (
//     <div className='flex  flex-col'>
//         <div className="flex justify-between w-[75%]">
//           <label>Date</label>
//           <label>Title</label>
//           <label>Description</label>
//           <label htmlFor="">File</label>
//         </div>
//         <div className="task-panel flex flex-row justify-between" key={id} id={id}>
//         <h3 style={(expired && completed) ? {textDecoration: "line-through"} : {textDecoration: "none"}} ref={keyRef}>{date}</h3>
//         <h3 style={(expired || completed) ? {textDecoration: "line-through"} : {textDecoration: "none"}} ref={keyRef}>{title}</h3>
//         <h3 style={(expired || completed) ? {textDecoration: "line-through"} : {textDecoration: "none"}} ref={keyRef}>{description}</h3>
//          {file.length >0 ? <h2 ref={keyRef}>File</h2> : <h2 ref={keyRef}>{file.FileName}</h2> }
//          <div className="btn-panel flex justify-center items-center ">
//             <input type="checkbox" checked={false} className={isChecked ? "checked" : ""} ref={checkRef} onChange={() => setIsChecked((prev) =>!prev)}/>
//             <button onClick={() => { onEdit(id)}}><FontAwesomeIcon icon={faPencil} /></button>
//             <button onClick={() => {onRemove(id)} }><FontAwesomeIcon icon={faTrash} /></button>
//         </div>
//       </div>
      
//     </div>
//   )
// }

// export default LsitOfTodos

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
  const today = dayjs(new Date())
  const gotDate = dayjs(date);

  useEffect(() => {
    setExpired(gotDate.isBefore(today))
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