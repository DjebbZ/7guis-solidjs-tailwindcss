import { Component, createSignal, onCleanup } from "solid-js";
import { createMachine, assign, interpret } from "xstate";

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

const tempService = interpret(tempMachine)
  .onTransition((state) => {
    console.log(state.context);
  })
  .start();

const TemperatureConverter: Component = () => {};
