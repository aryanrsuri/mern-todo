import { useState, useEffect } from "react";
import Todo from "./Todo";

const api = "http://localhost:8000";

function App() {
  const [todos, setTodos] = useState([]);
  const [popActive, setPopActive] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();

    console.log(todos);
  }, []);

  const GetTodos = () => {
    fetch(api + "/todos")
      .then((result) => result.json())
      .then((data) => setTodos(data))
      .catch((Error) => console.error(Error));
  };

  const completeTodo = async (id) => {
    const url = api + "/todo/complete/" + id;
    const data = await fetch(url, {
      method: "POST",
    })
      .then((result) => result.json())
      .catch((Error) => console.error(Error));

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.completed = data.completed;
        }
        return todo;
      })
    );
  };

  const deleteTodo = async (id) => {
    const url = api + "/todo/delete/" + id;
    const data = await fetch(url, {
      method: "DELETE",
    })
      .then((result) => result.json())
      .catch((Error) => console.error(Error));

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.completed = data.completed;
        }
        return todo;
      })
    );
  };

  return (
    <div className="App">
      <h1> Polestar.sh </h1>

      <main className="main">
        <div className="todos">
          {todos.map((todo) => (
            <div
              className={"todo" + (todo.completed ? " completed" : "")}
              key={todo._id}
              onClick={() => completeTodo(todo._id)}
            >
              <div className="checkbox"></div>
              <div className="text">{todo.text}</div>
              <div
                onClick={() => deleteTodo(todo._id)}
                className="delete"
              ></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
