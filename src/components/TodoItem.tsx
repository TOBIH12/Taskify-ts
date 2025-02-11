import { MdDone } from "react-icons/md";
import { MdDelete } from "react-icons/md";

interface Props{
      text: string;
      handleDone: ()=> void
      handleDelete:()=> void
      editMode: ()=>void
      
    }

const TodoItem = ({text, handleDone, handleDelete, editMode}: Props) => {
  return (
    <div className='todoItem'>
      <div className='text' onDoubleClick={editMode}>{text}</div>
      <div className="icons">
        <MdDone className='icon' onClick={handleDone}/>
        <MdDelete className='icon' onClick={handleDelete}/>
      </div>
    </div>
  )
}

export default TodoItem
