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

//보통 이렇게 action만을 리턴하는 것을 따로 만들어서 코드를 최적화한다. 그리고 이는 보통 reducer 위에 위치시킨다.
/**
 * 
 * @param {*} text 
 * @returns 
 */
const addTodo = (text) => {
  return { type: ADD_TODO, text };
}

const deleteTodo = (id) => {
  return { type: DELETE_TODO, id };
}

const reducer = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }]; // state를 changin하는 것이 아니라 우리가 직접 mutate해서 return하는 것이다.
    case DELETE_TODO:
      return state.filter(item => item.id !== parseInt(action.id, 10)); // filtering
    default:
      return state;
  }
}

const store = createStore(reducer); // store은 read only기 때문에 action을 통해 수정해줘야 한다.

// ------------------------------------Functions------------------------------------ //

/**
 * Add
 * @param {*} text 
 */
const dispatchAddTodo = (text) => {
  store.dispatch(addTodo(text));
}

const dispatchDeleteTodo = (e) => {
  // 어떤 버튼이 눌리고 있는지 알아야 함 -> e.target.parentNode
  console.log(e.target.parentNode.id); // parentNode는 li이므로 li의 id를 출력
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteTodo(id));
}

const onSubmit = e => {
  e.preventDefault();
  const todo = input.value;
  input.value = "";
  dispatchAddTodo(todo);
};

const paintTodos = () => {
  const toDos = store.getState();
  ul.innerHTML = ""; // 이렇게 비워주지 않으면 repainting된다.
  toDos.forEach(todo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.addEventListener('click', dispatchDeleteTodo);
    li.id = todo.id;
    li.innerText = todo.text + " ";
    btn.innerText = "DELETE"
    li.appendChild(btn); // 삭제할 수 있는 버튼도 같이 추가해준다.
    ul.appendChild(li);
  })
}
store.subscribe(paintTodos);

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

form.addEventListener("submit", onSubmit);