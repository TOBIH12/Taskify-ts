import myTodoModel from "../Models/TodoModel"
import express from 'express'
import { Request, Response } from "express";


export const getTodos = async (req: Request, res: Response) => {
    const todo = await myTodoModel.find();
    res.send(todo)
}

export const createTodo = async (req: Request, res: Response) => {
    
    let { text } = req.body

    myTodoModel
    .create({ text })
    .then((data) => {
        console.log('Todo added')
        console.log(`data -------> ${data}`)
       res.send(data.text);
        
    }).catch((err) => console.log(err)
    )
}

export const updateTodo = async (req: Request, res: Response) => {
    
   let {_id, text} = req.body

   myTodoModel
   .findByIdAndUpdate(_id, { text })
   .then((data) => {
    res.status(201).send(`Todo updated: ${data}`)
   }).catch((err) => console.log(err)
);

  
}

export const deleteTodo = async (req: Request, res: Response) => {
    
    let {_id} = req.body
 
    myTodoModel
    .findByIdAndDelete(_id)
    .then(() => {
     res.status(202).send(`Todo deleted}`)
    }).catch((err) => console.log(err)
 );
 
   
 }
