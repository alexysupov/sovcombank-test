import { defineStore } from 'pinia'
import todoApi from "@/api/todoApi.js";
import {serializeTodos} from "@/helpers/index.js";
import router from "@/router/index.js";

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todoList: [],
  }),

  actions: {
    async getTodoList() {
      this.todoList = await todoApi
          .getAllTodo()
          .then(({ todos}) => todos)
          .then(serializeTodos)
    },

    async createTodo(todoGroup, todoText) {
      const todoItem = await todoApi.addTodo({
        todo: todoText,
        completed: false,
        userId: 1,
      })

      todoGroup.items.push(todoItem)
    },

    async deleteTodo(todoGroup, todoId) {
      await todoApi.deleteTodo(todoId)
      todoGroup.items = todoGroup.items.filter(todo => todo.id !== todoId)

      if(!todoGroup.items.length) {
        this.todoList = this.todoList.filter(group => group.id !== todoGroup.id)
        await router.push('/todos')
      }
    },

    async updateTodo(todoId, todoData) {
      await todoApi.updateTodo(todoId, todoData)
    }
   }
})
