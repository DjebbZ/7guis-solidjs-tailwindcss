import { Component, createSignal, onCleanup } from "solid-js";
import { createMachine, assign, interpret } from "xstate";
import { useMachine } from "./useMachine";

const tempMachine = createMachine({
  id: "temperature",
  initial: "idle",
  context: {
    celsius: undefined,
    farhenheit: undefined,
  },
  states: {
    idle: {
      on: {
        CELSIUS: {
          actions: assign({
            celsius: (ctx, evt) => evt.value,
            farhenheit: (ctx, evt) => evt.value * (9 / 5) + 32,
          }),
        },
        FARHENHEIT: {
          actions: assign({
            farhenheit: (ctx, evt) => evt.value,
            celsius: (ctx, evt) => (evt.value - 32) * (5 / 9),
          }),
        },
      },
    },
  },
});

const TemperatureConverter: Component = () => {
  const [ctx, send] = useMachine(tempMachine);

  return (
    <div class="grid grid-cols-12 gap-3">
      <input
        type="number"
        value={ctx().celsius}
        onInput={(evt) => send({ type: "CELSIUS", value: +evt.target.value })}
      />
      Celsius{" "}
      <input
        type="number"
        value={ctx().farhenheit}
        onInput={(evt) =>
          send({ type: "FARHENHEIT", value: +evt.target.value })
        }
      />{" "}
      Farhenheit
    </div>
  );
};

export default TemperatureConverter;
