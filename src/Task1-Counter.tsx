import { Component, createSignal, onCleanup } from "solid-js";
import { createMachine, assign, interpret } from "xstate";

interface Context {
  count: number;
}

interface Events {
  type: "INCREMENT";
}

const counterMachine = createMachine<Context, Events>({
  id: "counter",
  initial: "active",
  context: { count: 0 },
  states: {
    active: {
      on: {
        INCREMENT: {
          actions: assign({ count: (ctx) => ctx.count + 1 }),
        },
      },
    },
  },
});

const useCounterMachine = (machine) => {
  const [count, setCount] = createSignal(machine.initialState.context.count);
  const service = interpret(machine).onTransition((state) => {
    console.log({ state });
    setCount(state.context.count);
  });
  service.start();

  onCleanup(() => service.stop());

  return [count, service.send];
};

const Counter: Component = () => {
  const [count, send] = useCounterMachine(counterMachine);

  return (
    <div class="border-1 border-neutral-600 rounded-md ring-1 ring-neutral-50/30">
      <div class="flex gap-2 items-center px-2 py-1 bg-gradient-to-b from-neutral-100 to-neutral-300 border-b-1 border-neutral-600 rounded-t-md">
        <div class="bg-red-400 border-1 border-red-500 rounded-full w-4 h-4"></div>
        <div class="bg-yellow-400 border-1 border-yellow-500 rounded-full w-4 h-4"></div>
        <div class="bg-green-400 border-1 border-green-500 rounded-full w-4 h-4"></div>
        <h1 class="">Counter</h1>
      </div>
      <div class="grid grid-cols-12 gap-3 p-2 bg-gray-50 rounded-b-md">
        <input
          type="text"
          value={count()}
          class="border-[1] border-neutral-200 shadow-inner bg-white px-1 ring-0 focus:ring-0"
          readOnly
        />
        <button
          onClick={() => send({ type: "INCREMENT" })}
          class="px-4 border-1 rounded-md border-neutral-500 bg-gradient-to-b from-white via-neutral-50 hover:to-neutral-300 active:bg-neutral-200"
        >
          Count
        </button>
      </div>
    </div>
  );
};

export default Counter;
