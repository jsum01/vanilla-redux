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
      return [...state, { text: action.text }];
    case DELETE_TODO:
      return [];
    default:
      return state;
  }
}

const store = createStore(); // store은 read only기 때문에 action을 통해 수정해줘야 한다.
store.subscribe(() => console.log(store.getState()));

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");


const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  store.dispatch({ type: ADD_TODO, text: toDo }); // 제출할 때 ADD_TODO 타입의 디스패치를 보낸다.
};

form.addEventListener("submit", onSubmit);