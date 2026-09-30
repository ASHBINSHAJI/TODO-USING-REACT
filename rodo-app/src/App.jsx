import { useState,useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [toDos, setToDos] = useState(()=>{
    try {
      const savedTodos = localStorage.getItem("todos");
      const parsed = savedTodos ? JSON.parse(savedTodos) : [];
      return Array.isArray(parsed)
        ? parsed.filter(item => item && typeof item === 'object' && item.text)
        : [];
    } catch {
      return [];
    }
  });
  const [toDo,setToDo] = useState('')
useEffect(()=>{
  localStorage.setItem('todos',JSON.stringify(toDos));

},[toDos])

const deleteTodo=(id)=>{
  setToDos(toDos.filter((item)=>{
    return item.id!==id
  }));
};
const today=new Date();
const todayDay=today.toLocaleDateString("en-US",{
  weekday:"long"
})
  return (
    <>
    <div className="app">

      <div className="mainheading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <h2> Whoop, it's {todayDay}</h2>
      </div>
      <div className="input">
        <input type="text" value={toDo} onChange={(e)=>setToDo(e.target.value)} placeholder='Add iteam ..'/>
        <i onClick={()=>{
                 if (toDo.trim() !== '') {
            setToDos([...toDos, {id: Date.now(), text: toDo, status: false}])
            setToDo('')
          }
        }} className="fas fa-plus"></i>

      </div>
      <div className="todos">
      {
      toDos.map((value,index)=>{

        return(
      <div className="todo" key={value.id}>
          <div className="left">
            <input type="checkbox" onChange={(e)=>{
              console.log(e.target.checked);
              console.log(value.text);
              setToDos(toDos.map(obj=>{
                if(obj.id===value.id){
                  obj.status=e.target.checked
                }
                return obj
              }))
            }} checked={value.status} name="" id="" />
            <p>{value.text}</p>
          </div>
          <div className="right">
            <i 
            onClick={()=>{
deleteTodo(value.id)
            }}
             className="fas fa-times"></i>
          </div>
        </div>)}) }
        <div className="checked">
                  {toDos.map((value)=>{
          if(value.status){
            return(<h1 className='result' key={value.id}>
{value.text}

            </h1>)
          }
          return null
        })}
        </div>

      </div>
    </div>
    </>
  )
}

export default App
