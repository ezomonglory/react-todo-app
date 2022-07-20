import { createSlice } from '@reduxjs/toolkit';

const getInitialTodos = () => {
  const localTodoList = window.localStorage.getItem('todoList');

  if (localTodoList) {
    return JSON.parse(localTodoList);
  }

  window.localStorage.setItem('todoList', JSON.stringify([]));
  return [];
};

const initialValue = {
  filterStatus: 'all',
  todoList: getInitialTodos(),
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);

      const todoList = window.localStorage.getItem('todoList');

      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({ ...action.payload });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
      } else {
        window.localStorage.setItem(
          'todoList',
          JSON.stringify([{ ...action.payload }])
        );
      }
    },
    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
            window.localStorage.setItem(
              'todoList',
              JSON.stringify(todoListArr)
            );
            state.todoList = todoListArr;
          }
        });
      }
    },

    UpdateTodo: (state, action) => {
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((todo) => {
          if (todo.id === action.payload.id) {
            todo.title = action.payload.title;
            todo.status = action.payload.status;
          }
          window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
          state.todoList = todoListArr;
        });
      }
    },
    updateFilterStaus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, UpdateTodo, updateFilterStaus } =
  todoSlice.actions;
export default todoSlice.reducer;
