import React, { useState } from 'react';
import { connect } from 'react-redux';

function Home({ todos }) {
  const [text, setText] = useState("");
  function onChange(e) {
    setText(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
    console.log(text);
  }
  return (
    <>
      <h2>To Do</h2>
      <form action="" onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      <ul>
        {JSON.stringify(todos)}
      </ul>
    </>
  )
}


function mapStateToProps(state) {
  console.log(state);
  return { sexy: true } // return 값은 지정된 컴포넌트의 props로 전달된다.
}
export default connect(mapStateToProps)(Home); // mapStateToProps의 return이 props의 형태로 Home으로 전달