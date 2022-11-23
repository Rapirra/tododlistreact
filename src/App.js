import './App.css';
import TodoPanel from './components/TodoPanel';
import 'font-awesome/css/font-awesome.min.css';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import CustomParseFormat from 'dayjs/plugin/customParseFormat'
import { useEffect, useState } from 'react';
function App() {

// const obj = {
//   date: '2022-08-08'
// }

//   dayjs.extend(LocalizedFormat)
//   dayjs.extend(CustomParseFormat)
//   const currentDate = dayjs().format('llll')


//   const [check, setCheck] = useState(false)


// useEffect(() =>{
//   if (currentDate > obj.date){
//     // return setCheck(true)
//   }
// }, []) 
  return (
    <div className="App " >
      {/* <h3 style={check ? {textDecoration: "line-through"} : null}>Hell no</h3> */}
      <TodoPanel />
    </div>
  );
}

export default App;
