<script setup>
import VTitle from "@/components/Base/VTitle.vue";
import VIcon from "@/components/Base/VIcon.vue";
import VCheckbox from "@/components/Base/VCheckbox.vue";
import {useRoute, useRouter} from "vue-router";
import {useTodoStore} from "@/stores/todo.js";
import {computed, onBeforeMount, onBeforeUnmount, ref} from "vue";
import VInput from "@/components/Base/VInput.vue";
import VButton from "@/components/Base/VButton.vue";
import {useUserStore} from "@/stores/user.js";

const route = useRoute()
const router = useRouter()
const todoStore = useTodoStore()
const userStore = useUserStore()

const newTodoText = ref('')
const todoEditId = ref(null)
const todoEditText = ref('')

const todoGroup = computed(() => {
  return todoStore.todoList.find(group => group.id == route.params.groupId)
})

onBeforeMount(() => {
  document.body.classList.add('modal-open')
})
onBeforeUnmount(() => {
  document.body.classList.remove('modal-open')
})

function close() {
  router.push('/todos')
}

function enableEdit(todoItem) {
  todoEditId.value = todoItem.id
  todoEditText.value = todoItem.todo
}

function disableEdit() {
  todoEditId.value = null
  todoEditText.value = ''
}

async function createTodo() {
  await todoStore.createTodo(todoGroup.value, newTodoText.value)
  newTodoText.value = ''
}

async function saveCompleted(todoItem) {
  await todoStore.updateTodo(todoItem.id, {
    completed: todoItem.completed
  })
}

async function saveText(todoItem) {
  await todoStore.updateTodo(todoEditId.value, {
    todo: todoEditText.value
  })

  todoItem.todo = todoEditText.value

  disableEdit()
}

async function removeTodo(todoId) {
  await todoStore.deleteTodo(todoGroup.value, todoId)
}
</script>

<template>
  <Teleport to="#modal" v-if="todoGroup">
    <div class="todo-backdrop" @click.self="close">
      <div class="todo-view">
        <div class="todo-view__control">
          <VIcon name="close" @click="close" />
        </div>

        <VTitle level="h3">{{ todoGroup.title }}</VTitle>

        <div class="todo-view__list">
          <VCheckbox
              v-for="todoItem in todoGroup.items"
              v-model="todoItem.completed"
              :key="todoItem.id"
              @input="saveCompleted(todoItem)"
          >
            <template v-if="todoItem.id === todoEditId">
              <VInput
                  v-model.trim="todoEditText"
                  @keyup.enter="saveText(todoItem)"
              />
            </template>

            <template v-else>
              {{ todoItem.todo }}
            </template>

            <template v-if="userStore.user.access">
              <VIcon
                  v-if="todoItem.id === todoEditId"
                  name="close"
                  @click.prevent="disableEdit(todoItem)"
              />

              <VIcon
                  v-else
                  name="edit"
                  @click.prevent="enableEdit(todoItem)"
              />

              <VIcon
                  name="trash"
                  @click.prevent="removeTodo(todoItem.id)"
              />
            </template>
          </VCheckbox>
        </div>

        <VInput
            class="todo-view__input"
            v-model.trim="newTodoText"
            :disabled="!userStore.user.access"
            full-width
            @keyup.enter="createTodo"
        />

        <VButton
            class="todo-view__create"
            :disabled="!userStore.user.access"
            @click="createTodo"
        >
          Добавить
        </VButton>
      </div>
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.todo-backdrop {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  display: flex;
  justify-content: flex-end;
}
.todo-view {
  background: var(--color-white);
  width: 800px;
  height: 100%;
  padding: 32px;

  &__control {
    display: flex;
    gap: 24px;
    justify-content: flex-end;
    cursor: pointer;
  }

  &__list {
    margin-top: 24px;
    display: grid;
    gap: 8px;
  }

  &__input {
    margin-top: 16px;
    width: 100%;
  }

  &__create {
    margin-top: 16px;
  }
}
</style>