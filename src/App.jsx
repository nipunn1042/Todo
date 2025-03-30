import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import ThemeProvider from "./components/ThemeContext";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ThemeProvider>
        <TodoList />
      </ThemeProvider>
    </>
  );
}

export default App;
