<script setup>
import HeaderLayout from './components/HeaderLayout.vue';
import InputContainer from './components/InputContainer.vue';
import TodoItem from './components/TodoItem.vue';
import FilterContainer from './components/FilterContainer.vue';
import SummaryConatiner from './components/SummaryConatiner.vue';
import { ref, computed } from 'vue';

const todos = ref([
  {
    id: 1,
    text: '할 일 1',
    completed: false,
    createAt: '2025-03-24',
  },
  {
    id: 2,
    text: '할 일 2',
    completed: true,
    createAt: '2025-03-25',
  },
  {
    id: 3,
    text: '할 일 3',
    completed: false,
    createAt: '2025-03-26',
  },
  {
    id: 4,
    text: '할 일 4',
    completed: false,
    createAt: '2025-03-26',
  },
]);

const filter = ref('all');

const addTodo = (newtodo) => {
  todos.value.push({
    id: Date.now(),
    text: newtodo.text,
    completed: false,
    createAt: new Date().toLocaleDateString(),
  });
  saveTodos();
};

const togglecompleted = (id) => {
  const completedtodo = todos.value.find((todo) => todo.id === id.id);
  completedtodo.completed = !completedtodo.completed;
};

const removeTodo = (id) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
};

const filteredTodos = computed(() => {
  if (filter.value === 'active') {
    return todos.value.filter((todo) => !todo.completed);
  } else if (filter.value === 'completed') {
    return todos.value.filter((todo) => todo.completed);
  } else {
    return todos.value;
  }
});

const filterChanged = (f) => {
  filter.value = f.filter;
};

const clearCompleted = () => {
  todos.value = todos.value.filter((todo) => !todo.completed);
  saveTodos();
};

const activeTodoCount = computed(() => {
  return todos.value.filter((todo) => !todo.completed).length;
});

const completedTodoCount = computed(() => {
  return todos.value.filter((todo) => todo.completed).length;
});

const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos.value));
};

const loadTodos = () => {
  const todos = localStorage.getItem('todos');
  todos ? (todos = JSON.parse(todos)) : [];
};
</script>

<template>
  <HeaderLayout title="작심" />
  <InputContainer @add-todo="addTodo" />
  <FilterContainer @filter-changed="filterChanged" />
  <ul class="todo-list">
    <TodoItem
      v-for="todo in filteredTodos"
      :key="todo.id"
      :todo="todo"
      @toggle-completed="togglecompleted"
    />
  </ul>
  <SummaryConatiner
    @clear-completed="clearCompleted"
    :activeTodoCount="activeTodoCount"
    :completedTodoCount="completedTodoCount"
  />
</template>

<style scoped>
.todo-list {
  margin: var(--space-l) auto !important;
}
</style>
