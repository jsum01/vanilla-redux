import { createStoreHook } from "react-redux";
import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

export const addTodo = (text) => {
    return {
        type: ADD,
        text
    }
}

export const deleteTodo = (id) => {
    return {
        type: DELETE,
        id
    }
}

const reducer = (state = ["Hello"], action) => {
    switch (action.type) {
        case ADD:
            return [{ text: action.text, id: Date.now() }, ...state];
        case DELETE:
            return state.filter(todo => todo !== action.id);
        default:
            return state;
    }
}

const store = createStore(reducer);

store.subscribe(() => {});

export default store;