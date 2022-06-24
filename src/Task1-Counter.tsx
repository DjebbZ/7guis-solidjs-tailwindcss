import { Component } from "solid-js";
import { createMachine, assign } from "xstate";
import { useMachine } from "./useMachine";

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

const Counter: Component = () => {
  const [context, send] = useMachine(counterMachine);

  return (
    <div class="grid grid-cols-12 gap-3">
      <input
        type="text"
        value={context().count}
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
  );
};

export default Counter;
