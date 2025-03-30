import React, {useState, useRef, useEffect} from 'react'
import './App.css'
import './components/styles.css'
import TodoItem from './components/TodoItem'
import axios from 'axios'
import DoneTodo from './components/DoneTodo'

// import { MdDone } from "react-icons/md";


type ID = number
type Text = string
type Todo = {
  text: Text
  _id: ID
  isDone?: boolean
}

const App: React.FC = () => {

 const inputRef = useRef<HTMLInputElement>(null);
// let id: ID = 1;
// let newId: ID = 1
//  USESTATES FUNCTIONS
 
 const [text, setText] = useState<Text>('')
 const [todoId, setTodoId] = useState<number>()
 const [todos, setTodos] = useState<Todo[]>([])
 const [isUpdating, setIsUpdating] = useState<boolean>(false)
 const [isDone, setIsDone] = useState<boolean>(false)
 const [doneTodo, setDoneTodo] = useState<Todo[]>([])

 const baseUrl = 'http://localhost:5002'

// GET TODOS FROM DATABASE
const getTodos = async () => {

  axios
  .get(baseUrl)
  .then((data) => {
    console.log(`data -----> ${data.data}`)
    setTodos(data.data)
  }).catch((err) => console.log(err)
  )
}

// CREATE TODO
  const createTodo = (): void => {
   if(text && text.length >= 1){
    
    axios
    .post(`${baseUrl}/create`, {text})
    .then((data) => {
      console.log(`Todo added: ${data.data}`)
      setText('')
      getTodos();
      
    })
    
   }
   
   inputRef.current?.blur()
 }

const editTodo = (): void => {

  axios
  .put(`${baseUrl}/update`, { _id: todoId, text})
  .then((data) => {
    console.log(`Todo Updated: ${data.data}`)
    setIsUpdating(false)
    setText('')
    getTodos();

  })
}

 const handleDone = (_id: number): void =>{

  let clickedID = todos.filter((todo) => todo._id === _id)
  let unClickedTodos = todos.filter((todo) => todo._id !== _id)

  if (clickedID){
   setIsDone(true)
   setTodos([...unClickedTodos])
   setDoneTodo([...clickedID])
  }
  
 }
 

useEffect(() => {
  getTodos();
}, [])

const editMode = (_id: number, text: string) => {
setIsUpdating(true)
  setTodoId(_id)
  setText(text)
}

const handleDelete = (_id: number): void =>{
  
  axios
  .delete(`${baseUrl}/delete`, { data: {_id }})
  .then(()=> {
    console.log('Todo deleted')
    getTodos();
  })

  // const handleDoneDelete = (): void =>{
  //   handleDelete(_id)
  // }


}
  return (
    <div className='App'>
      <span className="heading">
        Taskify
      </span>


      <form className="input" onSubmit={!isUpdating ? createTodo : editTodo}>
        <input
        ref={inputRef}
        type="input" name='textInput' placeholder='Enter a task' className='input__box' 
      value={text}
      onChange={(e) =>  setText(e.target.value)}
        />
        <button className='input__submit' type='submit' >Go</button>
  
    </form>

    {/* TODO LIST CONTAINER */}
    <div className="todos-container">
 
      <div className="uncheckedTodos">

  {
   todos.map((todo) => <TodoItem key={todo._id} text={todo.text} editMode={()=>editMode(todo._id, todo.text)} handleDone={()=>handleDone(todo._id)} handleDelete={()=> handleDelete(todo._id)}/>)
  }

      </div>

  { isDone ? <hr className='partition' /> : ''}

  <div className="checkedTodos">

  {
   isDone ?
    doneTodo.map((todo) => <DoneTodo key={todo._id} text={todo.text} handleDelete={()=> handleDelete(todo._id)}/>)
    : []
    
  }

  </div>

   </div>
   
    </div>
  )
}

export default App;