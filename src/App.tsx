import { Component } from "solid-js";
import Counter from "./Task1-Counter";

const Task: Component = ({ title, children }) => {
  return (
    <section class="m-2 border-b-gray-300 border-dashed border-b-1 pb-8">
      <div class="border-1 border-neutral-600 rounded-md ring-1 ring-neutral-50/30">
        <div class="flex gap-2 items-center px-2 py-1 bg-gradient-to-b from-neutral-100 to-neutral-300 border-b-1 border-neutral-600 rounded-t-md">
          <div class="bg-red-400 border-1 border-red-500 rounded-full w-4 h-4"></div>
          <div class="bg-yellow-400 border-1 border-yellow-500 rounded-full w-4 h-4"></div>
          <div class="bg-green-400 border-1 border-green-500 rounded-full w-4 h-4"></div>
          <h1 class="">{title}</h1>
        </div>
        <div class="p-2 bg-gray-50 rounded-b-md">{children}</div>
      </div>
    </section>
  );
};

const App: Component = () => {
  return (
    <>
      <Task title="Counter">
        <Counter />
      </Task>
    </>
  );
};

export default App;
