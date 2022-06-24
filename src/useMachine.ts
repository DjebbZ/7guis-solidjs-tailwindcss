import { createSignal, onCleanup } from "solid-js";
import { interpret } from "xstate";

export const useMachine = (machine) => {
  const [context, setContext] = createSignal(machine.initialState.context);
  const service = interpret(machine).onTransition((state) => {
    console.log({ state });
    setContext(state.context);
  });
  service.start();

  onCleanup(() => service.stop());

  return [context, service.send];
};
