import express from 'express'
import mongoose from 'mongoose'
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/TodoController'

const router = express();

router.get('/', getTodos);
router.post('/create', createTodo);
router.put('/update', updateTodo);
router.delete('/delete', deleteTodo);


export default router;
