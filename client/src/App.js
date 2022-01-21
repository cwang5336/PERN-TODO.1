import React, {Fragment} from 'react';
import './App.css';

// components
import InputTodo from "./components/InputTodo"
import ListTodos from './components/ListTodos';
import logIn from './components/logIn';

function App() {
  return (

    <Fragment>
      <div>
        <InputTodo/>
        <ListTodos/>
      </div>
    </Fragment>
  );
}

export default App;
