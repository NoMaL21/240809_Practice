import React from 'react';
import Todo from './Todo';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 0, title: "hello world 1", done: true },
        { id: 1, title: "hello world 1", done: true },
      ],
    };
  }

  render() {
    var todoItems = this.state.items.map((item)=>(
      <Todo item={item} key={item.id}/>
    ));

    return <div className="App">{todoItems}</div>;
  }
}

export default App;
