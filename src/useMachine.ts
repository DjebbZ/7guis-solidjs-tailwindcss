import { createSignal, onCleanup } from "solid-js";
import { AnyStateMachine, interpret } from "xstate";

export function useMachine<TMachine extends AnyStateMachine>(
  machine: TMachine
) {
  const [context, setContext] = createSignal(machine.initialState.context);
  const service = interpret(machine).onTransition((state) => {
    console.log({ state });
    setContext(state.context);
  });
  service.start();

  onCleanup(() => service.stop());

  return [context, service.send];
}
