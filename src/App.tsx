import { Component } from "solid-js";
import Counter from "./Task1-Counter";

const Task: Component = ({ children }) => {
  return (
    <section class="m-2 border-b-gray-300 border-dashed border-b-1 pb-8">
      {children}
    </section>
  );
};

const App: Component = () => {
  return (
    <>
      <Task>
        <Counter />
      </Task>
    </>
  );
};

export default App;
