/* eslint-disable @typescript-eslint/no-explicit-any */
interface Reduction<TState> {
  (state: TState, action?: any): TState; // NOTE: For action, `any` is the only type that will work due to NgRx's extremely STRICT typing!!!
}

export const applyReductions =
  <TState>(...reductions: Reduction<TState>[]) =>
  (
    state: TState,
    action: any,
  ): TState => // NOTE: For action, `any` is the only type that will work due to NgRx's extremely STRICT typing!!!
    reductions.reduce((currentState, reduction) => reduction(currentState, action), state);
