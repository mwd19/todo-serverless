import { TodosAccess } from './todosAcess'
import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
// import * as createError from 'http-errors'

// TODO: Implement businessLogic

// Instantiate data layer objects
const todosAcess = new TodosAccess()
const attachmentUtils = new AttachmentUtils()

const logger = createLogger('Todos')

export async function getTodosForUser(userId) {
    logger.info('Getting all todos for the user: ', userId)
    return await todosAcess.getTodos(userId)
}

export async function createTodo(createTodoRequest: CreateTodoRequest, userId: string): Promise<TodoItem> {

    const todoId = uuid.v4()
    const name = createTodoRequest.name
    const dueDate = createTodoRequest.dueDate
    const createdAt = new Date().toString()

    const todoItem: TodoItem = {
        userId,
        todoId,
        createdAt,
        name,
        dueDate,
        done: false
    }

    logger.info('Creating todo: ', todoId)
    return await todosAcess.createTodo(todoItem)
}

export async function updateTodo(updateTodoRequest: UpdateTodoRequest, todoId: string, userId: string,) {
    logger.info('Updating todo: ', todoId)
    return await todosAcess.updateTodo(todoId, userId, updateTodoRequest)
}

export async function deleteTodo(todoId: string, userId: string) {
    logger.info('Deleting todo: ', todoId)
    return await todosAcess.deleteTodo(todoId, userId)
}

export async function createAttachmentPresignedUrl(todoId: string, userId) {
    logger.info('Creating image url for todo: ', {todoId})
    const attachement_url = attachmentUtils.createAttachmentPresignedUrl(todoId)
    return await todosAcess.updateAttachmentUrl(attachement_url, todoId, userId)
}
