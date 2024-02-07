import axios from "axios";
import {defaultHandler, errorHandler} from "@/helpers/index.js";

const instance = axios.create({
    baseURL: 'https://dummyjson.com'
})

class TodoApi {
    getAllTodo() {
        return instance.get('/todo')
            .then(defaultHandler)
            .catch(errorHandler)
    }

    getOneTodo(todoId) {
        return instance.get(`/todos/${todoId}`)
            .then(defaultHandler)
            .catch(errorHandler)
    }

    addTodo(todoData) {
        return instance.post('/todos/add', todoData)
            .then(defaultHandler)
            .catch(errorHandler)
    }

    updateTodo(todoId, todoData) {
        return instance.put(`/todos/${todoId}`, todoData)
            .then(defaultHandler)
            .catch(errorHandler)
    }

    deleteTodo(todoId) {
        return instance.delete(`/todos/${todoId}`)
            .then(defaultHandler)
            .catch(errorHandler)
    }
}

export default new TodoApi()

