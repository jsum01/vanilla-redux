import { createStore } from "redux";

// DOM 요소 참조
const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const ADD = "ADD";
const MINUS = "MINUS";

// 2. Reducer: 리듀서 함수 생성
const countModifier = (count = 0, action) => {
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

// 1. CreateStore: 스토어 생성
const countStore = createStore(countModifier);

// 4. Subscribe: 스토어 변화를 감지하는 함수 정의
const onChange = () => {
  number.innerText = countStore.getState();
};
countStore.subscribe(onChange);

// 초기 상태 표시
number.innerText = countStore.getState();

// 3. 액션 디스패치 함수 정의
const handleAdd = () => {
  countStore.dispatch({ type: ADD });
};

const handleMinus = () => {
  countStore.dispatch({ type: MINUS });
};

// 버튼에 이벤트 리스너 추가
add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
