import { MdDelete } from "react-icons/md";


interface Props{
    text: string;
    handleDelete:()=> void
    // isDone: boolean
  }

const DoneTodo = ({text, handleDelete}: Props) => {
  return (
    <div className='doneTodos'>
 <div className='doneText'>{text}</div>
      <div className="icons">
      <MdDelete className='icon' onClick={handleDelete}/>

      
    </div>
    </div>
  )
}

export default DoneTodo
