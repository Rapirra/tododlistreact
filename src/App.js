import './App.css';
import TodoPanel from './components/TodoPanel';
import 'font-awesome/css/font-awesome.min.css';

function App() {

  return (
    <div className="App " >
      <TodoPanel />
    </div>
  );
}

export default App;



// const handleDone = () =>{
//   setCompleted(!completed);
//   setClicked(false);
//   setEdit(false);
// }     //

// const handleDelete = () => {
//   setSelectedId(inputValue.id)
//   onRemove(selectedId);
//   setEdit(false);
// }

{/* <div className="btns-panel flex justify-around w-full h-full my-3">
              <button onClick={handleDone}>Done</button>
              <button className='w-fit' onClick={handlePick}>Attach file</button>
              <button onClick={handleDelete}>Delete</button>
          </div> */}