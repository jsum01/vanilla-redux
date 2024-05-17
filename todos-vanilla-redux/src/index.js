import { createStore } from "redux";
// NEVER USE MUTATE STATE
/**
 * what is mutation?
 * mutate: 변형
 * 근데 store은 mutate하는 게 아니라 새로운 state를 return하는 것이다.
 * 그냥 새로운 상태로 갈아치운다고 생각하면 편하다.
 */

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const reducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }]; // state를 changin하는 것이 아니라 우리가 직접 mutate해서 return하는 것이다.
    case DELETE_TODO:
      return [];
    default:
      return state;
  }
}

const store = createStore(reducer); // store은 read only기 때문에 action을 통해 수정해줘야 한다.

const paintTodos = () => {
  const toDos = store.getState();
  ul.innerHTML = ""; // 이렇게 비워주지 않으면 repainting된다.
  toDos.forEach(todo => {
    const li = document.createElement("li");
    li.id = todo.id;
    li.innerText = todo.text;
    ul.appendChild(li);
  })
}
store.subscribe(paintTodos);

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

/**
 * Add
 * @param {*} text 
 */
const addTodo = (text) => {
  store.dispatch({ type: ADD_TODO, text });
}

const onSubmit = e => {
  e.preventDefault();
  const todo = input.value;
  input.value = "";
  addTodo(todo);
};

form.addEventListener("submit", onSubmit);