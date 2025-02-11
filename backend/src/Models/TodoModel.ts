import mongoose  from "mongoose";

 const myTodoSchema = new mongoose.Schema({
    text: {type: String, require: true}
})

const myTodoModel = mongoose.model('myTodo', myTodoSchema)

export default myTodoModel
