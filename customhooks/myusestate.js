import { useRef, useSyncExternalStore } from 'react';

function createStore() {
  let state; // undefined until initialized
  const listeners = new Set();

  const getSnapshot = () => state;

  const setState = (next) => {
    const prev = state;
    state = typeof next === 'function' ? next(prev) : next;
    // notify all
    listeners.forEach((l) => l());
    return state;
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const initIfNeeded = (initial) => {
    if (state === undefined) {
      state = typeof initial === 'function' ? initial() : initial;
    }
    return state;
  };

  return { getSnapshot, setState, subscribe, initIfNeeded };
}

const store = createStore();

export default function useMyState(initialState) {
  // initialize once if uninitialized
  useRef(store.initIfNeeded(initialState));

  const value = useSyncExternalStore(store.subscribe, store.getSnapshot);

  const updateVal = (next) => store.setState(next);

  return [value, updateVal];
}
